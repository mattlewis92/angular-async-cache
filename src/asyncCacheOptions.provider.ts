import { CacheDriver } from './drivers/cacheDriver.interface';
import { MemoryDriver } from './drivers/memoryDriver.provider';

export interface AsyncCacheOptionsInterface {

  driver?: CacheDriver;

  fromCacheAndReplay?: boolean;

  bypassCache?: boolean;

}

export class AsyncCacheOptions implements AsyncCacheOptionsInterface {

  driver: CacheDriver = new MemoryDriver();

  fromCacheAndReplay: boolean = false;

  constructor(overrides: AsyncCacheOptionsInterface = {}) {
    Object.assign(this, overrides);
  }

}