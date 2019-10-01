import { CustomAsyncPolicy } from '@uirouter/core';
import { Observable, of } from 'rxjs';
import { first, shareReplay } from 'rxjs/operators';

/**
 * Determines the unwrapping behavior of asynchronous resolve values.
 *
 *   - When an Observable is returned from the resolveFn, wait until the Observable emits at least one item.
 *     If any other value will be converted to an Observable that emits such value.
 *   - The Observable item will not be unwrapped.
 *   - The Observable stream itself will be provided when the resolve is injected or bound elsewhere.
 *
 * #### Example:
 *
 * The `Transition` will wait for the `main.home` resolve observables to emit their first value.
 * Promises will be unwrapped and returned as observables before being provided to components.
 * ```js
 * var mainState = {
 *   name: 'main',
 *   resolve: mainResolves, // defined elsewhere
 *   resolvePolicy: { async: RXWAIT },
 * }
 * ```
 */
export const RXWAIT: CustomAsyncPolicy = (resolveFnValue: Observable<any> | any): Promise<Observable<any>> => {
  if (!(resolveFnValue instanceof Observable)) {
    resolveFnValue = of(resolveFnValue);
  }

  const data$: Observable<any> = resolveFnValue.pipe(shareReplay(1));

  return data$
    .pipe(first())
    .toPromise()
    .then(() => {
      return data$;
    });
};
