import { TestBed } from '@angular/core/testing';
import { expect } from 'chai';
import { ResponseOptions, Response, BaseRequestOptions, Http, URLSearchParams } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { AsyncCacheModule, CachedHttp, AsyncCacheOptions, CacheDriver } from '../src';

describe('cachedHttp', () => {

  let cachedHttp: CachedHttp, mockBackend: MockBackend, cacheDriver: CacheDriver;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AsyncCacheModule.forRoot()],
      providers: [
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }
        }
      ]
    });
    cachedHttp = TestBed.get(CachedHttp);
    mockBackend = TestBed.get(MockBackend);
    cacheDriver = TestBed.get(AsyncCacheOptions).driver;
  });

  afterEach(() => {
    mockBackend.verifyNoPendingRequests();
  });

  it('should fetch and cache the result from the api', (done) => {
    const body: string = JSON.stringify({foo: 'bar'});
    const responseOptions: ResponseOptions = new ResponseOptions({body});
    mockBackend.connections.subscribe((connection: MockConnection) => {
      return connection.mockRespond(new Response(responseOptions));
    });
    cachedHttp.get('/foo').subscribe(res => {
      expect(res).to.deep.equal({foo: 'bar'});
      expect(cacheDriver.get('/foo')).to.equal(res);
      done();
    });
  });

  it('should use the cached result', (done) => {
    cacheDriver.set('/foo', {foo: 'bar'});
    cachedHttp.get('/foo').subscribe(res => {
      expect(res).to.deep.equal({foo: 'bar'});
      expect(cacheDriver.get('/foo')).to.equal(res);
      done();
    });
  });

  it('should handle query parameters', (done) => {
    cacheDriver.set('/foo?bar=bam', {foo: 'bar'});
    const search: URLSearchParams = new URLSearchParams();
    search.set('bar', 'bam');
    cachedHttp.get('/foo', {search}).subscribe(res => {
      expect(res).to.deep.equal({foo: 'bar'});
      expect(cacheDriver.get('/foo?bar=bam')).to.equal(res);
      done();
    });
  });

});