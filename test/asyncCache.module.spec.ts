import { TestBed } from '@angular/core/testing';
import { expect } from 'chai';
import { AsyncCacheModule, LocalStorageDriver } from '../src';
import { AsyncCacheOptions } from './../src/asyncCacheOptions.provider';

describe('async cache module', () => {

  it('should allow the defaults to be customised', () => {
    TestBed.configureTestingModule({imports: [AsyncCacheModule.forRoot({fromCacheAndReplay: true})]});
    expect(TestBed.get(AsyncCacheOptions).fromCacheAndReplay).to.be.true;
  });

  it('should set the given cache in the DI', () => {
    const driver: LocalStorageDriver = new LocalStorageDriver();
    TestBed.configureTestingModule({imports: [AsyncCacheModule.forRoot({driver})]});
    expect(TestBed.get(AsyncCacheOptions).driver).to.equal(driver);
  });

});