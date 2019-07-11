
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

});
