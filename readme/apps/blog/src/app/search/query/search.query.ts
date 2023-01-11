import { Transform } from 'class-transformer';
import { IsIn, IsNumber, IsOptional } from 'class-validator';
import { DEFAULT_SEARCH_POST_COUNT_LIMIT, DEFAULT_SORT_DIRECTION } from '../search.constant';

export class SearchQuery {
  public query: string;

  @Transform(({ value }) => +value || DEFAULT_SEARCH_POST_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_SEARCH_POST_COUNT_LIMIT;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection: 'desc' | 'asc' = DEFAULT_SORT_DIRECTION;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;
}
