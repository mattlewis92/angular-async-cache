import { TestBed } from '@angular/core/testing';
import { expect } from 'chai';
import { MemoryDriver, AsyncCacheModule } from '../src';

describe('memoryDriver', () => {
  let driver: MemoryDriver;
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [AsyncCacheModule.forRoot()] });
    driver = TestBed.get(MemoryDriver);
  });

  it('should get, set and delete a value', () => {
    expect(driver.has('foo')).to.equal(false);
    driver.set('foo', 'bar');
    expect(driver.has('foo')).to.equal(true);
    expect(driver.get('foo')).to.equal('bar');
    driver.delete('foo');
    expect(driver.has('foo')).to.equal(false);
  });

  it('should get all keys and then clear all values', () => {
    driver.set('foo', 'bar');
    driver.set('bam', 'baz');
    expect(driver.keys()).to.deep.equal(['foo', 'bam']);
    driver.clear();
    expect(driver.keys()).to.deep.equal([]);
  });
});
