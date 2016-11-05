import { NgModule, ModuleWithProviders } from '@angular/core';
import { LocalStorageDriver } from './drivers/localStorageDriver.provider';
import { MemoryDriver } from './drivers/memoryDriver.provider';
import { AsyncCacheOptions, AsyncCacheOptionsInterface } from './asyncCacheOptions.provider';
import { AsyncCache } from './asyncCache.provider';
import { AsyncCachePipe } from './asyncCache.pipe';

@NgModule({
  declarations: [AsyncCachePipe],
  exports: [AsyncCachePipe]
})
export class AsyncCacheModule {

  static forRoot(userDefaults?: AsyncCacheOptionsInterface): ModuleWithProviders {

    const defaults: AsyncCacheOptions = new AsyncCacheOptions(userDefaults);
    const localStorage: any = defaults.driver instanceof LocalStorageDriver ? defaults.driver : new LocalStorageDriver();
    const memory: any = defaults.driver instanceof MemoryDriver ? defaults.driver : new MemoryDriver();

    return {
      ngModule: AsyncCacheModule,
      providers: [{
        provide: LocalStorageDriver, useValue: localStorage
      }, {
        provide: MemoryDriver, useValue: memory
      }, {
        provide: AsyncCacheOptions, useValue: defaults
      }, AsyncCache]
    };

  }

}