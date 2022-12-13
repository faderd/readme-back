import { Injectable } from '@nestjs/common';
import { PostInterface } from '@readme/shared-types';
import dayjs = require('dayjs');
import { CreatePostDto } from './dto/create-post.dto';
import { DEFAULT_POST_STATE, POST_NOT_FOUND } from './post.constant';
import { PostEntity } from './post.entity';
import { PostRepository } from './post.repository';
import { PostQuery } from './query/post.query';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
  ) { }

  async create(dto: CreatePostDto): Promise<PostInterface> {
    const post = { ...dto, datePublication: dayjs().toDate(), state: DEFAULT_POST_STATE, isRepost: false, authorId: '' };

    const postEntity = new PostEntity(post);

    return this.postRepository.create(postEntity);
  }

  async delete(id: number) {
    return this.postRepository.destroy(id);
  }

  async getAll(query: PostQuery): Promise<PostInterface[]> {
    return this.postRepository.findAll(query);
  }

  async update(id: number, dto: CreatePostDto) {
    const { type, tags, title, urlVideo, announcement, postText, quoteText, quoteAuthor, photo, link, description } = dto;

    const existPost = await this.postRepository.findById(id);

    if (!existPost) {
      throw new Error(POST_NOT_FOUND);
    }

    const post = { type, tags, title, urlVideo, announcement, postText, quoteText, quoteAuthor, photo, link, description, datePublication: dayjs().toDate(), state: DEFAULT_POST_STATE, isRepost: false, authorId: '' };

    const postEntity = await new PostEntity(post);

    return this.postRepository.update(id, postEntity);
  }

  async getById(id: number) {
    return this.postRepository.findById(id);
  }
}
