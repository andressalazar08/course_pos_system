const nodemailer =  require('nodemail');
const dotenv = require('dotenv').config({path:'src/config/.env'});

const sendEmail =  async options => {
    const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD
        }
      });

    const customMessage = {
        from:`${process.env.SMTP_FROM} <${process.env.SMTP_USER}>`,
        to:options.email,
        subject:options.subject,
        text:options.message
    };

    await transport.sendMail(customMessage);

};

module.exports = {sendEmail};