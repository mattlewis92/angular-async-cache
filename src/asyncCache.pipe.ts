import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AsyncCache } from './asyncCache.provider';
import { AsyncCacheOptionsInterface } from './asyncCacheOptions.provider';

@Pipe({
  name: 'asyncCache'
})
export class AsyncCachePipe implements PipeTransform {

  constructor(private asyncCache: AsyncCache) {}

  transform(value: Observable<any>, cacheKey: string, options?: AsyncCacheOptionsInterface): Observable<any> {
    return this.asyncCache.proxy(cacheKey, value, options);
  }

}