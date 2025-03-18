import nodemailer from 'nodemailer';

interface EmailOptions {
    to: string;
    subject: string;
    html: string;
}

export const sendEmail = async ({ to, subject, html }: EmailOptions) => {
    console.log("inside sendEmail")

    try {

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

        return true;

    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};
