/** @packageDocumentation @coreapi @module rx */
import { StatesChangedEvent } from './ui-router-rx';
import { Transition } from '@uirouter/core';
import { Observable } from 'rxjs';

/**
 * Augments the core [[core.UIRouterGlobals]] interface
 * @coreapi @module rx.augment
 */
// @ts-ignore
declare module '../../core/src/globals' {
  /**
   * The following observables are added to the core `UIRouterGlobals` object via the [[rx]] plugin.
   *
   * Access these observables from the router's globals object:
   *
   * ```js
   * router.globals.*
   * ```
   */
  interface UIRouterGlobals {
    /**
     * This observable emits whenever the list of registered states change.
     *
     * example:
     * ```js
     * router.globals.states$.subscribe(event => {
     *   event.deregistered.forEach(state => console.log(`${state.name} has been deregistered`));
     *   event.registered.forEach(state => console.log(`${state.name} has been registered`));
     *   console.log(`A total of ${event.currentStates.length} states are now registered`);
     * });
     * ```
     */
    states$?: Observable<StatesChangedEvent>;
    /**
     * This observable emits each Transition when it starts.
     *
     * example:
     * ```js
     * router.globals.start$.subscribe(transition => {
     *   console.log(`About to transition to ${transition.to()}`);
     * });
     * ```
     */
    start$?: Observable<Transition>;
    /**
     * This observable emits each successful Transition.
     *
     * example:
     * ```js
     * router.globals.success$.subscribe(transition => {
     *   console.log(`Current state is now ${transition.to()});
     *   console.log(`Current params are now ${JSON.stringify(transition.params())});
     * });
     * ```
     */
    success$?: Observable<Transition>;
    /**
     * This observable emits the current parameter values whenever a transition succeeds.
     *
     * example:
     * ```js
     * router.globals.params$.subscribe(transition => {
     *   console.log(`Current params are now ${JSON.stringify(transition.params())});
     * });
     * ```
     */
    params$?: Observable<{ [paramName: string]: any }>;
  }
}
