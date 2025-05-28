const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const user = process.env.EMAIL_USERNAME;
const password = process.env.EMAIL_PASSWORD;
const port = process.env.EMAIL_PORT;
const host = process.env.EMAIL_SERVER;

// Function to send verification email
async function sendVerificationEmail(email, first_name, verification_link) {
  // Load the email template
  const emailTemplatePath = path.join(
    __dirname,
    "../public/views/verify_email.html"
  );
  let emailHtml = fs.readFileSync(emailTemplatePath, "utf8");

  // Replace placeholders with actual values
  emailHtml = emailHtml
    .replace("{{FIRST_NAME}}", first_name)
    .replace("{{VERIFICATION_LINK}}", verification_link);

  // Create the transporter for Mail
  const transporter = nodemailer.createTransport({
    host: host,
    port: port,
    secure: true,
    auth: {
      user: user,
      pass: password,
    },
  });

  // Email options
  const mailOptions = {
    from: "Openfy <divardtech@gmail.com>",
    to: email,
    subject: "Verify your email address",
    html: emailHtml,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully to", email);
  } catch (error) {
    console.error("Failed to send verification email:", error);
    throw new Error("Failed to send verification email");
  }
}

module.exports = sendVerificationEmail;
