import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { EMAIL_ADD_SUBSCRIBER_SUBJECT, EMAIL_TO_SEND, ERROR_SENDING_EMAIL, NOTIFY_SUBJECT, POST_URL } from './email-sender.constant';
import { SubscriberInterface } from '@readme/shared-types';
import { EmailSubscriberRepository } from '../email-subscriber/email-subscriber.repository';
import { EmailSubscriberEntity } from '../email-subscriber/email-subscriber.entity';

@Injectable()
export class EmailSenderService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly emailSubscriberRepository: EmailSubscriberRepository,
  ) { }

  public async sendNotifyNewSubscriber(subscriber: SubscriberInterface) {
    await this.mailerService.sendMail({
      to: subscriber.email,
      from: EMAIL_TO_SEND,
      subject: EMAIL_ADD_SUBSCRIBER_SUBJECT,
      template: './add-subscriber',
      context: {
        user: `${subscriber.firstname} ${subscriber.lastname}`,
        email: `${subscriber.email}`,
      }
    })
      .catch((er) => {
        throw new ServiceUnavailableException(`${ERROR_SENDING_EMAIL}: ${er}`);
      });
  }

  public async sendNotifyAll() {
    const subscribers = await this.emailSubscriberRepository.findAll();
    subscribers.forEach(async (subscriber) => {
      if (!subscriber.newPosts) {
        return;
      }

      const newPostsUrls = subscriber.newPosts.map((postId) => `${POST_URL}${postId}`).join(' ');

      await this.mailerService.sendMail({
        to: subscriber.email,
        from: EMAIL_TO_SEND,
        subject: NOTIFY_SUBJECT,
        text: newPostsUrls,
      })
        .then(async () => {
          subscriber.newPosts = [];
          await this.emailSubscriberRepository.update(subscriber.id,new EmailSubscriberEntity(subscriber));
        })
        .catch((er) => {
          throw new ServiceUnavailableException(`${ERROR_SENDING_EMAIL}: ${er}`);
        });
    });
  }
}
