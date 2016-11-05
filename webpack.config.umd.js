const path = require('path');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.join(__dirname, 'dist', 'umd'),
    filename: './angular-async-cache.js',
    libraryTarget: 'umd',
    library: 'angularAsyncCache'
  },
  externals: {
    '@angular/core': {
      root: ['ng', 'core'],
      commonjs: '@angular/core',
      commonjs2: '@angular/core',
      amd: '@angular/core'
    },
    'rxjs/Observable': {
      root: ['rx', 'Observable'],
      commonjs: 'rxjs/Observable',
      commonjs2: 'rxjs/Observable',
      amd: 'rxjs/Observable'
    },
    'rxjs/Observer': {
      root: ['rx', 'Observer'],
      commonjs: 'rxjs/Observer',
      commonjs2: 'rxjs/Observer',
      amd: 'rxjs/Observer'
    },
    'rxjs/add/observable/merge': {
      root: ['rx', 'Observable', 'merge'],
      commonjs: 'rxjs/observable/merge',
      commonjs2: 'rxjs/observable/merge',
      amd: 'rxjs/observable/merge'
    },
    'rxjs/add/observable/of': {
      root: ['rx', 'Observable', 'of'],
      commonjs: 'rxjs/observable/of',
      commonjs2: 'rxjs/observable/of',
      amd: 'rxjs/observable/of'
    },
    'rxjs/add/observable/fromPromise': {
      root: ['rx', 'Observable', 'fromPromise'],
      commonjs: 'rxjs/observable/fromPromise',
      commonjs2: 'rxjs/observable/fromPromise',
      amd: 'rxjs/observable/fromPromise'
    },
    'rxjs/add/operator/map': {
      root: ['rx', 'Observable'],
      commonjs: 'rxjs/add/operator/map',
      commonjs2: 'rxjs/add/operator/map',
      amd: 'rxjs/add/operator/map'
    },
    'rxjs/add/operator/mergeMap': {
      root: ['rx', 'Observable'],
      commonjs: 'rxjs/add/operator/mergeMap',
      commonjs2: 'rxjs/add/operator/mergeMap',
      amd: 'rxjs/add/operator/mergeMap'
    },
    'symbol-observable': 'symbol-observable'
  },
  devtool: 'source-map',
  module: {
    preLoaders: [{
      test: /\.ts$/, loader: 'tslint-loader?emitErrors=true&failOnHint=true', exclude: /node_modules/
    }],
    loaders: [{
      test: /\.ts$/, loader: 'awesome-typescript-loader', exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: ['', '.ts', '.js']
  }
};
