const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { company, contactPerson, phone, email, requirement } = req.body;

  if (!company || !contactPerson || !phone || !email || !requirement) {
    return res.status(400).json({ error: '请填写所有必填项' });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: process.env.NOTIFICATION_EMAIL,
    subject: `【舶物志】企业合作意向 - ${company}`,
    text: `
公司名称: ${company}
联系人: ${contactPerson}
电话: ${phone}
邮箱: ${email}
需求: ${requirement}
    `,
    html: `
      <h3>舶物志企业合作意向</h3>
      <ul>
        <li><strong>公司名称</strong>: ${company}</li>
        <li><strong>联系人</strong>: ${contactPerson}</li>
        <li><strong>电话</strong>: ${phone}</li>
        <li><strong>邮箱</strong>: ${email}</li>
        <li><strong>需求</strong>: ${requirement}</li>
      </ul>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: '提交成功' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '邮件发送失败，请稍后重试' });
  }
}
