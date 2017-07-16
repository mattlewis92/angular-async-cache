import { CacheDriver } from './drivers/cache-driver.interface';
import { MemoryDriver } from './drivers/memory-driver.provider';

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