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

function getCacheKey(
  method: string,
  url: string,
  options?: HttpRequestArgs
): string {
  let cacheKey = `${method}-${url}`;
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
  return cacheKey;
}

@Injectable()
export class CachedHttp {
  constructor(private http: HttpClient, private asyncCache: AsyncCache) {}

  get<T = any>(
    url: string,
    options?: HttpRequestArgs,
    asyncCacheOptions?: AsyncCacheOptionsInterface
  ): Observable<T> {
    return this.asyncCache.wrap(
      this.http.get<T>(url, options),
      getCacheKey('GET', url, options),
      asyncCacheOptions
    );
  }

  head<T = any>(
    url: string,
    options?: HttpRequestArgs,
    asyncCacheOptions?: AsyncCacheOptionsInterface
  ): Observable<T> {
    return this.asyncCache.wrap(
      this.http.head<T>(url, options),
      getCacheKey('HEAD', url, options),
      asyncCacheOptions
    );
  }
}
