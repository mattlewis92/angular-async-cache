# angular async cache
[![Build Status](https://travis-ci.org/mattlewis92/angular-async-cache.svg?branch=master)](https://travis-ci.org/mattlewis92/angular-async-cache)
[![npm version](https://badge.fury.io/js/angular-async-cache.svg)](http://badge.fury.io/js/angular-async-cache)
[![devDependency Status](https://david-dm.org/mattlewis92/angular-async-cache/dev-status.svg)](https://david-dm.org/mattlewis92/angular-async-cache#info=devDependencies)
[![GitHub issues](https://img.shields.io/github/issues/mattlewis92/angular-async-cache.svg)](https://github.com/mattlewis92/angular-async-cache/issues)
[![GitHub stars](https://img.shields.io/github/stars/mattlewis92/angular-async-cache.svg)](https://github.com/mattlewis92/angular-async-cache/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/mattlewis92/angular-async-cache/master/LICENSE)

## Table of contents

- [About](#about)
- [Installation](#installation)
- [Documentation](#documentation)
- [Development](#development)
- [License](#licence)

## About

A simple utility to help with caching of promises and observables to enable an easy offline first approach in angular 2.0+ apps

## Demo
There is a [demo app here](http://mattlewis92.github.io/angular2-tv-tracker/) that shows the power of this library. Subscribe to some TV shows, turn off your internet and refresh the page and everything should still work (static assets are handled by the fantastic [webpack offline plugin](https://github.com/NekR/offline-plugin))

## Installation

Install through npm:
```
npm install --save angular-async-cache
```

### Examples

> This setup will first emit the cached data (for faster load times + offline first support), then will find the live data, re-emit it and update the cache for future requests

```typescript
import { NgModule, Component, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AsyncCache, LocalStorageDriver, MemoryDriver, AsyncCacheModule, AsyncCacheOptions, CachedHttp } from 'angular-async-cache';

export function asyncCacheOptionsFactory(): AsyncCacheOptions {
  return new AsyncCacheOptions({

    // Default cache driver to use. Default in memory. 
    // You can also roll your own by implementing the CacheDriver interface
    driver: new LocalStorageDriver(),

    // this is the special sauce - first emit the data from localstorage, 
    // then re-fetch the live data from the API and emit a second time. 
    // The async pipe will then re-render and update the UI. Default: false
    fromCacheAndReplay: true

  });
}

// declare in your module
@NgModule({
  imports: [
    // this configures the default options. Just using `AsyncCacheModule.forRoot()` will use 
    // the defaults of an in memory cache and not replaying from the api
    AsyncCacheModule.forRoot({
      provide: AsyncCacheOptions,
      useFactory: asyncCacheOptionsFactory
    })
  ]
})
class MyModule {}

// finally use with the async pipe in your components template
@Component({
  template: `
    <div *ngFor="let car of cars | async">
      {{ car.model }}
    </div>
  `
})
class MyComponent {

  cars: Observable<Car[]>;

  constructor(private cachedHttp: CachedHttp) {
    // note how we don't do `.map(res => res.json())` as this is already handled by the cachedHttp service 
    // only the get method is supported (as other http verbs are destructive)
    // The second argument can be any options you would pass to a normal http get call
    // The third argument is a `AsyncCacheOptions` subset
    this.cars = this.cachedHttp.get('/cars');
  }

}
```

> There is also a lower level `AsyncCache` service that you can use to manually control caching of observables or promises

```typescript
@Injectable()
class CarService {

  constructor(
    private http: Http, 
    private asyncCache: AsyncCache, 
    private memoryDriver: MemoryDriver
  ) {}
  
  getCars(): Observable<Car[]> {
  
    const cars$: Observable<Car[]> = this.http.get('/cars').map(res => res.json());
    return asyncCache.wrap(cars$, '/cars', {
      driver: this.memoryDriver, // override the default and cache the data in memory
    });
  
  }

}
```

> There is also a pipe you can use to instantiate the caching in your template

```typescript
@Component({
  template: `
    <div *ngFor="let car of cars | asyncCache:'/cars' | async">
      {{ car.model }}
    </div>
  `
})
class MyComponent {

  cars: Observable<Car[]>;

  constructor(http: Http) {
    this.cars = http.get('/cars').map(res => res.json());
  }

}
```

## Development

### Prepare your environment
* Install [Node.js](http://nodejs.org/) and NPM (should come with)
* Install local dev dependencies: `npm install` while current directory is this repo

### Development server
Run `npm start` to start a development server on port 8000 with auto reload + tests.

### Testing
Run `npm test` to run tests once or `npm run test:watch` to continually run tests.

### Release
* Bump the version in package.json (once the module hits 1.0 this will become automatic)
```bash
npm run release
```

## License

MIT
