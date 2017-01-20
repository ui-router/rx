# ui-router-rx
Reactive Extensions (RxJS) for UI-Router

### What

This UI-Router plugin exposes various events in UI-Router 
   as [RxJS](https://github.com/ReactiveX/rxjs) Observables.

   - Transitions (successfull, or any)
   - Parameter values
   - State registration/deregistrations

This helps you to use UI-Router in a reactive mode.

This plugin works with UI-Router Core 2.0 and above (angular-ui-router 1.0.0-rc.1+, ui-router-ng2 1.0.0-beta.4+, ui-router-react 0.4.0+).


### Getting

```
npm install ui-router-rx
```

### Enabling

This is a UI-Router Plugin.
Add the `UIRouterRx` plugin to your app's `UIRouter` instance.

```js
import { UIRouterRx } from "ui-router-rx";

// ... after UI-Router bootstrap, get a reference to the `UIRouter` instance
// ... call `.plugin()` to register the ui-router-rx plugin
uiRouter.plugin(UIRouterRx);
```

### Using

In a state definition,

```js
const foo$ = (uiRouter) => 
    uiRouter.globals.params$.map(params => params.fooId)
      .distinctUntilChanged()
      .map(fooId => fetch('/foo/' + fooId).then(resp => resp.json()))

var fooState = {
  name: 'foo',
  url: '/foo/{fooId}',
  component: FooComponent,
  resolve: [ 
      { token: 'foo$', deps: [ UIRouter ], resolveFn: foo$ } 
  ]
})
```

In the component, access the `foo$` resolve value (it will be an Observable).  Subscribe to it and do something with it when it emits a new value. 

```js
var subscription = foo$.subscribe(foo => this.foo = foo);
```

Don't forget to unsubscribe when the component is destroyed.

```js
subscription.unsubscribe();
```


