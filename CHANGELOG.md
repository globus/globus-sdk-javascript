# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.14.0](https://github.com/globus/globus-sdk-javascript/compare/v1.13.0...v1.14.0) (2023-11-07)


### Features

* adds Node.js lts/iron to test matrix; Node.js 20 is now officially supported. ([#8](https://github.com/globus/globus-sdk-javascript/issues/8)) ([66b4fb2](https://github.com/globus/globus-sdk-javascript/commit/66b4fb2d58194860fd941f02bd0d90de31287d97))
* **Globus Auth:** adds support for the Identities resources in the Globus Auth API ([#7](https://github.com/globus/globus-sdk-javascript/issues/7)) ([b56667d](https://github.com/globus/globus-sdk-javascript/commit/b56667dbc26f779ddefb55deef4e2676c7591cd0))

## 1.13.0 (2023-11-04)


### Bug Fixes

* updates file paths to include '.js' and directories to use explicit 'index.js' for proper ESM support. ([#3](https://github.com/globusonline/globus-sdk-javascript/issues/3)) ([2b9b3cc](https://github.com/globusonline/globus-sdk-javascript/commit/2b9b3ccfbc10729cddd6d59f35cd944a7a1b4530))


### Miscellaneous Chores

* **internal:** updates release-please configuration ([8641488](https://github.com/globusonline/globus-sdk-javascript/commit/86414886549da7271d445a5cf4d7bc290f3ab789))

## [1.12.0-alpha](https://github.com/globusonline/globus-js/compare/@globus/sdk@1.11.0-alpha...@globus/sdk@1.12.0-alpha) (2023-10-30)

### Bug Fixes

- **@globus/sdk:** addresses bad 'types' reference in generated package.json ([f1b6c91](https://github.com/globusonline/globus-js/commit/f1b6c91c3b8248e84539c7ec59b68e54ed26b7ef))

## [1.11.0-alpha](https://github.com/globusonline/globus-js/compare/@globus/sdk@1.10.0-alpha...@globus/sdk@1.11.0-alpha) (2023-10-30)

### Bug Fixes

- **@globus/sdk,GCS,Transfer,Groups,Flows:** fix "never" types for service methods to ensure passing "headers" is allowed. ([3f8746e](https://github.com/globusonline/globus-js/commit/3f8746e10b507eed950c7ea64a162b9a9f6b12af))

## [1.10.0-alpha](https://github.com/globusonline/globus-js/compare/@globus/sdk@1.9.0-alpha...@globus/sdk@1.10.0-alpha) (2023-10-23)

### Features

- **@globus/sdk:** adds endpoint update and patch operations to GCS client. ([#189](https://github.com/globusonline/globus-js/issues/189)) ([2536505](https://github.com/globusonline/globus-js/commit/2536505dde51af07399d20740b97ee861e474601))

## [1.9.0-alpha](https://github.com/globusonline/globus-js/compare/@globus/sdk@1.8.0-alpha...@globus/sdk@1.9.0-alpha) (2023-10-17)

### Features

- **@globus/sdk:** adds support for global GLOBUS_SDK_OPTIONS ([#187](https://github.com/globusonline/globus-js/issues/187)) ([19539dc](https://github.com/globusonline/globus-js/commit/19539dc2719bd8d92c11a2f70fa5a1f25f9c824a))

## [1.8.0-alpha](https://github.com/globusonline/globus-js/compare/@globus/sdk@1.7.0-alpha...@globus/sdk@1.8.0-alpha) (2023-10-16)

### Features

- **@globus/sdk:** allow passing 'environment' as a SDKOption to methods ([#184](https://github.com/globusonline/globus-js/issues/184)) ([105f9bc](https://github.com/globusonline/globus-js/commit/105f9bc7ff5c3c33c18bd62a3069be033e8ef5bb))

### Bug Fixes

- **@globus/sdk:** ensure "headers" can be passed with service method options and Typescript ([#183](https://github.com/globusonline/globus-js/issues/183)) ([5d1e416](https://github.com/globusonline/globus-js/commit/5d1e416cdc1a995b3b8b5206b6c165ff1f212749))

## [1.7.0-alpha](https://github.com/globusonline/globus-js/compare/@globus/sdk@1.6.0-alpha...@globus/sdk@1.7.0-alpha) (2023-10-12)

### Features

- **GCS:** adds update and patch methods for GCS Manager API ([#182](https://github.com/globusonline/globus-js/issues/182)) ([778d7d9](https://github.com/globusonline/globus-js/commit/778d7d9bbb695d0bf6310950f19311d079d395e9))

## [1.6.0-alpha](https://github.com/globusonline/globus-js/compare/@globus/sdk@1.5.3-alpha...@globus/sdk@1.6.0-alpha) (2023-10-12)

### Features

- **@globus/sdk:** add Globus Search POST Query service method. ([0ebd76e](https://github.com/globusonline/globus-js/commit/0ebd76e1ba4962d4c9db7a352323bdbda4a65b86))
- **Timers:** Add Timer service and `create` method ([#180](https://github.com/globusonline/globus-js/issues/180)) ([58837d0](https://github.com/globusonline/globus-js/commit/58837d01350268cca5202f6254acd44bf967ea83))

## [1.5.3-alpha](https://github.com/globusonline/globus-js/compare/@globus/sdk@1.5.2-alpha...@globus/sdk@1.5.3-alpha) (2023-09-25)

**Note:** Version bump only for package @globus/sdk

## [1.5.2-alpha](https://github.com/globusonline/globus-js/compare/@globus/sdk@1.5.1-alpha...@globus/sdk@1.5.2-alpha) (2023-09-25)

**Note:** Version bump only for package @globus/sdk

## [1.5.1-alpha](https://github.com/globusonline/globus-js/compare/@globus/sdk@1.5.0-alpha...@globus/sdk@1.5.1-alpha) (2023-09-25)

**Note:** Version bump only for package @globus/sdk

## [1.5.0-alpha](https://github.com/globusonline/globus-js/compare/@globus/sdk@1.4.1-alpha...@globus/sdk@1.5.0-alpha) (2023-09-25)

### Features

- **@globus/sdk:** allow headers as service method options ([#174](https://github.com/globusonline/globus-js/issues/174)) ([894575b](https://github.com/globusonline/globus-js/commit/894575b0d5e93768555df1676873f8eaed4b2290))

## [1.4.1-alpha](https://github.com/globusonline/globus-js/compare/@globus/sdk@1.4.0-alpha...@globus/sdk@1.4.1-alpha) (2023-09-22)

### Bug Fixes

- updates README and LICENSE references for SDK published package ([c0f87c7](https://github.com/globusonline/globus-js/commit/c0f87c71ee5899142ba56b245ac5d4a82468c5ab))

## [1.4.0-alpha](https://github.com/globusonline/globus-js/compare/@globus/sdk@1.3.0-alpha...@globus/sdk@1.4.0-alpha) (2023-09-22)

**Note:** Version bump only for package @globus/sdk

## [1.3.0-alpha](https://github.com/globusonline/globus-js/compare/@globus/sdk@1.2.5-alpha...@globus/sdk@1.3.0-alpha) (2023-09-21)

### Features

- **@globus/sdk:** allow passing of a fetch callable ([#172](https://github.com/globusonline/globus-js/issues/172)) ([5b9a129](https://github.com/globusonline/globus-js/commit/5b9a129f1face6c7d29591aef677f487fa468bde))

## [1.2.5-alpha](https://github.com/globusonline/globus-js/compare/@globus/sdk@1.2.4-alpha...@globus/sdk@1.2.5-alpha) (2023-09-21)

### Bug Fixes

- **@globus/sdk:** remove "exports" and conditional package references. ([46ee4e2](https://github.com/globusonline/globus-js/commit/46ee4e286d31c2dba3cf3d6523ed04779bbcdfa6))

## [1.2.4-alpha](https://github.com/globusonline/globus-js/compare/@globus/sdk@1.2.3-alpha...@globus/sdk@1.2.4-alpha) (2023-09-20)

### Bug Fixes

- **@globus/sdk:** add 'services/\*' to module exports ([9058f13](https://github.com/globusonline/globus-js/commit/9058f13f4e51d71a12ef614aa38534d725e8fc62))

## [1.2.3-alpha](https://github.com/globusonline/globus-js/compare/@globus/sdk@1.2.1-alpha...@globus/sdk@1.2.3-alpha) (2023-09-18)

**Note:** Version bump only for package @globus/sdk

## [1.2.1-alpha](https://github.com/globusonline/globus-js/compare/@globus/sdk@1.2.0-alpha...@globus/sdk@1.2.1-alpha) (2023-09-18)

### Bug Fixes

- **@globus/sdk:** ensure tslib is listed as a dependency for the CommonJS entry ([5c82fd8](https://github.com/globusonline/globus-js/commit/5c82fd81fa4537a807ebd3c6c16438e03c5de7e2))

## [1.2.0-alpha](https://github.com/globusonline/globus-js/compare/@globus/sdk@1.1.0-alpha...@globus/sdk@1.2.0-alpha) (2023-09-18)

### Bug Fixes

- **@globus/sdk:** add types and package.json files to esm and commonjs entries ([5f41d95](https://github.com/globusonline/globus-js/commit/5f41d95e8f8518e09973ce29210384a445bab4a4))
- **@globus/sdk:** adds unbundled commonjs in addition to AMD ([fb5cfbd](https://github.com/globusonline/globus-js/commit/fb5cfbd3cb01d6fd30f76c320d47e8882b939adf))

## [1.1.0-alpha](https://github.com/globusonline/globus-js/compare/@globus/sdk@1.0.0-alpha...@globus/sdk@1.1.0-alpha) (2023-09-13)

**Note:** Version bump only for package @globus/sdk

## [1.0.0-alpha](https://github.com/globusonline/globus-js/compare/@globus/sdk@1.0.0-alpha...@globus/sdk@1.0.0-alpha) (2023-09-13)

**Note:** Version bump only for package @globus/sdk

## [1.0.0-alpha](https://github.com/globusonline/globus-js/compare/@globus/sdk@0.7.3...@globus/sdk@1.0.0-alpha) (2023-09-13)

### Bug Fixes

- **@globus/sdk:** updates build targets, adds UMD dist, updates ember-3 example ([#164](https://github.com/globusonline/globus-js/issues/164)) ([e3dbc59](https://github.com/globusonline/globus-js/commit/e3dbc595d8c6cbf27b04955b6ce7e6c288d5c444))

## [0.7.3](https://github.com/globusonline/globus-js/compare/@globus/sdk@0.7.2...@globus/sdk@0.7.3) (2023-08-25)

### Bug Fixes

- **@globus/sdk:** bump @globus/types version ([#158](https://github.com/globusonline/globus-js/issues/158)) ([a81572b](https://github.com/globusonline/globus-js/commit/a81572b944611e032dfa818680f6bfea7e78f799))

## [0.7.2](https://github.com/globusonline/globus-js/compare/@globus/sdk@0.7.1...@globus/sdk@0.7.2) (2023-08-25)

### Bug Fixes

- **globus/sdk:** ensure **mocks** and other Jest-related files are removed from built package. ([#157](https://github.com/globusonline/globus-js/issues/157)) ([bdb6b21](https://github.com/globusonline/globus-js/commit/bdb6b21cd23be042522ffba2aa9e30d2300aa54e))

## [0.7.1](https://github.com/globusonline/globus-js/compare/@globus/sdk@0.7.0...@globus/sdk@0.7.1) (2023-08-24)

### Bug Fixes

- **@globus/sdk:** if a `payload` (request `body`) is provided, without a `Content-Type` header, "application/json" is used. ([#154](https://github.com/globusonline/globus-js/issues/154)) ([130a457](https://github.com/globusonline/globus-js/commit/130a457dd8e7c8201e182754295dc29c79bce416))

## [0.7.0](https://github.com/globusonline/globus-js/compare/@globus/sdk@0.6.1...@globus/sdk@0.7.0) (2023-08-22)

### Features

- **@globus/sdk, GCS:** adds Role creation and deletion for GCS Manager API ([#152](https://github.com/globusonline/globus-js/issues/152)) ([6e23dcf](https://github.com/globusonline/globus-js/commit/6e23dcfa2730ccc19c7a540ecf893f6bfee71c05))

## [0.6.1](https://github.com/globusonline/globus-js/compare/@globus/sdk@0.6.0...@globus/sdk@0.6.1) (2023-08-17)

### Bug Fixes

- **sdk:** ensure proper path for 'browser' bundle ([6e5c16c](https://github.com/globusonline/globus-js/commit/6e5c16c68078230cce67266a4a89b8afce9ed081))

# [0.6.0](https://github.com/globusonline/globus-js/compare/@globus/sdk@0.5.0...@globus/sdk@0.6.0) (2023-08-17)

### Features

- **@globus/sdk:** adds browser-based bundle of SDK ([#150](https://github.com/globusonline/globus-js/issues/150)) ([bd1033e](https://github.com/globusonline/globus-js/commit/bd1033e96198631c5650d520be30db1c68c3abf3))

# [0.5.0](https://github.com/globusonline/globus-js/compare/@globus/sdk@0.4.2-alpha.0...@globus/sdk@0.5.0) (2023-08-11)

- refactor(@globus-sdk)!: all service methods require the same options argument shape. (#148) ([fd2ed56](https://github.com/globusonline/globus-js/commit/fd2ed560a028a46c45ce0837732da2d1a9da1614)), closes [#148](https://github.com/globusonline/globus-js/issues/148)

### BREAKING CHANGES

- All service methods use the same options shape regardless of HTTP verb.

## [0.4.2-alpha.0](https://github.com/globusonline/globus-js/compare/@globus/sdk@0.4.1-alpha.0...@globus/sdk@0.4.2-alpha.0) (2023-08-09)

### Bug Fixes

- **GCS:** use query params in collections.getAll ([#146](https://github.com/globusonline/globus-js/issues/146)) ([1e96e61](https://github.com/globusonline/globus-js/commit/1e96e614e49cf360d9862ffed4e2a2284d494e09))

## [0.4.1-alpha.0](https://github.com/globusonline/globus-js/compare/@globus/sdk@0.4.0-alpha.0...@globus/sdk@0.4.1-alpha.0) (2023-08-09)

### Bug Fixes

- update @globus/types peerDependency ([4a3ef03](https://github.com/globusonline/globus-js/commit/4a3ef037ea128870403a9bd0189e3937d99a2a05))

# [0.4.0-alpha.0](https://github.com/globusonline/globus-js/compare/@globus/sdk@0.3.0-alpha.0...@globus/sdk@0.4.0-alpha.0) (2023-08-09)

### Bug Fixes

- **GCS:** proper export for version service methods ([8ae054d](https://github.com/globusonline/globus-js/commit/8ae054d0fdaeb6423d517f555b21988dca55642e))

### Features

- **Groups:** adds basic Groups (v2) service support ([#144](https://github.com/globusonline/globus-js/issues/144)) ([a913840](https://github.com/globusonline/globus-js/commit/a9138405520d99cc4702d5ce96b72820040f1a77))

# [0.3.0-alpha.0](https://github.com/globusonline/globus-js/compare/@globus/sdk@0.2.0-alpha.0...@globus/sdk@0.3.0-alpha.0) (2023-08-01)

### Features

- **GCS Manager API, core:** adds Roles, Storage Gateway and User Credential support. ([#143](https://github.com/globusonline/globus-js/issues/143)) ([93cbf16](https://github.com/globusonline/globus-js/commit/93cbf160f3997304b90f298e06d53d4b57b9acc9))

# [0.2.0-alpha.0](https://github.com/globusonline/globus-js/compare/@globus/sdk@0.1.9-alpha.0...@globus/sdk@0.2.0-alpha.0) (2023-07-14)

### Features

- **GCS:** adds (basic) Globus Connect Manager API support. ([#131](https://github.com/globusonline/globus-js/issues/131)) ([b02896f](https://github.com/globusonline/globus-js/commit/b02896f16daf8d4111a24c2ab13f0ceb3ed50af2))

## [0.1.9-alpha.0](https://github.com/globusonline/globus-js/compare/@globus/sdk@0.1.8-alpha.0...@globus/sdk@0.1.9-alpha.0) (2023-06-13)

**Note:** Version bump only for package @globus/sdk

## [0.1.8-alpha.0](https://github.com/globusonline/globus-js/compare/@globus/sdk@0.1.7-alpha.0...@globus/sdk@0.1.8-alpha.0) (2023-06-12)

**Note:** Version bump only for package @globus/sdk

## [0.1.7-alpha.0](https://github.com/globusonline/globus-js/compare/@globus/sdk@0.1.6-alpha.0...@globus/sdk@0.1.7-alpha.0) (2023-06-12)

**Note:** Version bump only for package @globus/sdk

## [0.1.6-alpha.0](https://github.com/globusonline/globus-js/compare/@globus/sdk@0.1.5-alpha...@globus/sdk@0.1.6-alpha.0) (2023-06-12)

### Bug Fixes

- remove esbuild ([45ddee0](https://github.com/globusonline/globus-js/commit/45ddee007c8c7722cbc92951ed65a5f9d5308aba))

## [0.1.5-alpha](https://github.com/globusonline/globus-js/compare/@globus/sdk@0.1.4-alpha.0...@globus/sdk@0.1.5-alpha) (2023-06-12)

### Bug Fixes

- npm bundle (typescript) ([#125](https://github.com/globusonline/globus-js/issues/125)) ([ad8e5e5](https://github.com/globusonline/globus-js/commit/ad8e5e596258cb075c0e3ea55530b55131f36b3b))

## [0.1.4-alpha.0](https://github.com/globusonline/globus-js/compare/@globus/sdk@0.1.3-alpha.0...@globus/sdk@0.1.4-alpha.0) (2023-06-09)

### Bug Fixes

- remove types from package (for now) ([65abce5](https://github.com/globusonline/globus-js/commit/65abce5b1e4bc768b44365593c7c91e9d174ce92))

### Reverts

- remove [@sdk](https://github.com/sdk) alias, upgrade type dependencies ([#123](https://github.com/globusonline/globus-js/issues/123)) ([111c4bb](https://github.com/globusonline/globus-js/commit/111c4bb29d8d7775545bc81899ea43b36dcfefc2))

## [0.1.3-alpha.0](https://github.com/globusonline/globus-js/compare/@globus/sdk@0.1.2-alpha.0...@globus/sdk@0.1.3-alpha.0) (2023-06-09)

**Note:** Version bump only for package @globus/sdk

## [0.1.2-alpha.0](https://github.com/globusonline/globus-js/compare/@globus/sdk@0.1.1-alpha.0...@globus/sdk@0.1.2-alpha.0) (2023-06-08)

**Note:** Version bump only for package @globus/sdk

## [0.1.1-alpha.0](https://github.com/globusonline/globus-js/compare/@globus/sdk@0.1.0-alpha.0...@globus/sdk@0.1.1-alpha.0) (2023-06-08)

**Note:** Version bump only for package @globus/sdk

## [0.1.0-alpha.0](https://github.com/globusonline/globus-js/compare/@globus/sdk@0.1.0-alpha.0...@globus/sdk@0.1.0-alpha.0) (2023-06-08)

### Features

- **@globus/sdk, @globus/examples-ember-3:** adds incremental authorization handling and Ember 3 example ([#78](https://github.com/globusonline/globus-js/issues/78)) ([6c2cab8](https://github.com/globusonline/globus-js/commit/6c2cab81116591ed121ab324e7612198b37b0d97))
- **@globus/sdk, @globus/examples-ember-3:** adds PKCE integration to the ember@3 example ([#75](https://github.com/globusonline/globus-js/issues/75)) ([92c8c67](https://github.com/globusonline/globus-js/commit/92c8c676e42f3a0290e72d88afb4e6857a985de7))
- **@globus/sdk:** adds initial implementations of Transfer File Operations and Task Submission ([#51](https://github.com/globusonline/globus-js/issues/51)) ([5ca2691](https://github.com/globusonline/globus-js/commit/5ca269158c6f421e9a23efa7c145dd9de173095e))
- **@globus/sdk:** adds startTransfer and more complete types ([#65](https://github.com/globusonline/globus-js/issues/65)) ([897a087](https://github.com/globusonline/globus-js/commit/897a0877ed271bef1d21f164db4b8f8af726afa3))
- **@globus/sdk, Search:** adds scaffold for Globus Search service, adds GET Query support. ([#121](https://github.com/globusonline/globus-js/issues/121)) ([20a3107](https://github.com/globusonline/globus-js/commit/20a3107aca53032ffb45008d55a55a8ce38ebdd6))

### Bug Fixes

- **@globus/sdk:** improves service method generics ([#111](https://github.com/globusonline/globus-js/issues/111)) ([cd63553](https://github.com/globusonline/globus-js/commit/cd6355326a233eb7c5b66ea9f7707bda43597183))
