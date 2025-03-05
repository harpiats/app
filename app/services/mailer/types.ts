import type SMTPTransport from "nodemailer/lib/smtp-transport";

export type SendMailTypes = {
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
};

export interface MailerConfigInterface extends SMTPTransport.Options {}
