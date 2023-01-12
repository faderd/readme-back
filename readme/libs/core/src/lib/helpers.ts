import { plainToInstance, ClassConstructor } from 'class-transformer';
import { CommandEvent } from '@readme/shared-types';

export function fillObject<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, { excludeExtraneousValues: true });
}

export function getMongoConnectionString({ username, password, host, port, databaseName, authDatabase }): string {
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
}

export function createEvent(commandEvent: CommandEvent) {
  return { cmd: commandEvent }
}

export function getOrderByField<T, N>(sortType: T, sortDirection: N) {
  if (sortType === 'datePublication') {
    return {
      [sortType as string]: sortDirection,
    }
  }

  if (sortType === 'comments') {
    return {
      [sortType as string]: {
        _count: sortDirection,
      }
    }
  }

  if (sortType === 'likeUserIds') {
    return {
      [sortType as string]: sortDirection,
    }
  }
}
