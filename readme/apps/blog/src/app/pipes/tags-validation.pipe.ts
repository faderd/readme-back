import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { PostInterface } from '@readme/shared-types';
import { TagLengthRange, TAGS_MAX_COUNT, TAGS_NOT_VALID } from '../post/post.constant';

@Injectable()
export class TagsValidationPipe implements PipeTransform {
  transform(value: PostInterface, { type }: ArgumentMetadata) {
    if (type !== 'body') {
      throw new BadRequestException('This pipe must used only with body!');
    }

    if (!value.tags) {
      return value;
    }

    const tagsInString = value.tags.join(' ').toLowerCase();
    const uniqueTagsInArray = [...new Set(tagsInString.split(' '))];

    if (uniqueTagsInArray.length > TAGS_MAX_COUNT) {
      throw new BadRequestException(`Tags count max: ${TAGS_MAX_COUNT}`);
    }

    uniqueTagsInArray.forEach((tag) => {
      if (/[a-zа-я]/i.test(tag[0]) === false) {
        throw new BadRequestException(TAGS_NOT_VALID);
      }

      if (tag.length < TagLengthRange.MIN || tag.length > TagLengthRange.MAX) {
        throw new BadRequestException(`Tag length min: ${TagLengthRange.MIN} chars, max: ${TagLengthRange.MAX}`);
      }
    });

    value.tags = Array.from(uniqueTagsInArray);

    return value;
  }
}
