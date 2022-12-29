import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { emailSenderOptions, getSmtpConfig } from '../config/email.config';
import { getMongoDbConfig, mongoDbOptions } from '../config/mongodb.config';
import { rabbitMqOptions } from '../config/rabbitmq.config';
import { NOTIFY_SERVICE_ENV_PATH } from './app.constant';
import { EmailSenderModule } from './email-sender/email-sender.module';
import { EmailSubscriberModule } from './email-subscriber/email-subscriber.module';
import envSchema from './env.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: NOTIFY_SERVICE_ENV_PATH,
      load: [rabbitMqOptions, mongoDbOptions, emailSenderOptions],
      validationSchema: envSchema,
    }),
    MongooseModule.forRootAsync(getMongoDbConfig()),
    MailerModule.forRootAsync(getSmtpConfig()),
    EmailSubscriberModule,
    EmailSenderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
