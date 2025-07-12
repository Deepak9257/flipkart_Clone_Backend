const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendMail = async (to,subject,html) => {
  const info = await transporter.sendMail({
    from: '"Flipkart " depk1318@gmail.com',
    to,
    subject,
    html, // HTML body  
  });

  console.log("Message sent:", info.messageId);
};

module.exports = sendMail;