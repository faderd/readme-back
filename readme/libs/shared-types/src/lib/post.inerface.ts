import { PostState } from './post-state.enum';
import { PostType } from './post-type.enum';

export interface PostInterface {
  id?: number;
  authorId: string;
  datePublication?: Date;
  dateCreation?: Date;
  state: PostState;
  isRepost: boolean,
  originalAuthorId?: string,
  originalPostId?: number,
  type: PostType;
  title?: string;
  urlVideo?: string;
  announcement?: string;
  postText?: string;
  quoteText?: string;
  quoteAuthor?: string;
  photo?: string;
  link?: string;
  description?: string;
  tags?: string[];
}
