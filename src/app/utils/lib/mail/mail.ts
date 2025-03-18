import nodemailer from 'nodemailer';

interface EmailOptions {
    to: string;
    subject: string;
    html: string;
}

export const sendEmail = async ({ to, subject, html }: EmailOptions) => {
    console.log("inside sendEmail")

    try {

        console.log("process.env.SMTP_USER = ", process.env.SMTP_USER)
        console.log("process.env.SMTP_PASS = ", process.env.SMTP_PASS)
        console.log("process.env.SMTP_FROM = ", process.env.SMTP_FROM)
        console.log("process.env.SMTP_HOST = ", process.env.SMTP_HOST)
        // Create transporter
        const transporter = nodemailer.createTransport({
            service: process.env.SMTP_SERVICE,
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            },
        });

        // Send email
        const info = await transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject,
            html
        });

        console.log('Email sent successfully:', info.messageId);
        return true;

    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};
