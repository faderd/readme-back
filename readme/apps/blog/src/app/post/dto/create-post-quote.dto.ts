import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsArray, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { PostQuoteAuthorLengthRange, PostQuoteLengthRange } from '../post.constant';

export class CreatePostQuoteDto {
  @ApiProperty({
    description: 'Quote text',
    example: 'I came like Water, and like Wind I go.',
  })
  @IsString()
  @MinLength(PostQuoteLengthRange.MIN, { message: `quoteText field min length: ${PostQuoteLengthRange.MIN}` })
  @MaxLength(PostQuoteLengthRange.MAX, { message: `quoteText field max length: ${PostQuoteLengthRange.MAX}` })
  @Expose()
  public quoteText: string;

  @ApiProperty({
    description: 'Quote author',
    example: 'Omar Khayyam',
  })
  @IsString()
  @MinLength(PostQuoteAuthorLengthRange.MIN, { message: `quoteAuthor field min length: ${PostQuoteAuthorLengthRange.MIN}` })
  @MaxLength(PostQuoteAuthorLengthRange.MAX, { message: `quoteAuthor field max length: ${PostQuoteAuthorLengthRange.MAX}` })
  @Expose()
  public quoteAuthor: string;

  @ApiProperty({
    description: 'Post tags',
    example: ''
  })
  @IsArray()
  @IsOptional()
  @Expose()
  public tags?: string[];
}
