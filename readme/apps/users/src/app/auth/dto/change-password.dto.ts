import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { AuthUserPasswordLengthRange } from '../auth.constant';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'User current password',
    example: 'qwerty',
  })
  @IsString()
  @MinLength(AuthUserPasswordLengthRange.MIN, { message: `User password min length: ${AuthUserPasswordLengthRange.MIN}` })
  @MaxLength(AuthUserPasswordLengthRange.MAX, { message: `User password max length: ${AuthUserPasswordLengthRange.MAX}` })
  public currentPassword: string;

  @ApiProperty({
    description: 'User new password',
    example: 'qwerty1',
  })
  @IsString()
  @MinLength(AuthUserPasswordLengthRange.MIN, { message: `User password min length: ${AuthUserPasswordLengthRange.MIN}` })
  @MaxLength(AuthUserPasswordLengthRange.MAX, { message: `User password max length: ${AuthUserPasswordLengthRange.MAX}` })
  public newPassword: string;
}
