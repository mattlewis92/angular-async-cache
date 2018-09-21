import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AsyncCache } from './async-cache.provider';
import { AsyncCacheOptionsInterface } from './async-cache-options.provider';

export interface HttpRequestArgs {
  headers?: HttpHeaders;
  params?:
    | HttpParams
    | {
        [param: string]: string | string[];
      };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}

@Injectable()
export class CachedHttp {
  constructor(private http: HttpClient, private asyncCache: AsyncCache) {}

  get<T = any>(
    url: string,
    options?: HttpRequestArgs,
    asyncCacheOptions?: AsyncCacheOptionsInterface
  ): Observable<T> {
    const result$: Observable<T> = this.http.get<T>(url, options);

    let cacheKey: string = url;
    if (options && options.params) {
      let qs = options.params.toString();
      if (
        typeof options.params === 'object' &&
        !(options.params instanceof HttpParams)
      ) {
        qs = new HttpParams({
          fromObject: options.params
        }).toString();
      }
      cacheKey += '?' + qs;
    }

    return this.asyncCache.wrap(result$, cacheKey, asyncCacheOptions);
  }
}
