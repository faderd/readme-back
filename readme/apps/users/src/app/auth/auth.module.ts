import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule } from '@nestjs/microservices/module';
import { PassportModule } from '@nestjs/passport';
import { MulterModule } from '@nestjs/platform-express';
import { getJwtConfig } from '@readme/config';
import { JwtStrategy } from '@readme/core';
import { getMulterOptions } from '../../config/multer.config';
import { getRabbitMqConfig } from '../../config/rabbitmq.config';
import { UserModule } from '../user/user.module';
import { RABBITMQ_SERVICE_NAME } from './auth.constant';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig
    }),
    ClientsModule.registerAsync([
      {
        name: RABBITMQ_SERVICE_NAME,
        useFactory: getRabbitMqConfig,
        inject: [ConfigService],
      }
    ]),
    MulterModule.registerAsync({
      useFactory: getMulterOptions
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule { }
