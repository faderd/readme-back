import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ENV_FILE_PATH } from './app.constant';
import databaseConfig from '../config/database.config';
import envSchema from './env.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoDbConfig } from '../config/mongodb.config';
import { jwtOptions } from '../config/jwt.config';


@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [databaseConfig, jwtOptions],
      validationSchema: envSchema,
    }),
    MongooseModule.forRootAsync(
      getMongoDbConfig()
    ),
    UserModule,
    AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
