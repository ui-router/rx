# 1.0.0 (2021-11-30)
[Compare `@uirouter/rx` versions 0.6.5 and 1.0.0](https://github.com/ui-router/rx/compare/0.6.5...1.0.0)

### Features

* **rxjs:** Add support for RxJS 7 (in addition to 6)

### BREAKING CHANGE

- rxjs semver range changed to ^6.5.3 || ^7.4.0



## 0.6.5 (2020-01-13)
[Compare `@uirouter/rx` versions 0.6.4 and 0.6.5](https://github.com/ui-router/rx/compare/0.6.4...0.6.5)



## 0.6.4 (2019-11-19)
[Compare `@uirouter/rx` versions 0.6.0 and 0.6.4](https://github.com/ui-router/rx/compare/0.6.0...0.6.4)

### Bug Fixes

* make RXWAIT custom async policy AOT compatible ([a091c48](https://github.com/ui-router/rx/commit/a091c48))




# 0.6.0 (2019-10-01)
[Compare `@uirouter/rx` versions 0.5.0 and 0.6.0](https://github.com/ui-router/rx/compare/0.5.0...0.6.0)

### Bug Fixes

* **travis:** use service: xvfb instead of launching it manually.  install libgconf debian package ([eace3a9](https://github.com/ui-router/rx/commit/eace3a9))


### Features

* add rxwait custom async policy ([dca4929](https://github.com/ui-router/rx/commit/dca4929))
* add rxwait custom async policy ([ab1aaa4](https://github.com/ui-router/rx/commit/ab1aaa4))
* **package:** require uirouter/core >=6.0.0 via peerDependency ([9bacfa4](https://github.com/ui-router/rx/commit/9bacfa4))


### BREAKING CHANGES

* **package:** this version of uirouter/rx depends on uirouter/core version 6 and greater
Because this package now provides an async resolve policy for Observables, this package now has a peerDependency on uirouter/core version >=6.0.0




# 0.5.0 (2018-05-08)
[Compare `@uirouter/rx` versions 0.4.5 and 0.5.0](https://github.com/ui-router/rx/compare/0.4.5...0.5.0)

### Bug Fixes

* **onError:** Handle transition error so rxjs doesn't log rejections ([84e6210](https://github.com/ui-router/rx/commit/84e6210))


### Features

* upgrade to rxjs 6 ([46b8158](https://github.com/ui-router/rx/commit/46b8158))


### BREAKING CHANGES

* rxjs 6.0.0 or higher is now required to use this module




# 0.5.0-alpha.1 (2018-05-07)
[Compare `@uirouter/rx` versions 0.4.5 and 0.5.0-alpha.1](https://github.com/ui-router/rx/compare/0.4.5...0.5.0-alpha.1)

### Features

* upgrade to rxjs 6 ([46b8158](https://github.com/ui-router/rx/commit/46b8158))


### BREAKING CHANGES

* rxjs 6.0.0 or higher is now required to use this module




## 0.4.5 (2017-10-17)
[Compare `@uirouter/rx` versions 0.4.4 and 0.4.5](https://github.com/ui-router/rx/compare/0.4.4...0.4.5)



## 0.4.4 (2017-10-12)
[Compare `@uirouter/rx` versions 0.4.2 and 0.4.4](https://github.com/ui-router/rx/compare/0.4.2...0.4.4)


## 0.4.2 (2017-10-12)
[Compare `@uirouter/rx` versions 0.4.1 and 0.4.2](https://github.com/ui-router/rx/compare/0.4.1...0.4.2)


<a name="0.4.0"></a>
# 0.4.0 (2017-05-08)

* feat(build): Publish UMD bundles ([fd97a1d](https://github.com/ui-router/rx/commit/fd97a1d))
* feat(plugin): Re-export UIRouterRx as UIRouterRxPlugin ([51a31e2](https://github.com/ui-router/rx/commit/51a31e2))


### BREAKING CHANGE

* rename plugin.name from `ui-router-rx` to `@uirouter/rx`


<a name="0.3.2"></a>
## 0.3.2 (2017-05-06)

* chore(*): added .editorconfig file ([8101b6b](https://github.com/ui-router/rx/commit/8101b6b))
* chore(build): widen dependency on @uirouter/core ([ef3ac74](https://github.com/ui-router/rx/commit/ef3ac74))
* chore(gitignore): re-ignore hidden files ([e30ae6e](https://github.com/ui-router/rx/commit/e30ae6e))



<a name="0.3.1"></a>
## 0.3.1 (2017-04-22)

* chore(*): Fix botched npm release

<a name="0.3.0"></a>
## 0.3.0 (2017-04-22)

* chore(*): Rename npm package from `ui-router-rx` to `@uirouter/rx`
* chore(*): Switch dependency from `ui-router-core` to `@uirouter/core`

<a name="0.2.1"></a>
## 0.2.1 (2017-01-22)

* fix(*): fix peer dependency for ui-router-core (from `^3.1.1` to `>=3.1.1`) ([4a29191](https://github.com/ui-router/rx/commit/4a29191))



<a name="0.2.0"></a>
# 0.2.0 (2017-01-20)

* feat(*): Replace with (more up to date) code from https://github.com/ui-router/ng2/blob/45c73 ([f98574e](https://github.com/ui-router/rx/commit/f98574e))


<a name="0.1.0"></a>
# 0.1.0 

* Add package.json ([e4bd097](https://github.com/ui-router/rx/commit/e4bd097))
* Create README.md ([c5305d6](https://github.com/ui-router/rx/commit/c5305d6))
* Create ui-router-react.ts ([a1c5346](https://github.com/ui-router/rx/commit/a1c5346))
* Initial commit ([b5e9dd2](https://github.com/ui-router/rx/commit/b5e9dd2))
* Update readme ([5ec502f](https://github.com/ui-router/rx/commit/5ec502f))
* Update README.md ([2b616a4](https://github.com/ui-router/rx/commit/2b616a4))


