import { fakeAsync, flush, flushMicrotasks, tick } from "@angular/core/testing";
import { of } from "rxjs";
import { delay } from "rxjs/operators";

describe("Async testing examples", () => {
  it("Async test example with Jasmine 'done'", (done: DoneFn) => {
    let test = false;

    setTimeout(() => {
      console.log("Running assertions");
      test = true;

      expect(test).toBeTruthy();
      done();
    }, 1000);
  });

  it("Async test example with 'setTimeout'", fakeAsync(() => {
    let test = false;

    setTimeout(() => {
      console.log("Running assertions");
      test = true;
    }, 1000);
    // tick(1000);
    flush();
    expect(test).toBeTruthy();
  }));

  it("Async test example - plain Promise", fakeAsync(() => {
    let test = false;

    console.log("Creating promise");

    Promise.resolve().then(() => {
      console.log(`Promise evaluated successfully`);
      test = true;
    });
    flushMicrotasks();
    console.log(`Running test assertions`);
    expect(test).toBeTruthy();
  }));

  it("Async example - setTimeout + Promise", fakeAsync(() => {
    let counter = 0;

    Promise.resolve().then(() => {
      counter += 10;

      setTimeout(() => {
        ++counter;
      }, 1000);
    });
    expect(counter).toBe(0);
    flushMicrotasks();
    expect(counter).toBe(10);
    tick(500);
    expect(counter).toBe(10);
    tick(500);
    expect(counter).toBe(11);
  }));

  it("Async example - Observable", fakeAsync(() => {
    let test = false;
    console.log("Creating obs");

    let test$ = of(test).pipe(delay(1000));
    test$.subscribe(() => {
      test = true;
    });
    tick(1000);
    console.log(`Running test assertions`);
    expect(test).toBeTruthy();
  }));
});
