import { Body, Controller, Delete, Get, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject, GetUserFromToken, JwtAuthGuard } from '@readme/core';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';
import { CommentRdo } from './rdo/comment.rdo';

@ApiTags('comment')
@Controller('comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.CREATED,
    description: 'The new comment has been successfully created',
  })
  async create(
    @GetUserFromToken('id') userId: string,
    @Body() dto: CommentDto,
  ) {
    const newComment = await this.commentService.create(dto, userId);
    return fillObject(CommentRdo, newComment);
  }

  @Delete(':id')
  @ApiResponse({
    type: String,
    status: HttpStatus.OK,
    description: 'Comment has been successfully deleted.',
  })
  async delete(@Param('id') id: number) {
    return await this.commentService.delete(id)
  }

  @Get('/:postId')
  @ApiResponse({
    status: HttpStatus.OK
  })
  async getAll(@Param('postId') postId: number) {
    const comments = await this.commentService.getAll(postId);

    return comments.map((comment) => fillObject(CommentRdo, comment));
  }
}
