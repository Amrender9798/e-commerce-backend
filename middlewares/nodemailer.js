import { createTransport } from "nodemailer";
import bcrypt from "bcrypt";
import ResetToken from "../models/resetToken.js";

async function sendEmail(req, res) {
  try {
    const { email } = req.body;

    const resetToken = await generateResetToken(email);

    const transporter = createTransport({
      service: "gmail",
      auth: {
        user: "codingninjas2k16@gmail.com",
        pass: "slwvvlczduktvhdj",
      },
    });

    const expirationTime = new Date();
    expirationTime.setHours(expirationTime.getHours() + 1);

    // Email content
    const resetLink = `http://localhost:3000/set-password?reset-token=${resetToken}`;
    const mailOptions = {
      from: "codingninjas2k16@gmail.com",
      to: email,
      subject: "Password Reset",
      html: `
        <p>Hello,</p>
        <p>We received a request to reset your password. Please click the following link to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link will expire on ${expirationTime.toLocaleString()}.</p>
        <p>If you didn't request a password reset, you can ignore this email.</p>
      `,
    };

    

    // Send email
    transporter.sendMail(mailOptions,async (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      } else {
        await ResetToken.create({ email, token: resetToken });
        res
          .status(200)
          .json({ message: "Password reset email sent successfully" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

const generateResetToken = async (email) => {
  const tokenValue = await bcrypt.hash(email,10);
  return tokenValue;
};

export default sendEmail;
