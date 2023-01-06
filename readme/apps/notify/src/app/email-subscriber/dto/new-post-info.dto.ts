import { IsNotEmpty } from 'class-validator';
import { NOTIFY_ID_IS_EMPTY } from '../../app.constant';

export class NewPostInfoDto {
  @IsNotEmpty({ message: NOTIFY_ID_IS_EMPTY })
  public newPostId: string;
}
