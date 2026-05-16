// api/send-email.js
const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, appointmentType, date, message } = req.body;

  // 配置 SMTP（使用环境变量）
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true, // 使用 465 端口时设为 true
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.NOTIFICATION_EMAIL,
      subject: `新的预约申请 - ${appointmentType}`,
      html: `
        <h3>预约详情</h3>
        <p><strong>姓名：</strong> ${name}</p>
        <p><strong>联系方式：</strong> ${email} / ${phone}</p>
        <p><strong>预约类型：</strong> ${appointmentType}</p>
        <p><strong>期望日期：</strong> ${date}</p>
        <p><strong>留言/备注：</strong> ${message}</p>
      `,
    });
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send email' });
  }
}