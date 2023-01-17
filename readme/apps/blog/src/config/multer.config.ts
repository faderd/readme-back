import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { join } from 'path';
import * as mime from 'mime-types';
import {nanoid} from 'nanoid';
import { PHOTO_UPLOAD_PATH } from '../app/post/post.constant';

export function getMulterOptions(): MulterOptions {
  return {
    storage: diskStorage({
      destination: join(__dirname, PHOTO_UPLOAD_PATH),
      filename: (__req, file, cb) => {
        const extension = mime.extension(file.mimetype) ?? '';
        const filename = nanoid();
        cb(null, `${filename}.${extension}`);
      }
    }),
  }
}
