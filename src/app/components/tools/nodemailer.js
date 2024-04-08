import nodemailer from 'nodemailer';

const email = process.env.NOTIFIER_EMAIL;
const password = process.env.NOTIFIER_PASSWORD;

export const transporter = nodemailer.createTransport({
    service : 'hotmail',
    auth: {
        user: email,
        pass: password
    }
});
