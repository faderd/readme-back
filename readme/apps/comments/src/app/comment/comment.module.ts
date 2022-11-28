import { Module } from '@nestjs/common';
import { CommentMemoryRepository } from './comment-memory.repository';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
  controllers: [CommentController],
  providers: [CommentService, CommentMemoryRepository],
  exports: [],
})
export class CommentModule {}
