import { mailerConfig } from "app/config/mailer";
import nodemailer from "nodemailer";
import type { SendMailTypes } from "./types";

export default class Mailer {
  private static mailer = nodemailer.createTransport(mailerConfig);

  static async sendMail(options: SendMailTypes) {
    const info = await Mailer.mailer.sendMail(options);

    return info;
  }
}
