import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';
import { PostRdo } from './rdo/post.rdo';
import { fillObject } from '@readme/core';
import { PostQuery } from './query/post.query';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
  ) { }

  @Post('')
  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.CREATED,
    description: 'The new post has been successfully created',
  })
  async create(@Body() dto: CreatePostDto) {
    const newPost = await this.postService.create(dto);
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
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: CreatePostDto) {
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
