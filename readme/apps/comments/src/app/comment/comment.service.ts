import { Injectable } from '@nestjs/common';
import dayjs = require('dayjs');
import { CommentMemoryRepository } from './comment-memory.repository';
import { COMMENT_NOT_FOUND } from './comment.constant';
import { CommentEntity } from './comment.entity';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentMemoryRepository,
  ) { }

  async create(dto: CommentDto) {
    const { postId, text } = dto;

    const comment = { authorId: 'temporary id', date: dayjs().toDate(), postId, text };

    const commentEntity = await new CommentEntity(comment);

    return this.commentRepository.create(commentEntity);
  }

  async delete(id: string) {
    return this.commentRepository.destroy(id);
  }

  async getAll() {
    return this.commentRepository.findAll();
  }

  async update(id: string, dto: CommentDto) {
    const { postId, text } = dto;

    const existComment = await this.commentRepository.findById(id);

    if (!existComment) {
      throw new Error(COMMENT_NOT_FOUND);
    }

    const comment = { authorId: 'temporary id', date: dayjs().toDate(), postId, text };

    const commentEntity = await new CommentEntity(comment);

    return this.commentRepository.update(id, commentEntity);
  }
}
