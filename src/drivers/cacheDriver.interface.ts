import { Observable } from 'rxjs/Observable';

export type AsyncValue = Observable<any> | Promise<any> | any;

export interface CacheDriver {

  has(key: string): AsyncValue;

  get(key: string): AsyncValue;

  set(key: string, value: any): AsyncValue;

  delete(key: string): AsyncValue;

  clear(): AsyncValue;

  keys(): AsyncValue;

}