import { IOrder, IOrderItemWithProduct, IOrderWithProduct } from "@/app/models/orderModel";
import { EMAIL_SUBJECT } from "../constants/text";
import { sendEmail } from "../../lib/mail/mail"
import { getOrderConfirmationEmailTemplate } from "../../lib/mail/templates/orderConfirmationTemplate";
import { getWelcomeTemplate } from "../../lib/mail/templates/welcomeMailTemplate";
import { IOrderToCreate } from "../types/api/order";
import { getOrderStatusEmailTemplate } from "../../lib/mail/templates/orderStatusTemplate";
import { getOtpEmailTemplate } from "../../lib/mail/templates/otpTemplate";

export const sendWelcomeMail = async ({
    to,
    username
}: {
    to: string;
    username: string;
}) => {
    try {
        const html = getWelcomeTemplate({ username });
        const subject = EMAIL_SUBJECT.WELCOME_MAIL;
        await sendEmail({
            to,
            subject,
            html
        })
    } catch (err) {
        throw new Error(`send welcome mail failed : ${err}`)
    }
}

export const sendOrderConfirmationEmail = async ({
    to,
    username,
    order
}: {
    to: string;
    username: string;
    order: IOrderWithProduct
}) => {
    try {
        const html = getOrderConfirmationEmailTemplate({
            username,
            order,
            todayDate: new Date().toLocaleDateString(),
        });

        const subject = EMAIL_SUBJECT.ORDER_CONFIRMATION_MAIL

        await sendEmail({
            to,
            subject,
            html
        })

    } catch (err) {
        throw new Error(`send order confirmation mail failed : ${err}`)
    }
}

export const sendOrderStatusEmail = async ({
    to,
    username,
    order
}: {
    to: string;
    username: string;
    order: IOrderWithProduct
}) => {
    try {
        const html = getOrderStatusEmailTemplate({
            username,
            order,
            todayDate: new Date().toLocaleDateString(),
        });

        const subject = EMAIL_SUBJECT.ORDER_STATUS_MAIL

        await sendEmail({
            to,
            subject,
            html
        })
    } catch (err) {
        throw new Error(`send order status mail failed : ${err}`)
    }
}

export const sendOtpEmail = async ({
    to,
    username,
    otp
}: {
    to: string;
    username: string;
    otp: string;
}) => {
    try {
        const html = getOtpEmailTemplate({
            username,
            otp
        })

        const subject = EMAIL_SUBJECT.OTP_MAIL

        await sendEmail({
            to,
            subject,
            html
        })
    } catch (err) {
        throw new Error(`send otp mail failed : ${err}`)
    }
}