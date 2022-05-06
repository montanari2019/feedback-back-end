import { MailAdapter, SendMailData } from "../mail-adpter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "6d870c54d21686",
      pass: "c3f5028207935a"
    }
  });


export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: SendMailData) {
        await transport.sendMail({
        from: 'Equipe Feedget <oi@feedget.com>',
        to: 'Ikaro Montanari <ikaro.montanari@hotmail.com>',
        subject: subject,
        html: body
    })
    }
}