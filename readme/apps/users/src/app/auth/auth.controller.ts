import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseFilePipeBuilder, Post, UseGuards } from '@nestjs/common';
import { Put, UploadedFile, UseInterceptors } from '@nestjs/common/decorators';
import { BadRequestException } from '@nestjs/common/exceptions';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject, GetUserFromToken, JwtAuthGuard, MongoidValidationPipe } from '@readme/core';
import { AUTH_USER_SUBSCRIBE_YOURSELF, AVATAR_ALLOW_FILE_TYPES, AVATAR_MAX_FILE_SIZE } from './auth.constant';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { ShowUserRdo } from './rdo/show-user.rdo';
import { UserRdo } from './rdo/user.rdo';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @Post('register')
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.',
  })
  async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    return fillObject(UserRdo, newUser);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'User has been successfully logged.',
  })
  async login(@Body() dto: LoginUserDto) {
    const user = await this.authService.verifyUser(dto);
    const accessToken = (await this.authService.loginUser(user)).access_token;
    return fillObject(LoggedUserRdo, { ...user, accessToken })
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User found',
  })
  async show(@Param('id', MongoidValidationPipe) id: string) {
    const existUser = await this.authService.getUser(id);
    return fillObject(ShowUserRdo, { ...existUser, userSubscribersCount: existUser.subscribersId.length });
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/password')
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  async changePassword(
    @Param('id', MongoidValidationPipe) id: string,
    @Body() dto: ChangePasswordDto,
  ) {
    const updatedUser = await this.authService.changePassword(id, dto);
    return fillObject(UserRdo, updatedUser);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/subscribe/:id')
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  async makeSubscribe(
    @Param('id', MongoidValidationPipe) userId: string,
    @GetUserFromToken('id') subscriberId: string,
  ) {
    if (userId === subscriberId) {
      throw new BadRequestException(AUTH_USER_SUBSCRIBE_YOURSELF);
    }

    return this.authService.makeSubscribe(subscriberId, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  async uploadAvatar(
    @GetUserFromToken('id') userId: string,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({fileType: AVATAR_ALLOW_FILE_TYPES})
        .addMaxSizeValidator({maxSize: AVATAR_MAX_FILE_SIZE})
        .build()
    ) file: Express.Multer.File,
  ) {
    const updatedUser = await this.authService.setAvatar(file, userId);
    return fillObject(UserRdo, updatedUser);
  }
}
