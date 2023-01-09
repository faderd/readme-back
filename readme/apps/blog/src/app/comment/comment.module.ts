import { Module } from '@nestjs/common';
import { JwtStrategy } from '@readme/core';
import { PostRepository } from '../post/post.repository';
import { CommentController } from './comment.controller';
import { CommentRepository } from './comment.repository';
import { CommentService } from './comment.service';

@Module({
  controllers: [CommentController],
  providers: [CommentService, CommentRepository, PostRepository, JwtStrategy],
  exports: [],
})
export class CommentModule {}
