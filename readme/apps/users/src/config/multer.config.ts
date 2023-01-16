import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { join } from 'path';
import { AVATAR_UPLOAD_PATH } from '../app/auth/auth.constant';
import * as mime from 'mime-types';
import {nanoid} from 'nanoid';

export function getMulterOptions(): MulterOptions {
  return {
    storage: diskStorage({
      destination: join(__dirname, AVATAR_UPLOAD_PATH),
      filename: (__req, file, cb) => {
        const extension = mime.extension(file.mimetype) ?? '';
        const filename = nanoid();
        cb(null, `${filename}.${extension}`);
      }
    }),
  }
}
