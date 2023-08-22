const nodemailer = require("nodemailer");
const { smtpUsername, smtpPassword } = require("../secret");


console.log(smtpUsername,smtpPassword);
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: smtpUsername,
      pass: smtpPassword
    }
  });

  const sendEmailWithNodeMailer = async(emailData) =>{
    try {
        // send mail with defined transport object
        const mailOptions = {
            from: smtpUsername, // sender address
            to: emailData.email, // list of receivers
            subject: emailData.subject, // Subject line
            html: emailData.html, // html body
        }

        const info = await transporter.sendMail(mailOptions);
        console.log('Massage send: %s', info.response);
    } catch (error) {
        console.error('Error occured while sending email:', error)
        throw error;
    }
  }

  module.exports = sendEmailWithNodeMailer