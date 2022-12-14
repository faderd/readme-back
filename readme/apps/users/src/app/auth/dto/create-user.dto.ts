import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { AuthUserNameLengthRange, AuthUserPasswordLengthRange, AUTH_USER_EMAIL_NOT_VALID } from '../auth.constant';

export class CreateUserDto {
  @ApiProperty({
    description: 'User uniq email',
    example: 'user@user.ru',
  })
  @IsEmail(
    {},
    { message: AUTH_USER_EMAIL_NOT_VALID }
  )
  public email: string;

  @ApiProperty({
    description: 'User first name',
    example: 'John',
  })
  @IsString()
  @MinLength(AuthUserNameLengthRange.MIN, { message: `Firstname min length: ${AuthUserNameLengthRange.MIN}` })
  @MaxLength(AuthUserNameLengthRange.MAX, { message: `Firstname max length: ${AuthUserNameLengthRange.MAX}` })
  public firstname: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Smith',
  })
  @IsString()
  @MinLength(AuthUserNameLengthRange.MIN, { message: `Lastname min length: ${AuthUserNameLengthRange.MIN}` })
  @MaxLength(AuthUserNameLengthRange.MAX, { message: `Lastname max length: ${AuthUserNameLengthRange.MAX}` })
  public lastname: string;

  @ApiProperty({
    description: 'User password',
    example: 'qwerty',
  })
  @IsString()
  @MinLength(AuthUserPasswordLengthRange.MIN, { message: `User password min length: ${AuthUserPasswordLengthRange.MIN}` })
  @MaxLength(AuthUserPasswordLengthRange.MAX, { message: `User password max length: ${AuthUserPasswordLengthRange.MAX}` })
  public password: string;
}
