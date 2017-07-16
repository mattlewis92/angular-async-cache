import { CacheDriver, AsyncValue } from './cache-driver.interface';

export interface LocalStorageOptions {
  keyPrefix: string;
}

const DEFAULT_KEY_PREFIX: string = 'async-cache-';

export class LocalStorageDriver implements CacheDriver {

  constructor(private options: LocalStorageOptions = {keyPrefix: DEFAULT_KEY_PREFIX}) {}

  has(key: string): AsyncValue {
    return localStorage.hasOwnProperty(this.getInternalKey(key));
  }

  get(key: string): AsyncValue {
    return JSON.parse(localStorage.getItem(this.getInternalKey(key)));
  }

  set(key: string, value: any): AsyncValue {
    return localStorage.setItem(this.getInternalKey(key), JSON.stringify(value));
  }

  delete(key: string): AsyncValue {
    return localStorage.removeItem(this.getInternalKey(key));
  }

  clear(): AsyncValue {
    for (const key of this.keys()) {
      this.delete(key);
    }
    return;
  }

  keys(): AsyncValue {
    const keys: string[] = [];
    for (let i: number = 0; i < localStorage.length; i++) {
      keys.push(localStorage.key(i));
    }
    return keys.filter(key => key.startsWith(this.options.keyPrefix)).map(key => this.getExternalKey(key));
  }

  private getInternalKey(suffix: string): string {
    return `${this.options.keyPrefix}${suffix}`;
  }

  private getExternalKey(key: string): string {
    return key.replace(new RegExp('^' + this.options.keyPrefix), '');
  }

}