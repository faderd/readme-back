import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SubscriberInterface } from '@readme/shared-types';

@Schema({
  collection: 'email-subscriber',
  timestamps: true,
})
export class EmailSubscriberModel extends Document implements SubscriberInterface {
  @Prop()
  public id: string;

  @Prop()
  public email: string;
}

export const EmailSubscriberSchema = SchemaFactory.createForClass(EmailSubscriberModel);
