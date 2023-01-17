import { Controller, Get, Query } from '@nestjs/common/decorators';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@readme/core';
import { PostRdo } from '../post/rdo/post.rdo';
import { SearchQuery } from './query/search.query';
import { SearchService } from './search.service';

@ApiTags('search')
@Controller('search')
export class SearchController {
  constructor(
    private readonly searchService: SearchService,
  ) { }

  @Get('/posts')
  @ApiOkResponse({
    type: [PostRdo],
    description: 'Get posts list',
  })
  async searchPosts(@Query() query: SearchQuery) {
    const searchResults = await this.searchService.searchPosts(query);

    return searchResults.map((post) => fillObject(PostRdo, post));
  }
}
