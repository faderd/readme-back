import { Injectable, NotFoundException } from '@nestjs/common';
import { PostInterface, PostState } from '@readme/shared-types';
import { POST_NOT_FOUND } from '../post/post.constant';
import { PostEntity } from '../post/post.entity';
import { PostRepository } from '../post/post.repository';

@Injectable()
export class LikeService {
  constructor(
    private readonly postRepository: PostRepository,
  ) {}

  async setLike(userId: string, postId: number): Promise<PostInterface> {
    const existPost = await this.postRepository.findById(postId);

    if (!existPost || existPost.state !== PostState.Published) {
      throw new NotFoundException(POST_NOT_FOUND);
    }

    const likeUserIds = new Set(existPost.likeUserIds);
    likeUserIds.add(userId);

    existPost.likeUserIds = Array.from(likeUserIds);

    const postEntity = new PostEntity(existPost);

    return this.postRepository.update(postId, postEntity);
  }

  async removeLike(userId: string, postId: number): Promise<PostInterface> {
    const existPost = await this.postRepository.findById(postId);

    if (!existPost) {
      throw new NotFoundException(POST_NOT_FOUND);
    }

    const likeUserIds = new Set(existPost.likeUserIds);
    likeUserIds.delete(userId);

    existPost.likeUserIds = Array.from(likeUserIds);

    const postEntity = new PostEntity(existPost);

    return this.postRepository.update(postId, postEntity);
  }
}
