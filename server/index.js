import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import axios from "axios";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGOURL)
  .then(() =>
    app.listen(PORT, () =>
      console.log("✅ Backend running at http://localhost:" + PORT)
    )
  )
  .catch((err) => console.log(err));

// Google OAuth Middleware
const verifyGoogleToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);

  const token = authHeader.split(" ")[1];
  try {
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`
    );
    const userInfo = response.data;

    const requestedEmail = req.query.email;
    if (requestedEmail && requestedEmail !== userInfo.email) {
      return res.status(403).json({ error: "Token email mismatch" });
    }

    req.user = userInfo;
    next();
  } catch (error) {
    console.error("Invalid Google token", error.message);
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};

// Email Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: true,
  auth: {
    user: "butcher.voughtprime@gmail.com",
    pass: "omyy fkvp kuep wtmi",
  },
});

const sendMail = async (transporter, mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Protected API Route - Purchased Books
app.get("/api/purchased-books", verifyGoogleToken, (req, res) => {
  const userEmail = req.user.email;
  res.json({
    email: userEmail,
    books: ["Clean Code", "You Don't Know JS", "Atomic Habits"],
  });
});

// Protected API Route - Send Email
app.post("/api/send", verifyGoogleToken, async (req, res) => {
  const userEmail = req.user.email;
  const mailOptions = {
    from: {
      name: "William Butcher",
      address: "butcher.voughtprime@gmail.com",
    },
    to: userEmail,
    subject: "Oi Cunt",
    html: "<h2>🖕( •_• )🖕</h2>",
  };

  try {
    await sendMail(transporter, mailOptions);
    res.status(200).json("Email Sent Successfully!");
  } catch (error) {
    res.status(500).json(error);
  }
});
