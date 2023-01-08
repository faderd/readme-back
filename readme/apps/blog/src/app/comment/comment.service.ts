import { Injectable } from '@nestjs/common';
import dayjs = require('dayjs');
import { PostRepository } from '../post/post.repository';
import { COMMENT_NOT_FOUND, POST_NOT_EXIST } from './comment.constant';
import { CommentEntity } from './comment.entity';
import { CommentRepository } from './comment.repository';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly postRepository: PostRepository,
  ) { }

  async create(dto: CommentDto) {
    const { postId, text } = dto;

    // Проверим, существует ли пост с таким id
    if (! await this.postRepository.findById(+postId)) {
      throw new Error(POST_NOT_EXIST);
    }

    const comment = { authorId: '2j4w', date: dayjs().toDate(), postId: +postId, text };

    const commentEntity = new CommentEntity(comment);

    return this.commentRepository.create(commentEntity);
  }

  async delete(id: number) {
    return this.commentRepository.destroy(+id);
  }

  async getAll(postId: number) {
    return this.commentRepository.findAllByPostId(postId);
  }

  async update(id: number, dto: CommentDto) {
    const { postId, text } = dto;

    const existComment = await this.commentRepository.findById(id);

    if (!existComment) {
      throw new Error(COMMENT_NOT_FOUND);
    }

    const comment = { authorId: 'temporary id', date: dayjs().toDate(), postId: +postId, text };

    const commentEntity = new CommentEntity(comment);

    return this.commentRepository.update(+id, commentEntity);
  }
}
