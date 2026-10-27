import { connectToDb } from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json({ success: false, message: "All fields are required." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ success: false, message: "Please enter a valid email." }, { status: 400 });
  }
  if (name.length > 100 || message.length > 5000) {
    return NextResponse.json({ success: false, message: "Message is too long." }, { status: 400 });
  }

  try {
    await connectToDb();
    await Contact.create({ name, email, message });
    return NextResponse.json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return NextResponse.json({ success: false, message: "Failed to submit form." }, { status: 500 });
  }
}
