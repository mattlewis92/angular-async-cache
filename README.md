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

## Installation

Install through npm:
```
npm install --save angular-async-cache
```

Sample usage

```typescript
import { NgModule, Component, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AsyncCache, LocalStorageDriver, MemoryDriver, AsyncCacheModule } from 'angular-async-cache';

// declare in your module
@NgModule({
  imports: [
    AsyncCacheModule.forRoot({
      driver: new LocalStorageDriver(), // default cache driver to use. Default in memory. You can also roll your own by implementing the CacheDriver interface
      fromCacheAndReplay: true // this is the special sauce - first emit the data from localstorage, then re-fetch the live data from the API and emit a second time. The async pipe will then re-render and update the UI
    })
  ]
})
class MyModule {}

// use in your service
@Injectable()
class CarService {

  constructor(
    private http: Http, 
    private asyncCache: AsyncCache, 
    private memoryDriver: MemoryDriver
  ) {}
  
  getCars(): Observable<Car[]> {
  
    const cars$: Observable<Car[]> = this.http.get('/cars').map(res => res.json());
    return asyncCache.proxy('/cars', cars$, {
      driver: this.memoryDriver, // override the default and cache the data in memory
    });
  
  }

}

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

  constructor(carService: CarService) {
    this.cars = carService.getCars();
  }

}

// alternatively use the asyncCache pipe in your template, this way you also dont need to wrap the observable beforehand
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
