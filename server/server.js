const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Nodemailer transporter configuration (use your app password)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "althafhussai11@gmail.com", // Replace with your email
    pass: "laabptuggnvpakjz", // Replace with your app password (App Password from Gmail)
  },
  logger: true, // Enable logging for easier debugging
  debug: true, // Enable detailed error messages
});

// API endpoint to handle form submission
app.post("/api/send-email", (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;

  const mailOptions = {
    from: email,
    to: "althafhussai11@gmail.com", // Replace with your receiving email
    subject: "New Contact Form Submission",
    text: `You have a new message from:
        \nFirst Name: ${firstName}
        \nLast Name: ${lastName}
        \nEmail: ${email}
        \nPhone: ${phone}
        \nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error:", error);
      res.status(500).json({ message: "Error sending email" });
    } else {
      console.log("Email sent:", info.response);
      res.status(200).json({ message: "Email sent successfully" });
    }
  });
});

module.exports = app; // Export the app for Vercel
