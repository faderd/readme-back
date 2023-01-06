import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailSubscriberModel, EmailSubscriberSchema } from '../email-subscriber/email-subscriber.model';
import { EmailSubscriberRepository } from '../email-subscriber/email-subscriber.repository';
import { EmailSenderController } from './email-sender.controller';
import { EmailSenderService } from './email-sender.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EmailSubscriberModel.name, schema: EmailSubscriberSchema }
    ]),
  ],
  providers: [EmailSenderService, EmailSubscriberRepository],
  controllers: [EmailSenderController],
  exports: [EmailSenderService],
})
export class EmailSenderModule { }
