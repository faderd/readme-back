import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { rabbitMqOptions } from '../config/rabbitmq.config';
import { ENV_FILE_PATH } from './app.constant';
import envSchema from './env.schema';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [rabbitMqOptions],
      validationSchema: envSchema,
    }),
    PostModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
