import nodemailer from "nodemailer";

export function getTransporter() {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: {
      user: process.env.NODEMAILER_EMAIL_ID,
      pass: process.env.NODEMAILER_EMAIL_PASSWORD,
    },
  });
  return transporter;
}

export async function sendSubscriptionEmail({ to, plan, amount, currency, renewDate }) {
  const transporter = getTransporter();
  const subject = "Welcome to Career Kundli Pro ✨";
  const text = `You’re now Pro! Unlimited Career Analyses are unlocked.
Plan: ${plan}
Price: ${currency} ${amount}
Renews on: ${new Date(renewDate).toLocaleDateString()}

Explore: https://your-app-domain/analyze
`;
  await transporter.sendMail({
    from: process.env.NODEMAILER_EMAIL_ID,
    to,
    subject,
    text,
  });
}

export async function sendExpiryReminderEmail({ to, renewDate }) {
  const transporter = getTransporter();
  const subject = "Pro Plan Expiring Soon ⚠️";
  const text = `Heads up! Your Career Kundli Pro plan expires on ${new Date(renewDate).toLocaleDateString()}.
Renew to keep unlimited analyses and premium insights.

Renew: https://your-app-domain/pricing
`;
  await transporter.sendMail({
    from: process.env.NODEMAILER_EMAIL_ID,
    to,
    subject,
    text,
  });
}

export async function sendFeedbackEmail({ name, email, subject, message, meta }) {
  const transporter = getTransporter();

  const mailSubject = `New Feedback: ${subject || "No subject"}`;
  const text = `New feedback received:

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

Meta:
${meta ? JSON.stringify(meta, null, 2) : "N/A"}
`;

  await transporter.sendMail({
    from: process.env.NODEMAILER_EMAIL_ID,
    to: process.env.NODEMAILER_EMAIL_ID,
    replyTo: email || undefined,
    subject: mailSubject,
    text,
  });
}