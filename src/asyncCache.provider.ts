import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import symbolObservable from 'symbol-observable';
import { AsyncCacheOptions, AsyncCacheOptionsInterface } from './asyncCacheOptions.provider';

export type GetPromiseFunction = () => Promise<any>;

const isPromise: Function = (fn: any) => fn && typeof fn.then === 'function' && typeof fn.catch === 'function';

const isObservable: Function = (fn: any) => fn && fn[symbolObservable];

const anyToObservable: Function = (fn: any) => {

  if (isObservable(fn)) {
    return fn;
  } else if (isPromise(fn)) {
    return Observable.fromPromise(fn);
  } else {
    return Observable.of(fn);
  }

};

@Injectable()
export class AsyncCache {

  constructor(private defaults: AsyncCacheOptions) {}

  wrap(value: Observable<any> | GetPromiseFunction, cacheKey: string, userOptions: AsyncCacheOptionsInterface = {}): Observable<any> {

    let getAsyncValue: Observable<any>;
    const options: AsyncCacheOptionsInterface = Object.assign({}, this.defaults, userOptions);

    if (isObservable(value)) {
      getAsyncValue = <Observable<any>> value;
    } else if (typeof value === 'function') {
      getAsyncValue = Observable.create((observer: Observer<any>) => {
        const promise: Promise<any> = value();
        if (!isPromise(promise)) {
          return observer.error('The function you passed to the async cache didn\'t return a promise');
        }
        promise.then(result => {
          observer.next(result);
          observer.complete();
        }).catch(err => {
          observer.error(err);
        });
      });
    } else {
      throw new Error('Value can only be an observable or a function that returns a promise');
    }

    return anyToObservable(options.driver.has(cacheKey)).flatMap(existsInCache => {

      const cacheAndReturnAsyncValue: Function = () => getAsyncValue.flatMap(value => {
        return anyToObservable(options.driver.set(cacheKey, value)).map(() => value);
      });

      if (existsInCache && !options.bypassCache) {

        const getCachedValue: Observable<any> = anyToObservable(options.driver.get(cacheKey));

        if (options.fromCacheAndReplay) {
          return Observable.merge(getCachedValue, cacheAndReturnAsyncValue());
        } else {
          return getCachedValue;
        }

      } else {
        return cacheAndReturnAsyncValue();
      }

    });

  }

}