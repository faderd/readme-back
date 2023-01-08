export interface CommentInterface {
  id?: number;
  authorId: string;
  date: Date;
  postId: number;
  text: string;
}
