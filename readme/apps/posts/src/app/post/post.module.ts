import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PostMemoryRepository } from './post-memory.repository';
import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';

@Module({
  controllers: [PostController],
  providers: [PostService, PostMemoryRepository, PostRepository],
  imports: [PrismaModule],
  exports: [],
})
export class PostModule { }
