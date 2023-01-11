import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { ConfigModule } from '@nestjs/config';
import { ENV_FILE_PATH } from './app.constant';
import { rabbitMqOptions } from '../config/rabbitmq.config';
import { jwtConfig } from '@readme/config';
import { LikeModule } from './like/like.module';
import { SearchModule } from './search/search.module';
import envSchema from './env.schema';

@Module({
  imports: [
    PostModule,
    CommentModule,
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [rabbitMqOptions, jwtConfig],
      validationSchema: envSchema,
    }),
    LikeModule,
    SearchModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
