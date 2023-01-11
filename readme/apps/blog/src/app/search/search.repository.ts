import { Injectable } from '@nestjs/common';
import { PostInterface, PostState } from '@readme/shared-types';
import { PrismaService } from '../prisma/prisma.service';
import { SearchQuery } from './query/search.query';

@Injectable()
export class SearchRepository {
  constructor(private readonly prisma: PrismaService) { }

  public async search({ query, limit, sortDirection, page }: SearchQuery): Promise<PostInterface[]> {
    return this.prisma.post.findMany({
      where: {
        state: PostState.Published,
        title: {
          search: query,
        }
      },
      take: limit,
      orderBy: [
        {
          datePublication: sortDirection
        }
      ],
      skip: page > 0 ? limit * (page - 1) : undefined,
    }) as Promise<PostInterface[]>;
  }
}
