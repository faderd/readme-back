import { CRUDRepositoryInterface } from '@readme/core';
import { EmailSubscriberEntity } from './email-subscriber.entity';
import { SubscriberInterface } from '@readme/shared-types';
import { EmailSubscriberModel } from './email-subscriber.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailSubscriberRepository implements CRUDRepositoryInterface<EmailSubscriberEntity, string, SubscriberInterface> {
  constructor(
    @InjectModel(EmailSubscriberModel.name) private readonly emailSubscriberModel: Model<EmailSubscriberModel>) { }

  public async create(item: EmailSubscriberEntity): Promise<SubscriberInterface> {
    const newEmailSubscriber = new this.emailSubscriberModel(item);
    return newEmailSubscriber.save();
  }

  public async destroy(id: string): Promise<void> {
    this.emailSubscriberModel.deleteOne({ id })
  }

  public async findById(id: string): Promise<SubscriberInterface | null> {
    return this.emailSubscriberModel
      .findOne({ id })
      .exec();
  }

  public async update(id: string, item: EmailSubscriberEntity): Promise<SubscriberInterface> {
    return this.emailSubscriberModel
      .findByIdAndUpdate(id, item.toObject(), { new: true })
      .exec();
  }

  public async findByEmail(email: string): Promise<SubscriberInterface | null> {
    return this.emailSubscriberModel
      .findOne({ email })
      .exec();
  }

  public async findAll(): Promise<SubscriberInterface[] | null> {
    return this.emailSubscriberModel
      .find()
      .exec();
  }
}
