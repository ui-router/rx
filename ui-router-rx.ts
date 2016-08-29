import {Observable, ReplaySubject} from "rxjs/Rx";
import {Transition, UIRouter, UIRouterGlobals} from "ui-router-ng2";

declare module 'ui-router-core/globals' {
  interface UIRouterGlobals {
    start$: Observable<Transition>;
    success$: Observable<Transition>;
    params$: Observable<{ [paramName: string]: any }>;
  }
}

/** Augments UIRouterGlobals with observables for transition starts, successful transitions, and state parameters */
export class UIRouterRx {
  constructor(router: UIRouter) {

    let start$ = new ReplaySubject<Transition>();
    router.transitionService.onStart({}, transition => start$.next(transition));
    let success$ = <Observable<Transition>> start$.mergeMap((t: Transition) => t.promise.then(() => t));
    let params$ = success$.map((transition: Transition) => transition.params());

    Object.assign(router.globals, {start$, success$, params$});
  }
}
