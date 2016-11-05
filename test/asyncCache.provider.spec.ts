import { TestBed, async } from '@angular/core/testing';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/observable/throw';
import { AsyncCacheModule, MemoryDriver, AsyncCache, CacheDriver, AsyncValue } from '../src';

describe('async cache', () => {

  describe('memory cache', () => {

    let cacheDriver: MemoryDriver, cache: AsyncCache;
    beforeEach(() => {
      TestBed.configureTestingModule({imports: [AsyncCacheModule.forRoot()]});
      cacheDriver = TestBed.get(MemoryDriver);
      cache = TestBed.get(AsyncCache);
    });

    describe('cached observable', () => {

      it('should return the observables value and cache it for future requests', () => {
        cache.proxy('foo', Observable.of('bar')).subscribe(value => {
          expect(value).to.equal('bar');
          expect(cacheDriver.get('foo')).to.equal('bar');
        });
      });

      it('should use the cached observable value', () => {
        cacheDriver.set('foo', 'bam');
        cache.proxy('foo', Observable.of('bar')).subscribe(value => {
          expect(value).to.equal('bam');
        });
      });

      it('should not cache the result if the observable resulted in an error', () => {
        cache.proxy('foo', Observable.throw('error')).subscribe(() => '', err => {
          expect(err).to.equal('error');
          expect(cacheDriver.has('foo')).to.be.false;
        });
      });

      it('should return the cached result and then the live value', () => {
        cacheDriver.set('foo', 'bam');
        cache.proxy('foo', Observable.of('bar'), {fromCacheAndReplay: true}).pairwise().subscribe(values => {
          expect(values).to.deep.equal(['bam', 'bar']);
        });
      });

    });

    describe('cached promise', () => {

      it('should return the promises value and cache it for future requests', async(() => {
        cache.proxy('foo', () => Promise.resolve('bar')).subscribe(value => {
          expect(value).to.equal('bar');
          expect(cacheDriver.get('foo')).to.equal('bar');
        });
      }));

      it('should use the cached promise value', async(() => {
        cacheDriver.set('foo', 'bam');
        cache.proxy('foo', () => Promise.resolve('bar')).subscribe(value => {
          expect(value).to.equal('bam');
        });
      }));

      it('should not cache the result if the promise resulted in an error', async(() => {
        cache.proxy('foo', () => Promise.reject('error')).subscribe(() => '', err => {
          expect(err).to.equal('error');
          expect(cacheDriver.has('foo')).to.be.false;
        });
      }));

      it('should return the cached result and then the live value', async(() => {
        cacheDriver.set('foo', 'bam');
        cache.proxy('foo', () => Promise.resolve('bar'), {fromCacheAndReplay: true}).pairwise().subscribe(values => {
          expect(values).to.deep.equal(['bam', 'bar']);
        });
      }));

      it('should not try and resolve the promise value if its in the cache', async(() => {
        cacheDriver.set('foo', 'bam');
        const spy: sinon.SinonStub = sinon.stub().returns(Promise.resolve('bar'));
        cache.proxy('foo', spy).subscribe(value => {
          expect(spy).not.to.have.been.called;
        });
      }));

    });

    it('should throw an error when trying to cache a non observable or promise value', () => {
      expect(() => cache.proxy('foo', <any> 'bar')).to.throw();
    });

  });

  describe('promise based custom cache driver', () => {

    class CustomCacheDriver implements CacheDriver {

      has(key: string): AsyncValue {
        return Promise.resolve(true);
      }

      get(key: string): AsyncValue {
        return Promise.resolve('bar');
      }

      set(key: string, value: any): AsyncValue {
        return Promise.resolve();
      }

      delete(key: string): AsyncValue {
        return undefined;
      }

      clear(): AsyncValue {
        return undefined;
      }

      keys(): AsyncValue {
        return undefined;
      }

    }

    let cacheDriver: CustomCacheDriver, cache: AsyncCache;
    beforeEach(() => {
      cacheDriver = new CustomCacheDriver();
      TestBed.configureTestingModule({
        imports: [
          AsyncCacheModule.forRoot({
            driver: cacheDriver
          })
        ]
      });
      cache = TestBed.get(AsyncCache);
    });

    it('should get the cached observable value', async(() => {
      cache.proxy('foo', Observable.of('bam')).subscribe(value => {
        expect(value).to.equal('bar');
      });
    }));

  });

  describe('observable based custom cache driver', () => {

    class CustomCacheDriver implements CacheDriver {

      has(key: string): AsyncValue {
        return Observable.of(true);
      }

      get(key: string): AsyncValue {
        return Observable.of('bar');
      }

      set(key: string, value: any): AsyncValue {
        return Observable.of();
      }

      delete(key: string): AsyncValue {
        return undefined;
      }

      clear(): AsyncValue {
        return undefined;
      }

      keys(): AsyncValue {
        return undefined;
      }

    }

    let cacheDriver: CustomCacheDriver, cache: AsyncCache;
    beforeEach(() => {
      cacheDriver = new CustomCacheDriver();
      TestBed.configureTestingModule({
        imports: [
          AsyncCacheModule.forRoot({
            driver: cacheDriver
          })
        ]
      });
      cache = TestBed.get(AsyncCache);
    });

    it('should get the cached observable value', async(() => {
      cache.proxy('foo', Observable.of('bam')).subscribe(value => {
        expect(value).to.equal('bar');
      });
    }));

  });

});
