import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/observable';
import { AsyncCache } from './asyncCache.provider';
import { AsyncCacheOptionsInterface } from './asyncCacheOptions.provider';

@Injectable()
export class CachedHttp {

  constructor(private http: Http, private asyncCache: AsyncCache) {}

  get(url: string, options?: RequestOptionsArgs, asyncCacheOptions?: AsyncCacheOptionsInterface): Observable<any> {

    const result$: Observable<any> = this.http.get(url, options).map(res => res.json());

    let cacheKey: string = url;
    if (options && options.search) {
      cacheKey += '?' + options.search.toString();
    }

    return this.asyncCache.wrap(result$, cacheKey, asyncCacheOptions);

  }

}