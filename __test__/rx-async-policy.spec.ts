import { RXWAIT } from '../src';
import { Observable, of, Subject } from 'rxjs';

describe('RXWAIT', () => {
  let resolveSuccessSpy;

  beforeEach(() => {
    resolveSuccessSpy = jasmine.createSpy('resolveSuccess');
  });

  describe('when provided with something other than an observable', () => {
    let resolve;

    beforeEach(() => {
      resolve = RXWAIT('5');

      return resolve.then(resolveSuccessSpy);
    });

    it('should resolve with an observable', () => {
      return resolve.then(observable => {
        observable.subscribe(value => {
          expect(value).toBe('5');
        });
      });
    });
  });

  describe('when provided with an observable that already emitted', () => {
    let resolve;

    beforeEach(() => {
      resolve = RXWAIT(of('5'));
    });

    it('should resolve straight away with an observable', () => {
      return resolve.then(observable => {
        observable.subscribe(value => {
          expect(value).toBe('5');
        });
      });
    });
  });

  describe('when provided with an observable that has not emitted yet', () => {
    let resolve, resolveRejectSpy, resolveSubject;

    beforeEach(() => {
      resolveSubject = new Subject();

      resolveRejectSpy = jasmine.createSpy('resolveReject');

      resolve = RXWAIT(resolveSubject.asObservable());

      resolve.then(resolveSuccessSpy, resolveRejectSpy);
    });

    it('should not resolve the promise', () => {
      expect(resolveSuccessSpy).not.toHaveBeenCalled();
    });

    describe('when the observable emits one value', () => {
      beforeEach(() => {
        resolveSubject.next('5');

        return resolve;
      });

      it('should resolve the promise with an observable', () => {
        expect(resolveSuccessSpy).toHaveBeenCalledWith(jasmine.any(Observable));
      });

      describe('when the observable emits again', () => {
        let value;

        beforeEach(() => {
          value = null;

          resolveSuccessSpy.calls.mostRecent().args[0].subscribe(result => {
            value = result;
          });

          resolveSubject.next('6');
        });

        it('should emite the new value', () => {
          expect(value).toBe('6');
        });
      });
    });

    describe('when the observable error', () => {
      beforeEach(() => {
        resolveSubject.error('Something went wrong');

        return resolve.catch(() => null);
      });

      it('should reject the promise with the error', () => {
        expect(resolveRejectSpy).toHaveBeenCalledWith('Something went wrong');
      });
    });
  });
});
