import { fakeAsync, tick, flush, flushMicrotasks } from "@angular/core/testing";

fdescribe('Async Testing Examples', () => {

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

  it('Asynchronous test example – plain promise', fakeAsync(() => {
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

  it('Asynchronous test example – Promises + setTimeout()', fakeAsync(() => {
    let counter = 0;

    Promise.resolve().then(() => {
      counter += 10;

      setTimeout(() => {
        ++counter;
      }, 100);
    });

    expect(counter).toBe(0);
    flushMicrotasks();
    expect(counter).toBe(10);
    flush();
    expect(counter).toBe(11);
  }));
});
