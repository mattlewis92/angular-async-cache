import { TestBed } from '@angular/core/testing';
import { expect } from 'chai';
import { LocalStorageDriver, AsyncCacheModule } from '../src';

describe('localStorageDriver', () => {
  let driver: LocalStorageDriver;
  beforeEach(() => {
    localStorage.removeItem('async-cache-foo');
    localStorage.removeItem('custom-foo');
    TestBed.configureTestingModule({ imports: [AsyncCacheModule.forRoot()] });
    driver = TestBed.get(LocalStorageDriver);
  });

  it('should not have a value', () => {
    expect(driver.has('foo')).to.equal(false);
  });

  it('should have a value', () => {
    localStorage.setItem('async-cache-foo', '"bar"');
    expect(driver.has('foo')).to.equal(true);
  });

  it('should get an item', () => {
    localStorage.setItem('async-cache-foo', '"bar"');
    expect(driver.get('foo')).to.equal('bar');
  });

  it('should set an item', () => {
    driver.set('foo', 'bar');
    expect(localStorage.getItem('async-cache-foo')).to.equal('"bar"');
  });

  it('should delete an item', () => {
    localStorage.setItem('async-cache-foo', '"bar"');
    driver.delete('foo');
    expect(localStorage.getItem('async-cache-foo')).to.equal(null);
  });

  it('should get all cache keys', () => {
    localStorage.setItem('async-cache-foo', '"bar"');
    expect(driver.keys()).to.deep.equal(['foo']);
  });

  it('should clear all items in the cache', () => {
    localStorage.setItem('async-cache-foo', '"bar"');
    driver.clear();
    expect(localStorage.getItem('async-cache-foo')).to.equal(null);
  });

  it('should be able to save and restore objects', () => {
    driver.set('foo', { bar: true });
    expect(driver.get('foo')).to.deep.equal({ bar: true });
  });

  it('should allow the cache prefix to be customised', () => {
    driver = new LocalStorageDriver({ keyPrefix: 'custom-' });
    driver.set('foo', 'bar');
    expect(localStorage.getItem('custom-foo')).to.deep.equal('"bar"');
  });
});
