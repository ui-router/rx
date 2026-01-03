/** @packageDocumentation @publicapi @module rx */

import { StateDeclaration, Transition, UIRouter, UIRouterPlugin } from '@uirouter/core';
import { ReplaySubject } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';

export interface StatesChangedEvent {
  currentStates: StateDeclaration[];
  registered: StateDeclaration[];
  deregistered: StateDeclaration[];
}

/** Augments UIRouterGlobals with observables for transition starts, successful transitions, and state parameters */
export class UIRouterRx implements UIRouterPlugin {
  name = '@uirouter/rx';
  private deregisterFns: Function[] = [];

  constructor(router: UIRouter) {
    let start$ = new ReplaySubject<Transition>(1);
    let success$ = start$.pipe(
      mergeMap((t) =>
        t.promise.then(
          () => t,
          () => null
        )
      ),
      filter((t) => !!t)
    );
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

    this.deregisterFns.push(router.transitionService.onStart({}, (transition) => start$.next(transition)));
    this.deregisterFns.push(router.stateRegistry.onStatesChanged(onStatesChangedEvent));
    onStatesChangedEvent(null, null);
    Object.assign(router.globals, { start$, success$, params$, states$ });
  }

  dispose() {
    this.deregisterFns.forEach((deregisterFn) => deregisterFn());
    this.deregisterFns = [];
  }
}

export const UIRouterRxPlugin = UIRouterRx;
