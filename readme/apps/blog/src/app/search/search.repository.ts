import { Injectable } from '@nestjs/common';
import { getOrderByField } from '@readme/core';
import { PostInterface, PostState } from '@readme/shared-types';
import { SortType } from '../post/post.constant';
import { PrismaService } from '../prisma/prisma.service';
import { SearchQuery } from './query/search.query';

@Injectable()
export class SearchRepository {
  constructor(private readonly prisma: PrismaService) { }

  public async search({ query, limit, sortDirection, page, sortType }: SearchQuery): Promise<PostInterface[]> {
    return this.prisma.post.findMany({
      where: {
        state: PostState.Published,
        title: {
          search: query,
        }
      },
      take: limit,
      include: {
        _count: { select: { comments: true } }
      },
      orderBy: getOrderByField<SortType, string>(sortType, sortDirection),
      skip: page > 0 ? limit * (page - 1) : undefined,
    }) as Promise<PostInterface[]>;
  }
}
