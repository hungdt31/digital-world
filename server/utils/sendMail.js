const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");
const sendMail = asyncHandler(async ({email, html, topic}) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        service: 'Gmail',
        tls: {
            rejectUnauthorized: false
        },
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: process.env.EMAIL_NAME,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Cua hang dien tu" <no-reply@cuahangdientu.com>', // sender address
        to: email, // list of receivers
        subject: topic || 'Forgot Password', // Subject line
        html: html, // html body
    });
    return info;
});
module.exports = sendMail
