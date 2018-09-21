# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="2.0.2"></a>
## [2.0.2](https://github.com/mattlewis92/angular-async-cache/compare/v2.0.1...v2.0.2) (2018-09-21)


### Bug Fixes

* allow http params to be an object ([f0b4294](https://github.com/mattlewis92/angular-async-cache/commit/f0b4294))



<a name="2.0.1"></a>
## [2.0.1](https://github.com/mattlewis92/angular-async-cache/compare/v2.0.0...v2.0.1) (2018-05-17)


### Bug Fixes

* handle passing undefined values ([ba84539](https://github.com/mattlewis92/angular-async-cache/commit/ba84539))



<a name="2.0.0"></a>
# [2.0.0](https://github.com/mattlewis92/angular-async-cache/compare/v1.0.1...v2.0.0) (2018-05-16)


### Features

* upgrade to angular 6 ([cf68409](https://github.com/mattlewis92/angular-async-cache/commit/cf68409)), closes [#5](https://github.com/mattlewis92/angular-async-cache/issues/5)


### BREAKING CHANGES

* angular 6 or higher is now required to use this package



<a name="1.0.1"></a>
## [1.0.1](https://github.com/mattlewis92/angular-async-cache/compare/v1.0.0...v1.0.1) (2017-12-23)


### Bug Fixes

* allow angular 5 peer dependency ([e78bf10](https://github.com/mattlewis92/angular-async-cache/commit/e78bf10))



<a name="1.0.0"></a>
# [1.0.0](https://github.com/mattlewis92/angular-async-cache/compare/v0.4.1...v1.0.0) (2017-07-16)


### Features

* **cachedHttp:** use new http client ([406f99d](https://github.com/mattlewis92/angular-async-cache/commit/406f99d))


### BREAKING CHANGES

* **cachedHttp:** angular 4.3 or higher is now required to use this library. The new http client is
now used for cached http requests instead of the @angular/http package
* For System.js users only, the umd path has changed from `angular-async-cache/dist/umd/angular-async-cache.js` to `angular-async-cache/bundles/angular-async-cache.umd.js`


<a name="0.4.1"></a>
## [0.4.1](https://github.com/mattlewis92/angular-async-cache/compare/v0.4.0...v0.4.1) (2017-03-24)


### Bug Fixes

* allow angular 4 peer dependency ([44018b4](https://github.com/mattlewis92/angular-async-cache/commit/44018b4))



<a name="0.4.0"></a>
# [0.4.0](https://github.com/mattlewis92/angular-async-cache/compare/v0.3.2...v0.4.0) (2016-11-06)


### Features

* **bypassCache:** add option to bypass cache for reads ([d80a1a1](https://github.com/mattlewis92/angular-async-cache/commit/d80a1a1))



<a name="0.3.2"></a>
## [0.3.2](https://github.com/mattlewis92/angular-async-cache/compare/v0.3.1...v0.3.2) (2016-11-06)


### Bug Fixes

* use correct observable import ([81d220f](https://github.com/mattlewis92/angular-async-cache/commit/81d220f))



<a name="0.3.1"></a>
## [0.3.1](https://github.com/mattlewis92/angular-async-cache/compare/v0.3.0...v0.3.1) (2016-11-06)


### Bug Fixes

* **build:** dont bundle http service ([4817833](https://github.com/mattlewis92/angular-async-cache/commit/4817833))



<a name="0.3.0"></a>
# [0.3.0](https://github.com/mattlewis92/angular-async-cache/compare/v0.2.0...v0.3.0) (2016-11-06)


### Bug Fixes

* throw a helpful error when a non promise returning function is passed ([0e093db](https://github.com/mattlewis92/angular-async-cache/commit/0e093db))


### Features

* **cachedHttp:** add the cachedHttp service ([375b0ed](https://github.com/mattlewis92/angular-async-cache/commit/375b0ed))


### BREAKING CHANGES

* cachedHttp: @angular/http is now required to use this module



<a name="0.2.0"></a>
# [0.2.0](https://github.com/mattlewis92/angular-async-cache/compare/v0.1.2...v0.2.0) (2016-11-06)


### Bug Fixes

* **aot:** more robust fix for aot compilation ([c34828d](https://github.com/mattlewis92/angular-async-cache/commit/c34828d))


### BREAKING CHANGES

* aot: the way the library defaults are configured has changed. See the readme for an

example



<a name="0.1.2"></a>
## [0.1.2](https://github.com/mattlewis92/angular-async-cache/compare/v0.1.1...v0.1.2) (2016-11-05)


### Bug Fixes

* **aot:** fix aot compilation ([6648130](https://github.com/mattlewis92/angular-async-cache/commit/6648130))



<a name="0.1.1"></a>
## [0.1.1](https://github.com/mattlewis92/angular-async-cache/compare/v0.1.0...v0.1.1) (2016-11-05)


### Bug Fixes

* **aot:** fix aot compilation ([92ac699](https://github.com/mattlewis92/angular-async-cache/commit/92ac699))



<a name="0.1.0"></a>
# 0.1.0 (2016-11-05)


### Features

* add the asyncCache pipe ([2d4a7e5](https://github.com/mattlewis92/angular-async-cache/commit/2d4a7e5))
* initial release ([0b901b5](https://github.com/mattlewis92/angular-async-cache/commit/0b901b5))
