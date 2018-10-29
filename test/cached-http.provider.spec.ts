import { TestBed } from '@angular/core/testing';
import { expect } from 'chai';
import * as sinon from 'sinon';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest
} from '@angular/common/http/testing';
import {
  AsyncCacheModule,
  CachedHttp,
  AsyncCacheOptions,
  CacheDriver
} from '../src';
import { HttpParams, HttpRequest } from '@angular/common/http';

describe('cachedHttp', () => {
  let cachedHttp: CachedHttp;
  let httpMock: HttpTestingController;
  let cacheDriver: CacheDriver;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AsyncCacheModule.forRoot()]
    });
    cachedHttp = TestBed.get(CachedHttp);
    httpMock = TestBed.get(HttpTestingController);
    cacheDriver = TestBed.get(AsyncCacheOptions).driver;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch and cache the result from the api', done => {
    cachedHttp.get('/foo').subscribe(res => {
      expect(res).to.deep.equal({ foo: 'bar' });
      expect(cacheDriver.get('GET-/foo')).to.equal(res);
      done();
    });
    const req: TestRequest = httpMock.expectOne('/foo');
    expect(req.request.method).to.equal('GET');
    req.flush({ foo: 'bar' });
  });

  it('should use the cached result', done => {
    cacheDriver.set('GET-/foo', { foo: 'bar' });
    cachedHttp.get('/foo').subscribe(res => {
      expect(res).to.deep.equal({ foo: 'bar' });
      expect(cacheDriver.get('GET-/foo')).to.equal(res);
      done();
    });
  });

  it('should handle query parameters', done => {
    cacheDriver.set('GET-/foo?bar=bam', { foo: 'bar' });
    cachedHttp
      .get('/foo', { params: new HttpParams().set('bar', 'bam') })
      .subscribe(res => {
        expect(res).to.deep.equal({ foo: 'bar' });
        expect(cacheDriver.get('GET-/foo?bar=bam')).to.equal(res);
        done();
      });
  });

  it('should handle query parameters as an object', done => {
    cacheDriver.set('GET-/foo?bar=bam', { foo: 'bar' });
    cachedHttp.get('/foo', { params: { bar: 'bam' } }).subscribe(res => {
      expect(res).to.deep.equal({ foo: 'bar' });
      expect(cacheDriver.get('GET-/foo?bar=bam')).to.equal(res);
      done();
    });
  });

  it('should handle head requests', done => {
    cachedHttp.head('/foo').subscribe(res => {
      expect(res).to.equal('');
      expect(cacheDriver.get('HEAD-/foo')).to.equal(res);
      done();
    });
    const req: TestRequest = httpMock.expectOne(
      new HttpRequest('HEAD', '/foo')
    );
    expect(req.request.method).to.equal('HEAD');
    req.flush('');
  });

  it('should complete the observable on a cold cache', () => {
    const complete = sinon.spy();
    cachedHttp.get('/foo').subscribe({
      complete
    });
    const req = httpMock.expectOne('/foo');
    req.flush({ foo: 'bar' });
    expect(complete.callCount).to.equal(1);
  });

  it('should complete the observable on a warm cache', () => {
    cacheDriver.set('GET-/foo', { foo: 'bar' });
    const complete = sinon.spy();
    cachedHttp.get('/foo', {}, { fromCacheAndReplay: true }).subscribe({
      complete
    });
    const req = httpMock.expectOne('/foo');
    req.flush({ foo: 'bar' });
    expect(complete.callCount).to.equal(1);
  });
});
