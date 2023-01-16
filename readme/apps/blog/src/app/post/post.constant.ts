import { PostState } from '@readme/shared-types';

export const DEFAULT_POST_STATE = PostState.Published;
export const POST_NOT_FOUND = 'Post not found.';
export const DEFAULT_POST_COUNT_LIMIT = 25;
export const DEFAULT_SORT_DIRECTION = 'desc';
export const RABBITMQ_SERVICE_NAME = 'RABBITMQ_SERVICE';
export const ERROR_ACTIONS_OWN_POST = 'Can\'t delete or edit post that is not your own';
export const ERROR_REPOST_EXIST = 'Repost this post is already exist';

// Ограничения для валидации
export const PostTitleLengthRange = {
  MIN: 20,
  MAX: 50,
}
export const PostAnnouncementLengthRange = {
  MIN: 50,
  MAX: 255,
}
export const PostTextLengthRange = {
  MIN: 100,
  MAX: 1024,
}
export const PostQuoteLengthRange = {
  MIN: 20,
  MAX: 300,
}
export const PostQuoteAuthorLengthRange = {
  MIN: 3,
  MAX: 50,
}
export const PostDescriptionMaxLength = 300;

export enum SortType {
  Default = 'datePublication',
  Like = 'likeUserIds',
  Comment = 'comments'
}

export const TAGS_NOT_VALID = 'Tags list not valid';
export const TAGS_MAX_COUNT = 8;
export const TagLengthRange = {
  MIN: 3,
  MAX: 10,
};
