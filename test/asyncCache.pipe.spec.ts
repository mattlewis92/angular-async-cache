import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { expect } from 'chai';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { AsyncCacheModule, MemoryDriver, AsyncCache, AsyncCacheOptions } from '../src';
import { AsyncCacheOptionsInterface } from '../src/asyncCacheOptions.provider';

describe('asyncCache pipe', () => {

  @Component({
    template: `
      <div *ngFor="let value of asyncValue | asyncCache:'test':cacheOptions | async">
        {{ value }}
      </div>
    `
  })
  class MyComponent {

    asyncValue: Observable<any>;

    cacheOptions: AsyncCacheOptionsInterface = {
      fromCacheAndReplay: true
    };

    constructor() {
      this.asyncValue = Observable.create((observer: Observer<string[]>) => {
        setTimeout(() => {
          observer.next(['bar', 'bam']);
          observer.complete();
        });
      });
    }

  }

  let cacheDriver: MemoryDriver, cache: AsyncCache;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, AsyncCacheModule.forRoot()],
      declarations: [MyComponent]
    });
    cacheDriver = TestBed.get(MemoryDriver);
    cache = TestBed.get(AsyncCache);
  });

  it('should use the cached result first and then the live values', async(() => {
    cacheDriver.set('test', ['foo', 'bar']);
    const fixture: ComponentFixture<MyComponent> = TestBed.createComponent(MyComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.innerText).to.equal('foo\nbar');
    setTimeout(() => {
      fixture.detectChanges();
      expect(fixture.nativeElement.innerText).to.equal('bar\nbam');
    });
  }));

});