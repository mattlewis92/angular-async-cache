import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AsyncCache } from './async-cache.provider';
import { AsyncCacheOptionsInterface } from './async-cache-options.provider';

export interface HttpRequestArgs {
  headers?: HttpHeaders;
  params?: HttpParams;
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}

@Injectable()
export class CachedHttp {
  constructor(private http: HttpClient, private asyncCache: AsyncCache) {}

  get(
    url: string,
    options?: HttpRequestArgs,
    asyncCacheOptions?: AsyncCacheOptionsInterface
  ): Observable<any> {
    const result$: Observable<any> = this.http.get(url, options);

    let cacheKey: string = url;
    if (options && options.params) {
      cacheKey += '?' + options.params.toString();
    }

    return this.asyncCache.wrap(result$, cacheKey, asyncCacheOptions);
  }
}
