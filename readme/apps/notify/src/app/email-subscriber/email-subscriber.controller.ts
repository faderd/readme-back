import { Controller } from '@nestjs/common';
import { EmailSubscriberService } from './email-subscriber.service';
import { EventPattern } from '@nestjs/microservices';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { CommandEvent } from '@readme/shared-types';

@Controller()
export class EmailSubscriberController {
  constructor(
    private readonly subscriberService: EmailSubscriberService,
  ) { }

  @EventPattern({ cmd: CommandEvent.AddSubscriber })
  public async create(subscriber: CreateSubscriberDto) {
    return this.subscriberService.addSubscriber(subscriber);
  }
}
