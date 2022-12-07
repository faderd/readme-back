import { Injectable } from '@nestjs/common';
import { CRUDRepositoryInterface } from '@readme/core';
import { PostInterface } from '@readme/shared-types';
import { PostEntity } from './post.entity';
import * as crypto from 'crypto';

@Injectable()
export class PostMemoryRepository implements CRUDRepositoryInterface<PostEntity, number, PostInterface> {
  private repository: { [key: string]: PostInterface } = {};

  public async create(item: PostEntity): Promise<PostInterface> {
    const entry = { ...item.toObject(), _id: crypto.randomUUID() };
    this.repository[entry._id] = entry;

    return { ...entry };
  }

  public async findById(id: number): Promise<PostInterface> {
    if (this.repository[id]) {
      return { ...this.repository[id] };
    }

    return null;
  }

  public async findAll(): Promise<PostInterface[]> {
    return Object.values(this.repository);
  }

  public async destroy(id: number): Promise<void> {
    delete this.repository[id];
  }

  public async update(id: number, item: PostEntity): Promise<PostInterface> {
    this.repository[id] = { ...item.toObject(), id };
    return this.findById(id);
  }
}
