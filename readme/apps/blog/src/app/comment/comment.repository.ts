import { Injectable } from '@nestjs/common';
import { CRUDRepositoryInterface } from '@readme/core';
import { CommentInterface } from '@readme/shared-types';
import { PrismaService } from '../prisma/prisma.service';
import { CommentEntity } from './comment.entity';

@Injectable()
export class CommentRepository implements CRUDRepositoryInterface<CommentEntity, number, CommentInterface> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: CommentEntity): Promise<CommentInterface> {
    const entityData = item.toObject();

    return this.prisma.comment.create({
      data: { ...entityData }
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.comment.delete({
      where: {
        id: +id,
      }
    });
  }

  public async findById(id: number): Promise<CommentInterface> {
    return this.prisma.comment.findFirst({
      where: {
        id: +id,
      },
    });
  }

  public async update(id: number, item: CommentEntity): Promise<CommentInterface> {
    return this.prisma.comment.update({
      where: {
        id: id,
      },
      data: item,
    });
  }

  public async findAllByPostId(postId: number): Promise<CommentInterface[]> {
    return this.prisma.comment.findMany({
      where: {
        postId: postId,
      },
    });
  }

  public async deleteCommentsByPostId(postId: number): Promise<void> {
    await this.prisma.comment.deleteMany({
      where: {
        postId: postId,
      },
    });
  }
}
