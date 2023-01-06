import { IsEmail, IsNotEmpty } from 'class-validator';
import { NOTIFY_EMAIL_NOT_VALID, NOTIFY_FIRSTNAME_IS_EMPTY, NOTIFY_LASTNAME_IS_EMPTY, NOTIFY_USER_ID_IS_EMPTY } from '../../app.constant';

export class CreateSubscriberDto {
  @IsNotEmpty({ message: NOTIFY_USER_ID_IS_EMPTY })
  public userId: string;

  @IsEmail({}, { message: NOTIFY_EMAIL_NOT_VALID })
  public email: string;

  @IsNotEmpty({ message: NOTIFY_FIRSTNAME_IS_EMPTY })
  public firstname: string;

  @IsNotEmpty({ message: NOTIFY_LASTNAME_IS_EMPTY })
  lastname: string;
}
