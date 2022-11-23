import { Injectable } from '@nestjs/common';
import { CRUDRepositoryInterface } from '@readme/core';
import { CommentInterface } from '@readme/shared-types';
import { CommentEntity } from './comment.entity';
import * as crypto from 'crypto';

@Injectable()
export class CommentMemoryRepository implements CRUDRepositoryInterface<CommentEntity, string, CommentInterface> {
  private repository: { [key: string]: CommentInterface } = {};

  public async create(item: CommentEntity): Promise<CommentInterface> {
    const entry = { ...item.toObject(), _id: crypto.randomUUID() };
    this.repository[entry._id] = entry;

    return { ...entry };
  }

  public async findById(id: string): Promise<CommentInterface> {
    if (this.repository[id]) {
      return { ...this.repository[id] };
    }

    return null;
  }

  public async findAll(): Promise<CommentInterface[]> {
    return Object.values(this.repository);
  }

  public async destroy(id: string): Promise<void> {
    delete this.repository[id];
  }

  public async update(id: string, item: CommentEntity): Promise<CommentInterface> {
    this.repository[id] = { ...item.toObject(), _id: id };
    return this.findById(id);
  }
}
