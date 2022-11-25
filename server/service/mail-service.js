const nodemailer = require('nodemailer')

class MailService {
  async sendEmail(to, link, subject, text) {
    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    })

    const info = await transporter.sendMail({
      from: `Mail test <test@example.com>`,
      to: to ?? "pehocin609@3mkz.com",
      subject: subject ?? 'Account activation for ' + process.env.API_URL,
      text: '',
      html: `
        <div>
          <h1>${text ?? 'Go to the link for activation your account'}</h1>
          <a href="${link}">${link}</a>
        </div>
      `
    });

    console.log(info)
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }
}

module.exports = new MailService()