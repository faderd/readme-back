import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { Put } from '@nestjs/common/decorators';
import { BadRequestException } from '@nestjs/common/exceptions';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject, GetUserFromToken, JwtAuthGuard } from '@readme/core';
import { MongoidValidationPipe } from '../pipes/mongo-validation.pipe';
import { AUTH_USER_SUBSCRIBE_YOURSELF } from './auth.constant';
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
}
