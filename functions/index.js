const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
require("dotenv").config(); 


const transporter = nodemailer.createTransport({
  host: "smtp.larksuite.com",
  port: 465,
  secure: true, 
  auth: {
    user: process.env.EMAIL_USER, // info@gridstreak.com
    pass: process.env.EMAIL_PASS, // your email password
  },
});


exports.sendContactEmail = functions.https.onRequest(async (req, res) => {
  try {
    const { firstName, lastName, email, message, source } = req.body;

    const mailOptions = {
      from: `"GridStreak Contact Form" <info@gridstreak.com>`,
      to: "info@gridstreak.com", 
      subject: `New Contact Form Message from ${firstName} ${lastName}`,
      html: `
        <h2>New Message from GridStreak Contact Form</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Source:</strong> ${source}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).send({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send({ success: false, error: error.message });
  }
});
