import { PostInterface, PostState, PostType } from '@readme/shared-types';

export class PostEntity implements PostInterface {
  public _id?: string;
  public authorId: string;
  public datePublication: Date;
  public state: PostState;
  public isRepost: boolean;
  public type: PostType;
  public tags?: string[];
  public title: string;
  public urlVideo: string;
  public announcement: string;
  public postText: string;
  public quoteText: string;
  public quoteAuthor: string;
  public photo: string;
  public link: string;
  public description?: string;

  constructor(post: PostInterface) {
    this.fillEntity(post);
  }

  public toObject() {
    return { ...this };
  }

  public fillEntity(post: PostInterface) {
    this._id = post._id;
    this.authorId = post.authorId;
    this.datePublication = post.datePublication;
    this.state = post.state;
    this.isRepost = post.isRepost;
    this.type = post.type;
    this.tags = post.tags;
    this.title = post.title;
    this.urlVideo = post.urlVideo;
    this.announcement = post.announcement;
    this.postText = post.postText;
    this.quoteText = post.quoteText;
    this.quoteAuthor = post.quoteAuthor;
    this.photo = post.photo;
    this.link = post.link;
    this.description = post.description;
  }
}
