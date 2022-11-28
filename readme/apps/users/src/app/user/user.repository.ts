import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CRUDRepositoryInterface } from '@readme/core';
import { UserInterface } from '@readme/shared-types';
import { Model } from 'mongoose';
import { UserEntity } from './user.entity';
import { UserModel } from './user.model';

@Injectable()
export class UserRepository implements CRUDRepositoryInterface<UserEntity, string, UserInterface> {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>
  ) { }

  public async create(item: UserEntity): Promise<UserInterface> {
    const newUser = new this.userModel(item);
    return newUser.save();
  }

  public async destroy(id: string): Promise<void> {
    this.userModel.deleteOne({ id });
  }

  public async findById(id: string): Promise<UserInterface | null> {
    return this.userModel
      .findOne({ id })
      .exec();
  }

  public async findByEmail(email: string): Promise<UserInterface | null> {
    return this.userModel
      .findOne({ email })
      .exec();
  }

  public async update(id: string, item: UserEntity): Promise<UserInterface> {
    return this.userModel
      .findByIdAndUpdate(id, item.toObject(), { new: true })
      .exec();
  }
}
