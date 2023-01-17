import { Injectable } from '@nestjs/common';
import { Post } from '@prisma/client';
import { CRUDRepositoryInterface, getOrderByField } from '@readme/core';
import { PostInterface, PostState } from '@readme/shared-types';
import { PrismaService } from '../prisma/prisma.service';
import { SortType } from './post.constant';
import { PostEntity } from './post.entity';
import { PostQuery } from './query/post.query';

@Injectable()
export class PostRepository implements CRUDRepositoryInterface<PostEntity, number, PostInterface> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: PostEntity): Promise<PostInterface> {
    const entityData = item.toObject();

    return this.prisma.post.create({
      data: {
        ...entityData as Post,
        comments: {
          connect: []
        },
      }
    }) as Promise<PostInterface>;
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.post.delete({
      where: {
        id: +id,
      }
    });
  }

  public async findById(id: number): Promise<PostInterface | null> {
    return this.prisma.post.findFirst({
      where: {
        id,
      },
    }) as Promise<PostInterface>;
  }

  public async findAll({ limit, sortDirection, page, sortType, postType, userId, tag }: PostQuery): Promise<PostInterface[]> {
    return this.prisma.post.findMany({
      where: (postType || userId || tag) ? {
        state: PostState.Published,
        OR: [{
          type: postType,
        }, {
          authorId: userId,
        }, {
          tags: {
            has: tag ?? null
          }
        }]
      } : {
        state: PostState.Published
      },
      take: limit,
      include: {
        _count: { select: { comments: true } }
      },
      orderBy: getOrderByField<SortType, string>(sortType, sortDirection),
      skip: page > 0 ? limit * (page - 1) : undefined,
    }) as Promise<PostInterface[]>;
  }

  public async update(id: number, item: PostEntity): Promise<PostInterface> {
    return this.prisma.post.update({
      where: {
        id: id,
      },
      data: item,
      include: {
        _count: { select: { comments: true } }
      },
    }) as Promise<PostInterface>;
  }

  public async findByUserIdAll(userId: string): Promise<PostInterface[]> {

    return this.prisma.post.findMany({
      where: {
        authorId: userId,
      },
    }) as Promise<PostInterface[]>;
  }

  public async findDrafts(userId: string): Promise<PostInterface[]> {
    return this.prisma.post.findMany({
      where: {
        authorId: userId,
        state: PostState.Draft,
      }
    }) as Promise<PostInterface[]>;
  }

  public async getUserPostsCount(userId: string): Promise<number> {
    return this.prisma.post.count({
      where: {
        authorId: userId,
        state: PostState.Published,
      },
    });
  }
}
