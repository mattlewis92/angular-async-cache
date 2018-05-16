import { CacheDriver, AsyncValue } from './cache-driver.interface';

const cacheKey: any = Symbol('cache key');

export class MemoryDriver implements CacheDriver {
  constructor() {
    this[cacheKey] = new Map<string, any>();
  }

  has(key: string): AsyncValue {
    return this[cacheKey].has(key);
  }

  get(key: string): AsyncValue {
    return this[cacheKey].get(key);
  }

  set(key: string, value: any): AsyncValue {
    return this[cacheKey].set(key, value);
  }

  delete(key: string): AsyncValue {
    return this[cacheKey].delete(key);
  }

  clear(): AsyncValue {
    return this[cacheKey].clear();
  }

  keys(): AsyncValue {
    return Array.from(this[cacheKey].keys());
  }
}
