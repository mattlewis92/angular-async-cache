import { NgModule, ModuleWithProviders, Provider } from '@angular/core';
import { LocalStorageDriver } from './drivers/local-storage-driver.provider';
import { MemoryDriver } from './drivers/memory-driver.provider';
import { AsyncCacheOptions } from './async-cache-options.provider';
import { AsyncCache } from './async-cache.provider';
import { AsyncCachePipe } from './async-cache.pipe';
import { CachedHttp } from './cached-http.provider';

export function memoryDriverFactory(options: AsyncCacheOptions): MemoryDriver {
  return options.driver instanceof MemoryDriver ? options.driver : new MemoryDriver();
}

export function localStorageDriverFactory(options: AsyncCacheOptions): LocalStorageDriver {
  return options.driver instanceof LocalStorageDriver ? <LocalStorageDriver> options.driver : new LocalStorageDriver();
}

export function cacheOptionFactory(): AsyncCacheOptions {
  return new AsyncCacheOptions();
}

@NgModule({
  declarations: [AsyncCachePipe],
  exports: [AsyncCachePipe]
})
export class AsyncCacheModule {

  static forRoot(cacheOptions: Provider = {
    provide: AsyncCacheOptions,
    useFactory: cacheOptionFactory
  }): ModuleWithProviders {

    return {
      ngModule: AsyncCacheModule,
      providers: [{
        provide: LocalStorageDriver,
        useFactory: localStorageDriverFactory,
        deps: [AsyncCacheOptions]
      }, {
        provide: MemoryDriver,
        useFactory: memoryDriverFactory,
        deps: [AsyncCacheOptions]
      },
        cacheOptions,
        AsyncCache,
        CachedHttp
      ]
    };

  }

}