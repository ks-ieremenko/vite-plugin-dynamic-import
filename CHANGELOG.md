## [2024-09-16] v1.6.0

- 51c5eb2 chore: bump deps
- 5654c85 feat(1.6.0): support glob tail with `/index` for vite-plugin-commonjs#49
- a7b22c9 refactor: hasDynamicImport comment import issue (#75)
- 9d5ce7d Merge pull request #63 from Lee-Si-Yoon/patch-1
- d56ac2d fix typo
- a32caad add License #61

## [2023-07-06] v1.5.0

- c7c380c feat: generate sourcemap #57, closes [#57](https://github.com/vite-plugin/vite-plugin-dynamic-import/issues/57)
- d677983 Merge pull request #59 from higuaifan/patch-1
- e6286bf fix: comments

## [2023-06-25] v1.4.1

- e2e4ba6 fix: correct esbuild loader #56, closes [#56](https://github.com/vite-plugin/vite-plugin-dynamic-import/issues/56)

## [2023-05-14] v1.4.0

- ceb1bba feat: compatible `pnpm`

## [2023-05-04] v1.3.4

- 1e7aeed v1.3.4
- fe75572 chore(test): cleanup
- bcac9ab feat: built into `node14`
- 3cdf718 fix: v1.3.3

## [2023-05-04] v1.3.3

- 9397f17 v1.3.3
- 16f5d58 chore: cleanup | closes [#53](https://github.com/vite-plugin/vite-plugin-dynamic-import/issues/53)

## [2023-04-30] v1.3.2

- 1b96e39 v1.3.2
- 6f0fadf feat: `glob` files log

## [2023-04-30] v1.3.1

- 9c81c19 docs: v1.3.1
- db41149 v1.3.1
- f653b57 chore: better args name
- a4dc220 feat: export `globFiles`
- 9fbefa5 chore: better args name
- da70ede chore: cleanup

## [2023-04-28] v1.3.0

**Main changes**

- support Vite's [Pre-Bundling](https://vitejs.dev/guide/dep-pre-bundling.html#dependency-pre-bundling) for [vite-plugin-dynamic-import/issues/48](https://github.com/vite-plugin/vite-plugin-dynamic-import/issues/48)
- use the `es-module-lexer` improve performance
- integrate `vitest` 🌱

**Full commits**

- babb391 docs: v1.3.0
- 0949d3f feat: better build
- c4ef2f6 feat: support Pre-Bundling
- 966eca5 chore: types
- 2d090cb chore: cleanup
- b1a5bab fix: filter `node_modules`, `import.meta`
- e75e3bc log: v1.3.0
- 8972bb4 v1.3.0
- f7a3ab8 doc: v1.3.0
- b34ada6 test: v1.3.0
- 2a4f240 chore: comments
- 17b1eb0 refactor: performance, support node_modules, custom resolve importee
- 8dd5cac feat: integrate vitest 🌱
- 2ea165f chore: cleanup

## [2023-01-20] v1.2.7

- 53ecc11 feat: generate types #44

## [2023-01-13] v1.2.6

- 3a4bfd9 fix: recursively up lookup of `node_moduels` #41
- 85fbec8 chore: bump vite-plugin-utils to 0.4.0

## [2023-01-12] v1.2.5

- 95b3076 fix: recursively up lookup of `node_moduels` #41
- f83c7f3 chore: bump deps

## [2022-11-26] v1.2.4

- 158b73c v1.2.4
- 2d64f54 chore: bump deps
- 9fe053f chore: target node14
- f2b57dd chore: `node:` prefix
- 6d8cc95 chore: disable warning
- 0c5b5e3 fix: BUG on Windows #38

## [2022-10-16] v1.2.3

- 7cf1c21 v1.2.3
- bfaacf3 chore: `"strict": true`
- ebeaaf3 refactor: optimize build, fix(#35)

## [2022-09-08] v1.2.2

- dab79aa refactor: build cjs with Vite 🌱
- c319816 bump vite, typescript
- 238473b move fast-glob, vite-plugin-utils to devDependencies

## [2022-09-03] v1.2.1

- 5940444 feat(🌱): support "type": "module" #29

## [2022-08-30] v1.2.0

- 8941f37 fix(🐞): nested try error #27
- b0be8fa refactor: use vite-plugin-utils instead utils.ts
- 03dd17e refactor: mappingPath update params. alias instead resolved
- 5bc8537 feat: add relativeify
- 8ecf926 feat: add findString, relative into Resolved

## [2022-08-04] v1.1.1

- 🌱 better glob (8b0a5c0)

  ```js
  src > utils.ts > toLooseGlob(glob)

  foo* -> [foo*, foo*/**/*]
  foo*.js -> [foo*.js, foo*/**/*.js]
  ```

## [2022-07-30] v1.1.0

- ec5af88 docs: update
- f0ce5c5 chore(break): public utils
- fd3653d chore: comments
- 773a13d refactor: use `toLooseGlob()`
- 8efeffd feat: `toLooseGlob()`
- 1b22850 fix(🐞): use `path.posix`
- 1392dec chore(enhance): use normalizePath
- 8ba41e2 Merge pull request #22 from shooterRao/patch-1
- 364f449 fix: use normalizePath instead of path.posix

## [2022-07-04] v1.0.0

- 71af433 docs: v1.0.0
- 45eace4 chore:more exact match `.vite/`
- ebd993c 🚨:use `options.loose` instead of `options.depth`

## [2022-06-13] v0.9.9

- 84eda9b test: v0.9.9
- c7f0799 docs: v0.9.9
- e9f65e9 fix(🐞): skip itself from glob
- 2b38f0f test: optimize code
- 809d818 docs: update
- ec9036d remove types.ts
- 23af7ee chore: AcornNode
- 8adc6fe Merge pull request #9 from vite-plugin/dev
- bd74200 chore: comments

## [2022-06-09] v0.9.8

- 5807515 feat: `resolve.parseImportee()`
- 0054f4a chore: remove `extractImporteeRE`, `isRaw()`, `parseImportee()`
- cb39a4a fix: use `String.slice()` instead of `parseImportee()`
- 603a256 fix: use `String.slice()` instead of `RegExp`

## [2022-06-09] v0.9.7-beta2

- 8c7a026 backup(v0.9.7): remove files
- 9d61af8 test(v0.9.7-beta2): UPD main-output.js
- d070477 backup(v0.9.7): rename files
- d0c6147 refactor(v0.9.7-beta2): better logic
- ca85c88 feat: `tryFixGlobSlash()`, `toDepthGlob()`, `mappingPath()`
- 1e9b102 chore: optimize code
- 6748dab feat: dynamic-import-to-glob.ts
- 065d945 chore: test based on vite.config.ts
- bd6a933 chore: optimize code

## [2022-06-03] v0.9.7

- refactor: remove vite-plugin-utils
- refactor: merge alias.ts into resolve.ts
- refactor: use resolve only
- refactor: migration alias to resolve

## [2022-05-31] v0.9.6

- 🐞 [issues/4](https://github.com/vite-plugin/vite-plugin-dynamic-import/issues/4)
- 🌱 Support `import(node_modules/xxx)`
