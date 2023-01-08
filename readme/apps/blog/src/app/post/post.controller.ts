import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';
import { PostRdo } from './rdo/post.rdo';
import { fillObject } from '@readme/core';
import { PostQuery } from './query/post.query';
import { PostType } from '@readme/shared-types';
import { CreatePostVideoDto } from './dto/create-post-video.dto';
import { CreatePostTextDto } from './dto/create-post-text.dto';
import { CreatePostQuoteDto } from './dto/create-post-quote.dto';
import { CreatePostPhotoDto } from './dto/create-post-photo.dto';
import { CreatePostLinkDto } from './dto/create-post-link.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
  ) { }

  @Post(`/${PostType.Video}`)
  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.CREATED,
    description: 'The new post has been successfully created',
  })
  async createVideo(@Body() dto: CreatePostVideoDto) {
    dto = fillObject(CreatePostVideoDto, dto);
    const newPost = await this.postService.create(dto, PostType.Video);
    return fillObject(PostRdo, newPost);
  }

  @Post(`/${PostType.Text}`)
  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.CREATED,
    description: 'The new post has been successfully created',
  })
  async createText(@Body() dto: CreatePostTextDto) {
    dto = fillObject(CreatePostTextDto, dto);
    const newPost = await this.postService.create(dto, PostType.Text);
    return fillObject(PostRdo, newPost);
  }

  @Post(`/${PostType.Quote}`)
  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.CREATED,
    description: 'The new post has been successfully created',
  })
  async createQuote(@Body() dto: CreatePostQuoteDto) {
    dto = fillObject(CreatePostQuoteDto, dto);
    const newPost = await this.postService.create(dto, PostType.Quote);
    return fillObject(PostRdo, newPost);
  }

  @Post(`/${PostType.Photo}`)
  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.CREATED,
    description: 'The new post has been successfully created',
  })
  async createPhoto(@Body() dto: CreatePostPhotoDto) {
    dto = fillObject(CreatePostPhotoDto, dto);
    const newPost = await this.postService.create(dto, PostType.Photo);
    return fillObject(PostRdo, newPost);
  }

  @Post(`/${PostType.Link}`)
  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.CREATED,
    description: 'The new post has been successfully created',
  })
  async createLink(@Body() dto: CreatePostLinkDto) {
    dto = fillObject(CreatePostLinkDto, dto);
    const newPost = await this.postService.create(dto, PostType.Link);
    return fillObject(PostRdo, newPost);
  }


  @Delete(':id')
  @ApiResponse({
    type: String,
    status: HttpStatus.OK,
    description: 'Post has been successfully deleted.',
  })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.postService.delete(id);
  }

  @Patch(':id')
  @ApiResponse({
    type: String,
    status: HttpStatus.OK,
    description: 'Post has been successfully updated.',
  })
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePostDto) {
    const updatedPost = await this.postService.update(id, dto)
    return fillObject(PostRdo, updatedPost);
  }

  @Get('')
  @ApiResponse({
    status: HttpStatus.OK
  })
  async getAll(@Query() query: PostQuery) {
    const posts = await this.postService.getAll(query);

    return posts.map((post) => fillObject(PostRdo, post));
  }

  @Get(':id')
  @ApiResponse({
    type: String,
    status: HttpStatus.OK,
  })
  async findById(@Param('id', ParseIntPipe) id: number) {
    return await this.postService.getById(id);
  }
}
