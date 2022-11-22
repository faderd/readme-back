import { Module } from '@nestjs/common';
import { PostController } from './post/post.controller';
import { PostModule } from './post/post.module';
import { PostService } from './post/post.service';

@Module({
  imports: [PostModule],
  controllers: [PostController],
  providers: [PostService],
})
export class AppModule {}
