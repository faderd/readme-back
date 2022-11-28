import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserInterface, UserRole } from '@readme/shared-types';
import { Document } from 'mongoose';

@Schema({
  collection: 'users',
})
export class UserModel extends Document implements UserInterface {
  @Prop({
    required: true,
  })
  public dateRegistration: Date;

  @Prop({
    required: true,
  })
  public email: string;

  @Prop({
    required: true,
  })
  public firstname: string;

  @Prop({
    required: true,
  })
  public lastname: string;

  @Prop()
  public avatar: string;

  @Prop({
    required: true,
  })
  public passwordHash: string;

  @Prop({
    required: true,
    type: String,
    enum: UserRole,
    default: UserRole.User,
  })
  public role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
