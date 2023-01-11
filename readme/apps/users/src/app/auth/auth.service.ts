import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConflictException, NotImplementedException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices/client';
import { createEvent } from '@readme/core';
import { CommandEvent, PostInterface, UserInterface, UserRole } from '@readme/shared-types';
import dayjs = require('dayjs');
import { firstValueFrom } from 'rxjs';
import { UserEntity } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG, RABBITMQ_SERVICE_NAME } from './auth.constant';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    @Inject(RABBITMQ_SERVICE_NAME) private readonly rabbitClient: ClientProxy,
  ) {
  }

  async register(dto: CreateUserDto) {
    const { email, firstname, lastname, password } = dto;
    const user = {
      email, firstname, lastname, role: UserRole.User,
      avatar: '', dateRegistration: dayjs().toDate(),
      passwordHash: '', subscribersId: []
    };

    const existUser = await this.userRepository
      .findByEmail(email);

    if (existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const userEntity = await new UserEntity(user)
      .setPassword(password);

    const createdUser = await this.userRepository
      .create(userEntity);

    this.rabbitClient.emit(
      createEvent(CommandEvent.AddSubscriber),
      {
        userId: createdUser._id,
        email: createdUser.email,
        firstname: createdUser.firstname,
        lastname: createdUser.lastname
      }
    );

    return createdUser;
  }

  async verifyUser(dto: LoginUserDto) {
    const { email, password } = dto;
    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new UnauthorizedException(AUTH_USER_NOT_FOUND);
    }

    const userEntity = new UserEntity(existUser);
    if (! await userEntity.comparePassword(password)) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    return userEntity.toObject();
  }

  async getUser(id: string) {
    const existUser = await this.userRepository.findById(id);

    if (!existUser) {
      throw new UnauthorizedException(AUTH_USER_NOT_FOUND);
    }
    console.log('user: ', existUser);

    const userEntity = new UserEntity(existUser);

    const userPostsCount = ((await firstValueFrom(this.rabbitClient.send(
      { cmd: CommandEvent.GetPostsByUserId },
      existUser._id
    ))) as PostInterface[]).length;

    return { ...userEntity.toObject(), userPostsCount };
  }

  async loginUser(user: UserInterface) {
    const payload = {
      sub: user._id,
      email: user.email,
      role: user.role,
      lastname: user.lastname,
      firstname: user.firstname,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async changePassword(userId: string, dto: ChangePasswordDto): Promise<UserInterface> {
    const { currentPassword, newPassword } = dto;
    const existUser = await this.userRepository.findById(userId);

    if (!existUser) {
      throw new UnauthorizedException(AUTH_USER_NOT_FOUND);
    }

    const userEntity = new UserEntity(existUser);

    if (!(await userEntity.comparePassword(currentPassword))) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    await userEntity.setPassword(newPassword);
    return this.userRepository.update(userId, userEntity);
  }

  async makeSubscribe(subscriberId: string, userId: string): Promise<void> {
    const existUser = await this.userRepository.findById(userId);
    existUser.subscribersId.push(subscriberId);
    const userEntity = new UserEntity(existUser);
    this.userRepository.update(userId, userEntity);
  }

  async setAvatar(file: File, userId: string) {
    const existUser = await this.userRepository.findById(userId);

    if (!existUser) {
      throw new UnauthorizedException(AUTH_USER_NOT_FOUND);
    }

    throw new NotImplementedException();
  }
}
