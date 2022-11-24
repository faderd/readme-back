import { Body, Controller, Delete, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { fillObject } from '@readme/core';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';
import { CommentRdo } from './rdo/comment.rdo';

@Controller('comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
  ) { }

  @Post('')
  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.CREATED,
    description: 'The new comment has been successfully created',
  })
  async create(@Body() dto: CommentDto) {
    const newComment = await this.commentService.create(dto);
    return fillObject(CommentRdo, newComment);
  }

  @Delete(':id')
  @ApiResponse({
    type: String,
    status: HttpStatus.OK,
    description: 'Comment has been successfully deleted.',
  })
  async delete(@Param('id') id: string) {
    return await this.commentService.delete(id)
  }

  @Get('')
  @ApiResponse({
    status: HttpStatus.OK
  })
  async getAll() {
    const comments = await this.commentService.getAll();

    return comments.map((comment) => fillObject(CommentRdo, comment));
  }
}
