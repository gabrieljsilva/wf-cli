import { Mailer, SendEmailParams } from '../../types/interfaces/Mailer';
import { Injectable } from '@nestjs/common';
import { renderFile } from 'ejs';
import { join } from 'path';
import { createTransport, Transporter } from 'nodemailer';
import { ENV } from '../../../../shared/constants';

@Injectable()
export class SMTPMailerProvider extends Mailer {
  private readonly transporter: Transporter;
  private readonly from: string;

  constructor() {
    super();
    this.transporter = createTransport({
      host: ENV.SMTP_HOST,
      port: ENV.SMTP_PORT,
      auth: {
        user: ENV.SMTP_USER,
        pass: ENV.SMTP_PASSWORD,
      },
    });
    this.from = ENV.APP_EMAIL;
  }

  async sendEmail(params: SendEmailParams) {
    const html = await SMTPMailerProvider.renderHTML(
      params.templateIdOrKey,
      params.variables,
    );

    await this.transporter.sendMail({
      html,
      subject: params.subject,
      from: this.from,
      to: params.targetsEmails,
      attachments: params.attachments,
    });
  }

  private static async renderHTML(
    template: string,
    data?: Record<string, string>,
  ) {
    const templatePath = join(__dirname, 'templates', template + '.ejs');
    const partialsPath = join(__dirname, 'partials');

    return renderFile(templatePath, data, {
      views: [partialsPath],
    });
  }
}
