import { Injectable } from '@angular/core';
import { Observer, Observable, isObservable, from, of, merge } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import {
  AsyncCacheOptions,
  AsyncCacheOptionsInterface
} from './async-cache-options.provider';

export type GetPromiseFunction = () => Promise<any>;

function isPromiseLike(fn: any) {
  return fn && typeof fn.then === 'function' && typeof fn.catch === 'function';
}

function isObservableLike(fn: any) {
  return fn && isObservable(fn);
}

function anyToObservable(fn: any) {
  if (isObservableLike(fn)) {
    return fn;
  } else if (isPromiseLike(fn)) {
    return from(fn);
  } else {
    return of(fn);
  }
}

@Injectable()
export class AsyncCache {
  constructor(private defaults: AsyncCacheOptions) {}

  wrap(
    value: Observable<any> | GetPromiseFunction,
    cacheKey: string,
    userOptions: AsyncCacheOptionsInterface = {}
  ): Observable<any> {
    let getAsyncValue: Observable<any>;
    const options: AsyncCacheOptionsInterface = Object.assign(
      {},
      this.defaults,
      userOptions
    );

    if (isObservableLike(value)) {
      getAsyncValue = value as Observable<any>;
    } else if (typeof value === 'function') {
      getAsyncValue = Observable.create((observer: Observer<any>) => {
        const promise: Promise<any> = value();
        if (!isPromiseLike(promise)) {
          return observer.error(
            "The function you passed to the async cache didn't return a promise"
          );
        }
        promise
          .then(result => {
            observer.next(result);
            observer.complete();
          })
          .catch(err => {
            observer.error(err);
          });
      });
    } else {
      throw new Error(
        'Value can only be an observable or a function that returns a promise'
      );
    }

    return anyToObservable(options.driver.has(cacheKey)).pipe(
      mergeMap(existsInCache => {
        const cacheAndReturnAsyncValue = () =>
          getAsyncValue.pipe(
            mergeMap(asyncValue => {
              return anyToObservable(
                options.driver.set(cacheKey, asyncValue)
              ).pipe(map(() => asyncValue));
            })
          );

        if (existsInCache && !options.bypassCache) {
          const getCachedValue: Observable<any> = anyToObservable(
            options.driver.get(cacheKey)
          );

          if (options.fromCacheAndReplay) {
            return merge(getCachedValue, cacheAndReturnAsyncValue());
          } else {
            return getCachedValue;
          }
        } else {
          return cacheAndReturnAsyncValue();
        }
      })
    );
  }
}
