import { Module } from '@nestjs/common';
import { EmailSenderController } from './email-sender.controller';
import { EmailSenderService } from './email-sender.service';

@Module({
  imports: [],
  providers: [EmailSenderService],
  controllers: [EmailSenderController],
})
export class EmailSenderModule {}
