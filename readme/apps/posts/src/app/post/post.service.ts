import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { createEvent } from '@readme/core';
import { CommandEvent, PostInterface, PostType } from '@readme/shared-types';
import dayjs = require('dayjs');
import { CreatePostLinkDto } from './dto/create-post-link.dto';
import { CreatePostPhotoDto } from './dto/create-post-photo.dto';
import { CreatePostQuoteDto } from './dto/create-post-quote.dto';
import { CreatePostTextDto } from './dto/create-post-text.dto';
import { CreatePostVideoDto } from './dto/create-post-video.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { DEFAULT_POST_STATE, POST_NOT_FOUND, RABBITMQ_SERVICE_NAME } from './post.constant';
import { PostEntity } from './post.entity';
import { PostRepository } from './post.repository';
import { PostQuery } from './query/post.query';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    @Inject(RABBITMQ_SERVICE_NAME) private readonly rabbitClient: ClientProxy,
  ) { }

  async create(dto: CreatePostVideoDto | CreatePostTextDto | CreatePostQuoteDto | CreatePostPhotoDto | CreatePostLinkDto, postType: PostType): Promise<PostInterface> {
    const post = { ...dto, state: DEFAULT_POST_STATE, isRepost: false, authorId: '', type: postType };

    const postEntity = new PostEntity(post);
    const result = await this.postRepository.create(postEntity);

    this.rabbitClient.emit(
      createEvent(CommandEvent.AddPost),
      {
        newPostId: result.id,
      }
    );

    return result;
  }

  async delete(id: number) {
    return this.postRepository.destroy(id);
  }

  async getAll(query: PostQuery): Promise<PostInterface[]> {
    return this.postRepository.findAll(query);
  }

  async update(id: number, dto: UpdatePostDto) {
    const { tags, title, urlVideo, announcement, postText, quoteText, quoteAuthor, photo, link, description } = dto;

    const existPost = await this.postRepository.findById(id);

    if (!existPost) {
      throw new Error(POST_NOT_FOUND);
    }

    const post = { tags, title, urlVideo, announcement, postText, quoteText, quoteAuthor, photo, link, description, datePublication: dayjs().toDate(), state: DEFAULT_POST_STATE, isRepost: false, authorId: '', type: existPost.type };

    const postEntity = new PostEntity(post);

    return this.postRepository.update(id, postEntity);
  }

  async getById(id: number) {
    return this.postRepository.findById(id);
  }
}
