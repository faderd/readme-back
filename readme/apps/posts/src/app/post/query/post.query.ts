import { Transform } from 'class-transformer';
import { IsIn, IsNumber, IsOptional } from 'class-validator';
import { DEFAULT_POST_COUNT_LIMIT, DEFAULT_SORT_DIRECTION } from '../post.constant';

export class PostQuery {
    @Transform(({ value }) => +value || DEFAULT_POST_COUNT_LIMIT)
    @IsNumber()
    @IsOptional()
    public limit = DEFAULT_POST_COUNT_LIMIT;

    @IsIn(['asc', 'desc'])
    @IsOptional()
    public sortDirection: 'desc' | 'asc' = DEFAULT_SORT_DIRECTION;

    @Transform(({ value }) => +value)
    @IsOptional()
    public page: number;
}
