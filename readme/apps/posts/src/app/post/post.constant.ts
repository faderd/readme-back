import { PostState } from '@readme/shared-types';

export const DEFAULT_POST_STATE = PostState.Draft;
export const POST_NOT_FOUND = 'Post not found.';
export const DEFAULT_POST_COUNT_LIMIT = 25;
export const DEFAULT_SORT_DIRECTION = 'desc';
export const RABBITMQ_SERVICE_NAME = 'RABBITMQ_SERVICE';

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
