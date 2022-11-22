import { Injectable } from '@nestjs/common';
import dayjs = require('dayjs');
import { CreatePostDto } from './dto/create-post.dto';
import { PostMemoryRepository } from './post-memory.repository';
import { DEFAULT_POST_STATE, POST_NOT_FOUND } from './post.constant';
import { PostEntity } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostMemoryRepository,
  ) { }

  async create(dto: CreatePostDto) {
    const { type, tags, title, urlVideo, announcement, postText, quoteText, quoteAuthor, photo, link, description } = dto;

    const post = { type, tags, title, urlVideo, announcement, postText, quoteText, quoteAuthor, photo, link, description, datePublication: dayjs().toDate(), state: DEFAULT_POST_STATE, isRepost: false, authorId: '' };

    const postEntity = await new PostEntity(post);

    return this.postRepository.create(postEntity);
  }

  async delete(id: string) {
    return this.postRepository.destroy(id);
  }

  async getAll() {
    return this.postRepository.findAll();
  }

  async update(id: string, dto: CreatePostDto) {
    const { type, tags, title, urlVideo, announcement, postText, quoteText, quoteAuthor, photo, link, description } = dto;

    const existPost = await this.postRepository.findById(id);

    if (!existPost) {
      throw new Error(POST_NOT_FOUND);
    }

    const post = { type, tags, title, urlVideo, announcement, postText, quoteText, quoteAuthor, photo, link, description, datePublication: dayjs().toDate(), state: DEFAULT_POST_STATE, isRepost: false, authorId: '' };

    const postEntity = await new PostEntity(post);

    return this.postRepository.update(id, postEntity);
  }
}
