import nodemailer from 'nodemailer';

// In-memory storage (Note: Vercel functions are stateless, so this only works for the current instance)
// For a real app, you'd use a database like Firebase
let submissions: any[] = [];

export default async function handler(req: any, res: any) {
  // Handle GET request for sync tool
  if (req.method === 'GET') {
    return res.status(200).json(submissions);
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { title, formData } = req.body;
  const notificationEmail = process.env.NOTIFICATION_EMAIL || "718390681@qq.com";

  if (!title || !formData) {
    return res.status(400).json({
      success: false,
      message: '缺少必要参数 (Missing title or formData)'
    });
  }

  // Use Beijing time for timestamp
  const timestamp = new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
  const submissionId = Date.now();

  const submissionData = {
    id: submissionId,
    title,
    formData,
    timestamp
  };

  // Add to local list (temporary storage for sync task)
  submissions.push(submissionData);

  try {
    const smtpConfig = {
      host: process.env.SMTP_HOST || "smtp.qq.com",
      port: parseInt(process.env.SMTP_PORT || "465"),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    };

    const transporter = nodemailer.createTransport(smtpConfig);

    const formDetails = Object.entries(formData)
      .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
      .join('');

    await transporter.sendMail({
      from: `"舶物志 Boatique" <${process.env.SMTP_USER}>`,
      to: notificationEmail,
      subject: `新表单提交: ${title}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px;">
          <h2 style="color: #2d3748; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">${title}</h2>
          <div style="margin: 20px 0;">
            ${formDetails}
          </div>
          <p style="font-size: 12px; color: #718096; border-top: 1px solid #e2e8f0; padding-top: 10px;">
            提交时间: ${timestamp}
          </p>
        </div>
      `,
    });

    return res.status(200).json({ success: true, message: '提交成功' });
  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ success: false, message: '邮件发送失败' });
  }
}
