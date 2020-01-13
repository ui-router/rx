/** @packageDocumentation @coreapi @module core */
import { StatesChangedEvent } from './ui-router-rx';
import { Transition } from '@uirouter/core';
import { Observable } from 'rxjs';

// @ts-ignore
declare module '../../core/src/globals' {
  interface UIRouterGlobals {
    states$?: Observable<StatesChangedEvent>;
    start$?: Observable<Transition>;
    success$?: Observable<Transition>;
    params$?: Observable<{ [paramName: string]: any }>;
  }
}
