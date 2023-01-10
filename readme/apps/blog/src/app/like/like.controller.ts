import { Controller, HttpStatus, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject, GetUserFromToken, JwtAuthGuard } from '@readme/core';
import { PostRdo } from '../post/rdo/post.rdo';
import { LikeService } from './like.service';

@ApiTags('like')
@Controller('like')
export class LikeController {
  constructor(
    private readonly likeService: LikeService,
  ) { }

  @Post('/set-like/:id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
  })
  async setLike(
    @GetUserFromToken('id') userId: string,
    @Param('id', ParseIntPipe) postId: number,
  ) {
    const updatedPost = await this.likeService.setLike(userId, postId);
    return fillObject(PostRdo, updatedPost);
  }

  @Post('/remove-like/:id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
  })
  async removeLike(
    @GetUserFromToken('id') userId: string,
    @Param('id', ParseIntPipe) postId: number,
  ) {
    const updatedPost = await this.likeService.removeLike(userId, postId);
    return fillObject(PostRdo, updatedPost);
  }
}
