import nodemailer from 'nodemailer';

export const sendEmail = async ({ to, subject, html }) => {
    console.log('sending email');
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
            },
        });

        const info = await transporter.sendMail({
            from: process.env.MAIL_USERNAME,
            to, // use destructured `to`
            subject,
            html,
        });

        return info;
    } catch (error) {
        console.log(error, 'email not sent');
        return error;
    }
};