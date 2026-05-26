import nodemailer from 'nodemailer';

// 临时内存存储（用于同步辅助）
let submissions: any[] = [];

export default async function handler(req: any, res: any) {
  // 处理 GET 请求
  if (req.method === 'GET') {
    return res.status(200).json(submissions);
  }

  // 仅允许 POST 请求提交表单
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

  // 使用北京时间记录提交时间
  const timestamp = new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
  const submissionId = Date.now();

  const submissionData = {
    id: submissionId,
    title,
    formData,
    timestamp
  };

  // 添加到临时缓存
  submissions.push(submissionData);

  try {
    // 邮件发送服务配置
    const smtpConfig = {
      host: process.env.SMTP_HOST || "smtp.qq.com",
      port: parseInt(process.env.SMTP_PORT || "465"),
      secure: true,
      auth: {
        user: process.env.SMTP_USER, // 您的发送邮箱，例如 718390681@qq.com
        pass: process.env.SMTP_PASS, // 您的邮箱 SMTP 授权码（非 QQ 登录密码）
      },
    };

    const transporter = nodemailer.createTransport(smtpConfig);

    // 将表单项拼接为 HTML 列表
    const formDetails = Object.entries(formData)
      .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
      .join('');

    // 发送邮件
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
