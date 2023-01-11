import { Injectable } from '@nestjs/common/decorators';
import { PostInterface } from '@readme/shared-types';
import { SearchQuery } from './query/search.query';
import { SearchRepository } from './search.repository';

@Injectable()
export class SearchService {
  constructor(
    private readonly searchRepository: SearchRepository,
  ) { }

  async searchPosts(query: SearchQuery): Promise<PostInterface[]> {
    return this.searchRepository.search(query);
  }
}
