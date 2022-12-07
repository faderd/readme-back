import { Injectable } from '@nestjs/common';
import { Post } from '@prisma/client';
import { CRUDRepositoryInterface } from '@readme/core';
import { PostInterface } from '@readme/shared-types';
import { PrismaService } from '../prisma/prisma.service';
import { PostEntity } from './post.entity';

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

  public async findAll(): Promise<PostInterface[]> {
    console.log(await this.prisma.post.findMany());
    return this.prisma.post.findMany() as Promise<PostInterface[]>;
  }

  public async update(id: number, item: PostEntity): Promise<PostInterface> {
    return Promise.resolve(undefined);
  }
}
