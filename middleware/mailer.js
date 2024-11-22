const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendEmail = (to, subject, payload) => {
    const mailOptions = {
        from: "РОТ МИРАЭ",
        to,
        subject,
        payload
    };
    return transporter.sendMail(mailOptions);
};

module.exports = {sendEmail};
