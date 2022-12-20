import { PostState } from './post-state.enum';
import { PostType } from './post-type.enum';

export interface PostInterface {
  id?: number;
  authorId: string;
  datePublication?: Date;
  dateCreation?: Date;
  state: PostState;
  isRepost: boolean;
  type: PostType;
  tags?: string[];
  title?: string;
  urlVideo?: string;
  announcement?: string;
  postText?: string;
  quoteText?: string;
  quoteAuthor?: string;
  photo?: string;
  link?: string;
  description?: string;
}
