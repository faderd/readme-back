import { Inject, Injectable } from '@nestjs/common';
import { BadRequestException, NotFoundException } from '@nestjs/common/exceptions';
import { ClientProxy } from '@nestjs/microservices';
import { createEvent } from '@readme/core';
import { CommandEvent, PostInterface, PostType } from '@readme/shared-types';
import dayjs = require('dayjs');
import { CommentRepository } from '../comment/comment.repository';
import { CreatePostLinkDto } from './dto/create-post-link.dto';
import { CreatePostPhotoDto } from './dto/create-post-photo.dto';
import { CreatePostQuoteDto } from './dto/create-post-quote.dto';
import { CreatePostTextDto } from './dto/create-post-text.dto';
import { CreatePostVideoDto } from './dto/create-post-video.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { DEFAULT_POST_STATE, ERROR_REPOST_EXIST, POST_NOT_FOUND, RABBITMQ_SERVICE_NAME } from './post.constant';
import { PostEntity } from './post.entity';
import { PostRepository } from './post.repository';
import { PostQuery } from './query/post.query';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly commentRepository: CommentRepository,
    @Inject(RABBITMQ_SERVICE_NAME) private readonly rabbitClient: ClientProxy,
  ) { }

  async create(
    dto: CreatePostVideoDto | CreatePostTextDto | CreatePostQuoteDto | CreatePostPhotoDto | CreatePostLinkDto,
    postType: PostType,
    userId: string
  ): Promise<PostInterface> {
    const post = { ...dto, state: DEFAULT_POST_STATE, isRepost: false, authorId: userId, type: postType };

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
    this.commentRepository.deleteCommentsByPostId(id)
      .then(() => {
        return this.postRepository.destroy(id);
      });

  }

  async getAll(query: PostQuery): Promise<PostInterface[]> {
    return this.postRepository.findAll(query);
  }

  async update(id: number, dto: UpdatePostDto) {
    const { tags, title, urlVideo, announcement, postText, quoteText, quoteAuthor, photo, link, description } = dto;

    const existPost = await this.postRepository.findById(id);

    if (!existPost) {
      throw new NotFoundException(POST_NOT_FOUND);
    }

    const post = { tags, title, urlVideo, announcement, postText, quoteText, quoteAuthor, photo, link, description, datePublication: dayjs().toDate(), state: DEFAULT_POST_STATE, isRepost: false, authorId: '', type: existPost.type };

    const postEntity = new PostEntity(post);

    return this.postRepository.update(id, postEntity);
  }

  async getById(id: number) {
    return this.postRepository.findById(id);
  }

  async getByUserId(userId: string) {
    return this.postRepository.findByUserId(userId);
  }

  async createRepost(postId: number, userId: string) {
    const existPost = await this.postRepository.findById(postId);

    if (!existPost) {
      throw new NotFoundException(POST_NOT_FOUND);
    }

    const isUniqueRepost = !(await this.postRepository.findByUserId(userId)).find((post) => post.isRepost && post.originalPostId === postId);

    if (!isUniqueRepost) {
      throw new BadRequestException(ERROR_REPOST_EXIST);
    }

    existPost.originalAuthorId = existPost.authorId;
    existPost.authorId = userId;
    existPost.originalPostId = existPost.id;
    existPost.isRepost = true;
    existPost.datePublication = dayjs().toDate();

    const postEntity = new PostEntity(existPost);

    return this.postRepository.create(postEntity);
  }
}
