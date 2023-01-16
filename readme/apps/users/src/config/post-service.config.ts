import { registerAs } from '@nestjs/config';

export default registerAs('post', () => ({
  url: process.env.POST_SERVICE_URL,
}));
