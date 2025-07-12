const emailTemplate=(value)=>{
    return `<div style="font-family: Arial, sans-serif; line-height: 1.5;">
      <h2>Password Reset Request</h2>
      <p>Hello,</p>
      <p>You recently requested to reset your password. Click the link below to set a new password:</p>
      <p><a href="http://127.0.0.1:3000/user/reset-password/${value}" style="color: #1a73e8;">Reset Your Password</a></p>
      <p>This link will expire in 15 minutes for security reasons.</p>
      <p>If you did not request a password reset, please ignore this email.</p>
      <br />
      <p>Thanks,<br />Flipkart Clone /n Creator 'Deepak :)'</p>
    </div>`
}

module.exports = emailTemplate;