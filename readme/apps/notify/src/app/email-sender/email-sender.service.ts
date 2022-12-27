import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ERROR_SENDING_EMAIL } from './email-sender.constant';

@Injectable()
export class EmailSenderService {
  constructor(private readonly mailerService: MailerService) { }

  public sendMail(): void {
    this.mailerService.sendMail({
      to: 'test@example.com',
      from: 'noreply@readme.com',
      subject: 'Test',
      text: 'Test',
    })
      .catch((er) => {
        throw new Error(`${ERROR_SENDING_EMAIL}: ${er}`);
      });
  }
}
