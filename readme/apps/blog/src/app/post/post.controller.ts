import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';
import { PostRdo } from './rdo/post.rdo';
import { fillObject, GetUserFromToken, JwtAuthGuard, MongoidValidationPipe } from '@readme/core';
import { PostQuery } from './query/post.query';
import { PostType } from '@readme/shared-types';
import { CreatePostVideoDto } from './dto/create-post-video.dto';
import { CreatePostTextDto } from './dto/create-post-text.dto';
import { CreatePostQuoteDto } from './dto/create-post-quote.dto';
import { CreatePostPhotoDto } from './dto/create-post-photo.dto';
import { CreatePostLinkDto } from './dto/create-post-link.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { BadRequestException } from '@nestjs/common/exceptions';
import { ERROR_ACTIONS_OWN_POST } from './post.constant';
import { PostInfoRdo } from './rdo/post-info.rdo';
import { CreatePostRdo } from './rdo/create-post.rdo';
import { PostsCountRdo } from './rdo/post-count.rdo';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
  ) { }

  @Post(`/${PostType.Video}`)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.CREATED,
    description: 'The new post has been successfully created',
  })
  async createVideo(
    @GetUserFromToken('id') userId: string,
    @Body() dto: CreatePostVideoDto
  ) {
    dto = fillObject(CreatePostVideoDto, dto);
    const newPost = await this.postService.create(dto, PostType.Video, userId);
    return fillObject(CreatePostRdo, newPost);
  }

  @Post(`/${PostType.Text}`)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.CREATED,
    description: 'The new post has been successfully created',
  })
  async createText(
    @GetUserFromToken('id') userId: string,
    @Body() dto: CreatePostTextDto
  ) {
    dto = fillObject(CreatePostTextDto, dto);
    const newPost = await this.postService.create(dto, PostType.Text, userId);
    return fillObject(CreatePostRdo, newPost);
  }

  @Post(`/${PostType.Quote}`)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.CREATED,
    description: 'The new post has been successfully created',
  })
  async createQuote(
    @GetUserFromToken('id') userId: string,
    @Body() dto: CreatePostQuoteDto
  ) {
    dto = fillObject(CreatePostQuoteDto, dto);
    const newPost = await this.postService.create(dto, PostType.Quote, userId);
    return fillObject(CreatePostRdo, newPost);
  }

  @Post(`/${PostType.Photo}`)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.CREATED,
    description: 'The new post has been successfully created',
  })
  async createPhoto(
    @GetUserFromToken('id') userId: string,
    @Body() dto: CreatePostPhotoDto
  ) {
    dto = fillObject(CreatePostPhotoDto, dto);
    const newPost = await this.postService.create(dto, PostType.Photo, userId);
    return fillObject(CreatePostRdo, newPost);
  }

  @Post(`/${PostType.Link}`)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.CREATED,
    description: 'The new post has been successfully created',
  })
  async createLink(
    @GetUserFromToken('id') userId: string,
    @Body() dto: CreatePostLinkDto
  ) {
    dto = fillObject(CreatePostLinkDto, dto);
    const newPost = await this.postService.create(dto, PostType.Link, userId);
    return fillObject(CreatePostRdo, newPost);
  }


  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    type: String,
    status: HttpStatus.OK,
    description: 'Post has been successfully deleted.',
  })
  async delete(
    @GetUserFromToken('id') userId: string,
    @Param('id', ParseIntPipe) postId: number,
  ) {
    const post = await this.postService.getById(postId);

    if (userId !== post.authorId) {
      throw new BadRequestException(ERROR_ACTIONS_OWN_POST);
    }

    return await this.postService.delete(postId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    type: String,
    status: HttpStatus.OK,
    description: 'Post has been successfully updated.',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePostDto,
    @GetUserFromToken('id') userId: string,
  ) {
    const post = await this.postService.getById(id);

    if (userId !== post.authorId) {
      throw new BadRequestException(ERROR_ACTIONS_OWN_POST);
    }

    const updatedPost = await this.postService.update(id, dto)
    return fillObject(PostRdo, updatedPost);
  }

  @Get('/')
  @ApiResponse({
    type: [PostRdo],
    status: HttpStatus.OK,
    description: 'Get posts list',
  })
  async getAll(@Query() query: PostQuery) {
    const posts = await this.postService.getAll(query);

    return posts.map((post) => fillObject(PostRdo, post));
  }

  @Get('/drafts')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    type: [PostRdo],
    status: HttpStatus.OK,
    description: 'Get drafts list',
  })
  async getDrafts(
    @GetUserFromToken('id') userId: string,
  ) {
    return this.postService.getDrafts(userId);
  }

  @Get(':id')
  @ApiResponse({
    type: PostInfoRdo,
    status: HttpStatus.OK,
  })
  async findById(@Param('id', ParseIntPipe) id: number) {
    const existPost = await this.postService.getById(id);
    return fillObject(PostInfoRdo, existPost);
  }

  @Post('/repost/:id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    type: PostInfoRdo,
    status: HttpStatus.CREATED,
    description: 'Repost has been successfully created'
  })
  async createRepost(
    @Param('id', ParseIntPipe) postId: number,
    @GetUserFromToken('id') userId: string,
  ) {
    return this.postService.createRepost(postId, userId);
  }

  @Get('/posts-count/:userId')
  @ApiResponse({
    type: PostsCountRdo,
    status: HttpStatus.OK,
    description: 'Get posts count by user id'
  })
  public async getPostsCountByUserId(
    @Param('userId', MongoidValidationPipe) userId: string,
  ) {
    console.log('controller: ', userId);

    const postsCount = await this.postService.getUserPostsCount(userId);

    return fillObject(PostsCountRdo, postsCount);
  }
}
