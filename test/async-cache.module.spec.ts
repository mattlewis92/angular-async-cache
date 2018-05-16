import { TestBed } from '@angular/core/testing';
import { expect } from 'chai';
import { AsyncCacheModule, LocalStorageDriver, MemoryDriver } from '../src';
import { AsyncCacheOptions } from '../src/async-cache-options.provider';

describe('async cache module', () => {
  it('should allow the defaults to be customised', () => {
    TestBed.configureTestingModule({
      imports: [
        AsyncCacheModule.forRoot({
          provide: AsyncCacheOptions,
          useFactory: () => new AsyncCacheOptions({ fromCacheAndReplay: true })
        })
      ]
    });
    expect(TestBed.get(AsyncCacheOptions).fromCacheAndReplay).to.be.true;
  });

  it('should set the given cache in the DI', () => {
    const driver: LocalStorageDriver = new LocalStorageDriver();
    TestBed.configureTestingModule({
      imports: [
        AsyncCacheModule.forRoot({
          provide: AsyncCacheOptions,
          useFactory: () => new AsyncCacheOptions({ driver })
        })
      ]
    });
    expect(TestBed.get(AsyncCacheOptions).driver).to.equal(driver);
    expect(TestBed.get(LocalStorageDriver)).to.equal(driver);
    expect(TestBed.get(MemoryDriver)).to.be.ok;
  });
});
