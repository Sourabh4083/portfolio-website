import { connectToDb } from "@/lib/mongodb"
import Contact from "@/models/Contact"
import { NextResponse } from "next/server"

export async function POST(req) {

    try {
        const { name, email, message } = await req.json()
        await connectToDb()

        const newContact = new Contact({ name, email, message })
        await newContact.save()

        return NextResponse.json({ success: true, message: "Message sent successfully!" });
    } catch (error) {
        console.log('Error submitting contact form:', error);
        return NextResponse.json({ success: false, message: "Failed to submit form. " })

    }


}