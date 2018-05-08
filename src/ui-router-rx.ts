/** @module rx */
/** */
import { Observable, ReplaySubject } from 'rxjs';
import { map, mergeMap, filter } from 'rxjs/operators';
import { Transition, UIRouter, StateDeclaration, UIRouterPlugin } from '@uirouter/core';

export interface StatesChangedEvent {
  currentStates: StateDeclaration[];
  registered: StateDeclaration[];
  deregistered: StateDeclaration[];
}

declare module '@uirouter/core/lib/globals' {
  interface UIRouterGlobals {
    states$?: Observable<StatesChangedEvent>;
    start$?: Observable<Transition>;
    success$?: Observable<Transition>;
    params$?: Observable<{ [paramName: string]: any }>;
  }
}

/** Augments UIRouterGlobals with observables for transition starts, successful transitions, and state parameters */
export class UIRouterRx implements UIRouterPlugin {
  name = '@uirouter/rx';
  private deregisterFns: Function[] = [];

  constructor(router: UIRouter) {
    let start$ = new ReplaySubject<Transition>(1);
    let success$ = start$.pipe(mergeMap(t => t.promise.then(() => t, () => null)), filter(t => !!t));
    let params$ = success$.pipe(map((transition: Transition) => transition.params()));

    let states$ = new ReplaySubject<StatesChangedEvent>(1);

    function onStatesChangedEvent(event: string, states: StateDeclaration[]) {
      let changeEvent = {
        currentStates: router.stateRegistry.get(),
        registered: [],
        deregistered: [],
      };

      if (event) changeEvent[event] = states;
      states$.next(changeEvent);
    }

    this.deregisterFns.push(router.transitionService.onStart({}, transition => start$.next(transition)));
    this.deregisterFns.push(router.stateRegistry.onStatesChanged(onStatesChangedEvent));
    onStatesChangedEvent(null, null);
    Object.assign(router.globals, { start$, success$, params$, states$ });
  }

  dispose() {
    this.deregisterFns.forEach(deregisterFn => deregisterFn());
    this.deregisterFns = [];
  }
}

export const UIRouterRxPlugin = UIRouterRx;
