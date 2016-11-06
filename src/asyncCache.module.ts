import { NgModule, ModuleWithProviders, Provider } from '@angular/core';
import { HttpModule } from '@angular/http';
import { LocalStorageDriver } from './drivers/localStorageDriver.provider';
import { MemoryDriver } from './drivers/memoryDriver.provider';
import { AsyncCacheOptions } from './asyncCacheOptions.provider';
import { AsyncCache } from './asyncCache.provider';
import { AsyncCachePipe } from './asyncCache.pipe';
import { CachedHttp } from './cachedHttp.provider';

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
  imports: [HttpModule],
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