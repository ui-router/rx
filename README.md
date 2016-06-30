# ui-router-rx
Reactive Extensions (RxJS) for UI-Router

### What

1) This extension exposes UI-Router [Transitions](https://ui-router.github.io/docs/latest/classes/transition.transition-1.html)
   as [RxJS](https://github.com/ReactiveX/rxjs) Observables.
   This helps you to use UI-Router in a reactive mode.

2) The extension adds a `dynamic()` mode, which makes all parameter types
   [dynamic](https://ui-router.github.io/docs/latest/interfaces/params.paramdeclaration.html#dynamic) by default.
   This means that changes to the parameter values do not cause the state or views to be reloaded.
   You can subscribe to the parameter changes and update your components reactively.


### Getting

```
npm install ui-router-rx
```

### Enabling

```js
// The constructor augments UIRouterGlobals with 
let rx = new UIRouterRx(router);
// Optionally, enable dynamic mode
rx.dynamicMode();
```

### Using (ng2)

```js
@Component({
  template: `<h2>{{ foo$ | async }}</h2>`
})
class FooComponent {
  @Input() foo$: Observable;
}
```

```js
.state('foo', {
  url: '/foo/{fooId}',
  component: FooComponent,
  resolve: [ { 
    token: 'foo$', 
    resolveFn: (trans, http) => http.get('/foos/' + trans.params().fooId)
    deps: [ Transition, Http ]
  } ]
})
```
