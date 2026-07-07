const nodemailer = require("nodemailer");

function isDevEmailMode() {
  const placeholderPasswords = ["your-app-password", "", undefined, null];
  return (
    process.env.EMAIL_MODE === "console" ||
    (process.env.NODE_ENV !== "production" &&
      placeholderPasswords.includes(process.env.SMTP_PASS))
  );
}

async function sendOtpEmail(toEmail, otp) {
  if (isDevEmailMode()) {
    // In dev mode or when SMTP_PASS is not set, log the OTP instead of sending email.
    console.warn(
      `Email sending skipped in dev mode. OTP for ${toEmail}: ${otp}`,
    );
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.verify();
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: toEmail,
      subject: "Your account verification code",
      text: `Your OTP is ${otp}. It expires in 5 minutes.`,
    });
  } catch (err) {
    // Attach friendly context and rethrow so controller can handle it.
    const error = new Error(`Failed to send OTP email: ${err.message}`);
    error.cause = err;
    throw error;
  }
}

module.exports = { sendOtpEmail };
