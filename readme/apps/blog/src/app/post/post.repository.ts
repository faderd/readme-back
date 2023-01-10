import { Injectable } from '@nestjs/common';
import { Post } from '@prisma/client';
import { CRUDRepositoryInterface } from '@readme/core';
import { PostInterface } from '@readme/shared-types';
import { PrismaService } from '../prisma/prisma.service';
import { PostEntity } from './post.entity';
import { PostQuery } from './query/post.query';

@Injectable()
export class PostRepository implements CRUDRepositoryInterface<PostEntity, number, PostInterface> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: PostEntity): Promise<PostInterface> {
    const entityData = item.toObject();

    return this.prisma.post.create({
      data: { ...entityData as Post }
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
        id: +id,
      },
    }) as Promise<PostInterface>;
  }

  public async findAll({ limit, sortDirection, page }: PostQuery): Promise<PostInterface[]> {
    return this.prisma.post.findMany({
      take: limit,
      orderBy: [
        {
          datePublication: sortDirection
        }
      ],
      skip: page > 0 ? limit * (page - 1) : undefined,
    }) as Promise<PostInterface[]>;
  }

  public async update(id: number, item: PostEntity): Promise<PostInterface> {
    return Promise.resolve(undefined);
  }

  public async findByUserId(userId: string): Promise<PostInterface[]> {
    return this.prisma.post.findMany({
      where: {
        authorId: userId,
      },
    }) as Promise<PostInterface[]>;
  }
}
