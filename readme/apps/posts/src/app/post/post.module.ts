import { Module } from '@nestjs/common';
import { PostMemoryRepository } from './post-memory.repository';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  controllers: [PostController],
  providers: [PostService, PostMemoryRepository],
  exports: []
})
export class PostModule { }
