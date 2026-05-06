import { NextRequest, NextResponse } from "next/server";

interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const body: ContactPayload = await req.json();
    const { name, email, message } = body;

    // Validate
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "Please provide a valid name." }, { status: 400 });
    }
    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }
    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json({ error: "Message must be at least 10 characters." }, { status: 400 });
    }

    // If RESEND_API_KEY is configured, send via Resend
    const resendKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_EMAIL || "hello@alexmorgan.dev";

    if (resendKey) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: [toEmail],
          subject: `New message from ${name.trim()}`,
          html: `
            <div style="font-family: monospace; max-width: 600px; margin: 0 auto; padding: 24px; background: #111; color: #f5f5f5; border: 1px solid #1f1f1f;">
              <h2 style="color: #c8ff00; margin-bottom: 16px;">New Contact Message</h2>
              <p><strong>Name:</strong> ${name.trim()}</p>
              <p><strong>Email:</strong> ${email.trim()}</p>
              <hr style="border-color: #1f1f1f; margin: 16px 0;" />
              <p style="white-space: pre-wrap; color: #888;">${message.trim()}</p>
            </div>
          `,
          reply_to: email.trim(),
        }),
      });

      if (!res.ok) {
        console.error("Resend error:", await res.text());
        return NextResponse.json({ error: "Failed to send email. Please try again." }, { status: 500 });
      }
    } else {
      // Log to console in development / when no email provider is configured
      console.log("📬 New contact form submission:");
      console.log(`  Name: ${name.trim()}`);
      console.log(`  Email: ${email.trim()}`);
      console.log(`  Message: ${message.trim()}`);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
