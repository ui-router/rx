import { UIRouter, servicesPlugin, memoryLocationPlugin } from '@uirouter/core';
import { UIRouterRxPlugin } from '../src';

describe('Globals Augmentation', () => {
  let router;
  beforeEach(() => {
    router = new UIRouter();
    router.plugin(servicesPlugin);
    router.plugin(memoryLocationPlugin);
  });

  it('should augument router.globals', () => {
    expect(router.globals.success$).not.toBeDefined();
    expect(router.globals.params$).not.toBeDefined();

    router.plugin(UIRouterRxPlugin);
    expect(router.globals.success$).toBeDefined();
    expect(router.globals.params$).toBeDefined();
  });
});

const tick = () => new Promise(resolve => setTimeout(resolve));

describe('State Changes', () => {
  let router, successes;

  beforeEach(() => {
    successes = [];
    router = new UIRouter();
    router.plugin(servicesPlugin);
    router.plugin(memoryLocationPlugin);
    router.plugin(UIRouterRxPlugin);

    router.stateRegistry.register({ name: 'foo' });
    router.stateRegistry.register({ name: 'bar' });

    router.globals.success$.subscribe(trans => {
      successes.push(trans.to().name);
    });
  });

  it('(successful) should emit transitions from router.globals.success$', async function(done) {
    await router.stateService.go('foo').then(tick, tick);
    expect(router.globals.current.name).toEqual('foo');
    expect(successes).toEqual(['foo']);

    await router.stateService.go('bar').then(tick, tick);
    expect(router.globals.current.name).toEqual('bar');
    expect(successes).toEqual(['foo', 'bar']);

    done();
  });

  it('(unsuccessful) should not emit transitions from router.globals.success$', async function(done) {
    const failresolve = () => Promise.reject('the transition should fail');
    router.stateRegistry.register({ name: 'fail', resolve: { failresolve } });
    router.stateService.defaultErrorHandler(() => null);

    await router.stateService.go('foo').then(tick, tick);
    expect(successes).toEqual(['foo']);

    try {
      await router.stateService.go('fail');
    } catch (ignored) {}

    await tick();

    expect(router.globals.current.name).toBe('foo');
    expect(successes).toEqual(['foo']);

    done();
  });
});
