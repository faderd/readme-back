import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { MulterModule } from '@nestjs/platform-express';
import { getMulterOptions } from '../../config/multer.config';
import { getRabbitMqConfig } from '../../config/rabbitmq.config';
import { CommentRepository } from '../comment/comment.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { RABBITMQ_SERVICE_NAME } from './post.constant';
import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';

@Module({
  controllers: [PostController],
  providers: [PostService, PostRepository, CommentRepository],
  imports: [
    PrismaModule,
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
  exports: [],
})
export class PostModule { }
