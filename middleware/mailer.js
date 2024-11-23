const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVER,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendEmail = (to, subject, payload) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text: `Your password is: ${payload}`
    };
    return transporter.sendMail(mailOptions);
};

module.exports = {sendEmail};
