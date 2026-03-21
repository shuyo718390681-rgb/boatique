import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(cors());

  // API Route for form submission
  app.post("/api/submit-form", async (req, res) => {
    const { title, formData } = req.body;
    const notificationEmail = process.env.NOTIFICATION_EMAIL || "xiaoah@spccd.org, 718390681@qq.com";

    console.log(`Form Submission: ${title}`, formData);

    try {
      // Lazy initialization of transporter
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_PORT === "465",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const formDetails = Object.entries(formData)
        .map(([key, value]) => `<b>${key}:</b> ${value}`)
        .join("<br>");

      const mailOptions = {
        from: process.env.SMTP_FROM || "noreply@boatique.com",
        to: notificationEmail,
        subject: `[Boatique] New Form Submission: ${title}`,
        html: `
          <h2>New Form Submission</h2>
          <p><b>Form Title:</b> ${title}</p>
          <hr>
          ${formDetails}
          <hr>
          <p>Submitted at: ${new Date().toLocaleString()}</p>
        `,
      };

      // Check if SMTP is configured
      if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully to", notificationEmail);
      } else {
        console.warn("SMTP not configured. Form data logged but email not sent.");
        // In a real app, we might want to return a success anyway if we're just logging for now
      }

      res.json({ success: true, message: "Form submitted successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ success: false, message: "Failed to process form submission" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
