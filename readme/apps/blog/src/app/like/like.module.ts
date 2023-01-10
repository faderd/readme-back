import { Module } from '@nestjs/common';
import { PostRepository } from '../post/post.repository';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';

@Module({
  controllers: [LikeController],
  providers: [LikeService, PostRepository]
})
export class LikeModule {}
