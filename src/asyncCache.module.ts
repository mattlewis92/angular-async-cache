import { NgModule, ModuleWithProviders, OpaqueToken } from '@angular/core';
import { LocalStorageDriver } from './drivers/localStorageDriver.provider';
import { MemoryDriver } from './drivers/memoryDriver.provider';
import { AsyncCacheOptions, AsyncCacheOptionsInterface } from './asyncCacheOptions.provider';
import { AsyncCache } from './asyncCache.provider';
import { AsyncCachePipe } from './asyncCache.pipe';

export const ASYNC_CACHE_USER_DEFAULTS: OpaqueToken = new OpaqueToken('ASYNC_CACHE_USER_DEFAULTS');

export function memoryDriverFactory(options: AsyncCacheOptions): MemoryDriver {
  return options.driver instanceof MemoryDriver ? options.driver : new MemoryDriver();
};

export function localStorageDriverFactory(options: AsyncCacheOptions): LocalStorageDriver {
  return options.driver instanceof LocalStorageDriver ? <LocalStorageDriver> options.driver : new LocalStorageDriver();
};

export function cacheOptionDefaultsFactory(userDefaults: AsyncCacheOptionsInterface): AsyncCacheOptions {
  return new AsyncCacheOptions(userDefaults);
};

@NgModule({
  declarations: [AsyncCachePipe],
  exports: [AsyncCachePipe]
})
export class AsyncCacheModule {

  static forRoot(userDefaults?: AsyncCacheOptionsInterface): ModuleWithProviders {

    return {
      ngModule: AsyncCacheModule,
      providers: [{
        provide: LocalStorageDriver, useFactory: localStorageDriverFactory, deps: [AsyncCacheOptions]
      }, {
        provide: MemoryDriver, useFactory: memoryDriverFactory, deps: [AsyncCacheOptions]
      }, {
        provide: ASYNC_CACHE_USER_DEFAULTS, useValue: userDefaults
      }, {
        provide: AsyncCacheOptions, useFactory: cacheOptionDefaultsFactory, deps: [ASYNC_CACHE_USER_DEFAULTS]
      }, AsyncCache]
    };

  }

}