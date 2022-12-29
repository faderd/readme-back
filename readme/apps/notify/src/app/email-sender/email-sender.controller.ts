import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EmailSenderService } from './email-sender.service';

@ApiTags('notify')
@Controller('email-sender')
export class EmailSenderController {
  constructor(private readonly emailSenderService: EmailSenderService) { }

  @Get('/')
  async send() {
    return this.emailSenderService.sendMail();
  }
}
