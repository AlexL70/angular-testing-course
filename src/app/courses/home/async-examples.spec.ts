import { fakeAsync, tick, flush } from "@angular/core/testing";

fdescribe('Async Testing Examples', () => {

  it('Asynchronous test expample with Jasmine "done()"', (done: DoneFn) => {
    let test = false;

    setTimeout(() => {
      test = true;
      console.log('Running assertion');
      expect(test).toBeTruthy();
      done();
    }, 100);
  });

  it('Asynchronous test example with "setTimeout()"', fakeAsync(() => {
    let test = false;

    setTimeout(() => {}, 10);

    setTimeout(() => {
      test = true;
      console.log('Running assertion for "setTimeout()"');
    }, 100);

    //  tick(100);

    flush();

    expect(test).toBeTruthy();
  }));

});
