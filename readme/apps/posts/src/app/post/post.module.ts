import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { getRabbitMqConfig } from '../../config/rabbitmq.config';
import { PrismaModule } from '../prisma/prisma.module';
import { PostMemoryRepository } from './post-memory.repository';
import { RABBITMQ_SERVICE_NAME } from './post.constant';
import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';

@Module({
  controllers: [PostController],
  providers: [PostService, PostMemoryRepository, PostRepository],
  imports: [
    PrismaModule,
    ClientsModule.registerAsync([
      {
        name: RABBITMQ_SERVICE_NAME,
        useFactory: getRabbitMqConfig,
        inject: [ConfigService],
      }
    ]),
  ],
  exports: [],
})
export class PostModule { }
