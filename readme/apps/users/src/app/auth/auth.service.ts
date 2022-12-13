import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserInterface, UserRole } from '@readme/shared-types';
import dayjs = require('dayjs');
import { UserEntity } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from './auth.constant';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {
  }

  async register(dto: CreateUserDto) {
    const { email, firstname, lastname, password } = dto;
    const user = {
      email, firstname, lastname, role: UserRole.User,
      avatar: '', dateRegistration: dayjs().toDate(),
      passwordHash: ''
    };

    const existUser = await this.userRepository
      .findByEmail(email);

    if (existUser) {
      throw new Error(AUTH_USER_EXISTS);
    }

    const userEntity = await new UserEntity(user)
      .setPassword(password);

    return this.userRepository
      .create(userEntity);
  }

  async verifyUser(dto: LoginUserDto) {
    const { email, password } = dto;
    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new UnauthorizedException(AUTH_USER_NOT_FOUND);
    }

    const blogUserEntity = new UserEntity(existUser);
    if (! await blogUserEntity.comparePassword(password)) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    return blogUserEntity.toObject();
  }

  async getUser(id: string) {
    return this.userRepository.findById(id);
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
}
