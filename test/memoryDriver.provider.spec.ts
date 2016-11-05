import { expect } from 'chai';
import { MemoryDriver } from '../src';

describe('memoryDriver', () => {

  let driver: MemoryDriver;
  beforeEach(() => {
    driver = new MemoryDriver();
  });

  it('should get, set and delete a value', () => {
    expect(driver.has('foo')).to.be.false;
    driver.set('foo', 'bar');
    expect(driver.has('foo')).to.be.true;
    expect(driver.get('foo')).to.equal('bar');
    driver.delete('foo');
    expect(driver.has('foo')).to.be.false;
  });

  it('should get all keys and then clear all values', () => {
    driver.set('foo', 'bar');
    driver.set('bam', 'baz');
    expect(driver.keys()).to.deep.equal(['foo', 'bam']);
    driver.clear();
    expect(driver.keys()).to.deep.equal([]);
  });

});
