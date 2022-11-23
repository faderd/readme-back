import { CommentInterface } from "@readme/shared-types";

export class CommentEntity implements CommentInterface {
  public _id?: string;
  public authorId: string;
  public date: Date;
  public postId: string;
  public text: string;

  constructor(comment: CommentInterface) {
    this.fillEntity(comment);
  }

  public toObject() {
    return { ...this };
  }

  public fillEntity(comment: CommentInterface) {
    this._id = comment._id;
    this.authorId = comment.authorId;
    this.date = comment.date;
    this.postId = comment.postId;
    this.text = comment.text;
  }
}
