import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AsyncCache } from './async-cache.provider';
import { AsyncCacheOptionsInterface } from './async-cache-options.provider';

@Pipe({
  name: 'asyncCache'
})
export class AsyncCachePipe implements PipeTransform {

  constructor(private asyncCache: AsyncCache) {}

  transform(value: Observable<any>, cacheKey: string, options?: AsyncCacheOptionsInterface): Observable<any> {
    return this.asyncCache.wrap(value, cacheKey, options);
  }

}