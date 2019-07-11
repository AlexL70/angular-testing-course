import { fakeAsync, tick, flush, flushMicrotasks } from "@angular/core/testing";

describe('Async Testing Examples', () => {

  it('Asynchronous test expample with Jasmine "done()"', (done: DoneFn) => {
    let test = false;

    setTimeout(() => {
      test = true;
      expect(test).toBeTruthy();
      done();
    }, 100);
  });

  it('Asynchronous test example with "setTimeout()"', fakeAsync(() => {
    let test = false;

    setTimeout(() => {}, 10);

    setTimeout(() => {
      test = true;
    }, 100);

    //  tick(100);

    flush();

    expect(test).toBeTruthy();
  }));

  fit('Asynchronous test example – plain promise', fakeAsync(() => {
    let test = false;

    console.log('Creating promise');
    Promise.resolve().then(() => {
      console.log('First promise evaluated successfully');
      return Promise.resolve();
    }).then(() => {
      console.log('Second promise evaluated successfully');
      test = true;
    });

    flushMicrotasks();

    console.log('Running test assertion.')
    expect(test).toBeTruthy();
  }));

});
