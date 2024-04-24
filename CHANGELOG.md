# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.0.0](https://github.com/globus/globus-sdk-javascript/compare/v2.7.1...v3.0.0) (2024-04-24)


### ⚠ BREAKING CHANGES

* adds support for Authorization and Globus (Auth) token management ([#120](https://github.com/globus/globus-sdk-javascript/issues/120))

### Features

* adds support for Authorization and Globus (Auth) token management ([#120](https://github.com/globus/globus-sdk-javascript/issues/120)) ([202e416](https://github.com/globus/globus-sdk-javascript/commit/202e416aa79d5bbeac23e00c1271f255789c8761))

## [2.7.1](https://github.com/globus/globus-sdk-javascript/compare/v2.7.0...v2.7.1) (2024-04-24)


### Bug Fixes

* **Types:** adds missing endpoint record fields ([#148](https://github.com/globus/globus-sdk-javascript/issues/148)) ([eed68af](https://github.com/globus/globus-sdk-javascript/commit/eed68afbe267187847b2609e34489c5ee45be703))

## [2.7.0](https://github.com/globus/globus-sdk-javascript/compare/v2.6.0...v2.7.0) (2024-04-19)


### Features

* **Transfer:** Add support for collection bookmark methods. ([#146](https://github.com/globus/globus-sdk-javascript/issues/146)) ([a5567d1](https://github.com/globus/globus-sdk-javascript/commit/a5567d1f2e6577ed1435d7464a35f814e4e39517))
* **Transfer:** adds resource support for creation and update of GCP collections ([#144](https://github.com/globus/globus-sdk-javascript/issues/144)) ([d3ef97a](https://github.com/globus/globus-sdk-javascript/commit/d3ef97a0d464c8b9c3f544dd856211b7d5724389))

## [2.6.0](https://github.com/globus/globus-sdk-javascript/compare/v2.5.0...v2.6.0) (2024-04-08)


### Features

* **Compute:** adds endpoint.getStatus function to Compute service. ([#139](https://github.com/globus/globus-sdk-javascript/issues/139)) ([998bb21](https://github.com/globus/globus-sdk-javascript/commit/998bb21e8773c252820074b6bf690f9dbdc0070f))

## [2.5.0](https://github.com/globus/globus-sdk-javascript/compare/v2.4.1...v2.5.0) (2024-04-05)


### Features

* **Compute:** adds initial support for Globus Compute ([#135](https://github.com/globus/globus-sdk-javascript/issues/135)) ([1923674](https://github.com/globus/globus-sdk-javascript/commit/1923674ecf9beccbb29ef45ceb30dd23ea7bc65e))

## [2.4.1](https://github.com/globus/globus-sdk-javascript/compare/v2.4.0...v2.4.1) (2024-02-22)


### Bug Fixes

* **Typescript, Endpoint Manager, Transfer:** updates the types returned by endpointManager.task.getSuccessfulTransfers and getSkippedErrors ([#113](https://github.com/globus/globus-sdk-javascript/issues/113)) ([63fc263](https://github.com/globus/globus-sdk-javascript/commit/63fc263a132e64f202fa2ef1c114dfd09f930736))

## [2.4.0](https://github.com/globus/globus-sdk-javascript/compare/v2.3.4...v2.4.0) (2024-02-21)


### Features

* **GCS:** adds `CONNECTORS` constant ([#108](https://github.com/globus/globus-sdk-javascript/issues/108)) ([8eea7b8](https://github.com/globus/globus-sdk-javascript/commit/8eea7b845c507deefb7af82d646e0a462b843933))

## [2.3.4](https://github.com/globus/globus-sdk-javascript/compare/v2.3.3...v2.3.4) (2024-02-13)


### Bug Fixes

* **core:** ensure proper context when a fetch __callable is used ([#106](https://github.com/globus/globus-sdk-javascript/issues/106)) ([098e924](https://github.com/globus/globus-sdk-javascript/commit/098e924399761b10ebaf4d9f9784d068f754a7b1))

## [2.3.3](https://github.com/globus/globus-sdk-javascript/compare/v2.3.2...v2.3.3) (2024-02-06)


### Bug Fixes

* **GCS:** ensure all Globus Connect Server service resource methods are available on `getClient` ([#101](https://github.com/globus/globus-sdk-javascript/issues/101)) ([8bdd5a8](https://github.com/globus/globus-sdk-javascript/commit/8bdd5a86b6663de0e6c2209c30a583b5f1d39757))

## [2.3.2](https://github.com/globus/globus-sdk-javascript/compare/v2.3.1...v2.3.2) (2024-02-02)


### Bug Fixes

* **Transfer, Typescript:** updates Transfer marker pagination Query and Response type to number. ([#96](https://github.com/globus/globus-sdk-javascript/issues/96)) ([492cd28](https://github.com/globus/globus-sdk-javascript/commit/492cd2834a9d4a58e2e292bdff54856dd681b73e))
* **Typescript:** allow non-string types for query properties ([#94](https://github.com/globus/globus-sdk-javascript/issues/94)) ([7bf9e9b](https://github.com/globus/globus-sdk-javascript/commit/7bf9e9be1179e6602dbbf670440eb08bee1b03b7))

## [2.3.1](https://github.com/globus/globus-sdk-javascript/compare/v2.3.0...v2.3.1) (2024-01-31)


### Bug Fixes

* **Transfer, Typescript:** specify query types for Transfer task methods ([#92](https://github.com/globus/globus-sdk-javascript/issues/92)) ([e762271](https://github.com/globus/globus-sdk-javascript/commit/e762271939b730a8389fca27b1c58b925172c106))

## [2.3.0](https://github.com/globus/globus-sdk-javascript/compare/v2.2.0...v2.3.0) (2024-01-29)


### Features

* **GCS:** adds resource support for setting endpoint subscription_id ([#90](https://github.com/globus/globus-sdk-javascript/issues/90)) ([aeb1c3c](https://github.com/globus/globus-sdk-javascript/commit/aeb1c3cc4199e04d13fb497e9f40824a502f5965))

## [2.2.0](https://github.com/globus/globus-sdk-javascript/compare/v2.1.0...v2.2.0) (2024-01-22)


### Features

* **Transfer:** adds support for Endpoint ACL Management (access) and Advanced Endpoint Management (endpointManager) resources. ([#82](https://github.com/globus/globus-sdk-javascript/issues/82)) ([fabc088](https://github.com/globus/globus-sdk-javascript/commit/fabc08867f9ef45d89a640350e7770f49bb30b7b))

## [2.1.0](https://github.com/globus/globus-sdk-javascript/compare/v2.0.1...v2.1.0) (2024-01-18)


### Features

* **Search:** adds support for Get Entry and Get Subject resources ([#78](https://github.com/globus/globus-sdk-javascript/issues/78)) ([6ea1d55](https://github.com/globus/globus-sdk-javascript/commit/6ea1d55d0c0825aa12ee9920dcab3388e9208dbe))


### Bug Fixes

* **Authorization:** attempting to access storage ("getStorage") before instantiation no longer throws an error, instead a default storage system is created. ([#77](https://github.com/globus/globus-sdk-javascript/issues/77)) ([7e468db](https://github.com/globus/globus-sdk-javascript/commit/7e468db7ddab2629a4a91a721a83f312af151d38)), closes [#76](https://github.com/globus/globus-sdk-javascript/issues/76)
* **Typescript, Transfer:** fix improper DATA_TYPE type references for transfer.fileOperations.mkdir and transfer.fileOperations.rename ([#69](https://github.com/globus/globus-sdk-javascript/issues/69)) ([78578f1](https://github.com/globus/globus-sdk-javascript/commit/78578f1015845e96cc2492b3a72f6958a678fffd))

## [2.0.1](https://github.com/globus/globus-sdk-javascript/compare/v2.0.0...v2.0.1) (2024-01-04)


### Bug Fixes

* **Auth:** addresses an issue causing auth.oauth2 methods from making proper requests. ([#63](https://github.com/globus/globus-sdk-javascript/issues/63)) ([ab64d8a](https://github.com/globus/globus-sdk-javascript/commit/ab64d8a2834b17c4c2debf119b234a054f2bc9ef))

## [2.0.0](https://github.com/globus/globus-sdk-javascript/compare/v1.18.1...v2.0.0) (2024-01-04)


### ⚠ BREAKING CHANGES

* updates @globus/types requirement to 0.0.6 ([#61](https://github.com/globus/globus-sdk-javascript/issues/61))
* **Flows:** Removes `flows.destroy` alias, replaced by `flows.remove` in 1.15.0 ([#60](https://github.com/globus/globus-sdk-javascript/issues/60))
* Drops support for Node.js 16 (Gallium) ([#58](https://github.com/globus/globus-sdk-javascript/issues/58))

### Features

* Drops support for Node.js 16 (Gallium) ([#58](https://github.com/globus/globus-sdk-javascript/issues/58)) ([4c7e062](https://github.com/globus/globus-sdk-javascript/commit/4c7e062e80c9ed4f78ec0158aa4751dc95a74b23)), closes [#14](https://github.com/globus/globus-sdk-javascript/issues/14)


### Bug Fixes

* **Auth:** Improves auth.oauth.token Typescript types and payload/body serialization ([#62](https://github.com/globus/globus-sdk-javascript/issues/62)) ([8b430d9](https://github.com/globus/globus-sdk-javascript/commit/8b430d94cfe51f1e1b35994cfc313af3b2e4ccd1))


### Miscellaneous Chores

* **Flows:** Removes `flows.destroy` alias, replaced by `flows.remove` in 1.15.0 ([#60](https://github.com/globus/globus-sdk-javascript/issues/60)) ([fe3ca8a](https://github.com/globus/globus-sdk-javascript/commit/fe3ca8a57e605ce48642bff27227693fb4120a94)), closes [#16](https://github.com/globus/globus-sdk-javascript/issues/16)
* updates @globus/types requirement to 0.0.6 ([#61](https://github.com/globus/globus-sdk-javascript/issues/61)) ([d01581b](https://github.com/globus/globus-sdk-javascript/commit/d01581ba4a666a95a9e6968d665cd46fe9c8f876))

## [1.18.1](https://github.com/globus/globus-sdk-javascript/compare/v1.18.0...v1.18.1) (2023-12-13)


### Bug Fixes

* **Transfer:** fix incorrect API hostname for sandbox environment ([#50](https://github.com/globus/globus-sdk-javascript/issues/50)) ([edb11eb](https://github.com/globus/globus-sdk-javascript/commit/edb11eb859b7135328d649de791dece5c24cd08f))

## [1.18.0](https://github.com/globus/globus-sdk-javascript/compare/v1.17.0...v1.18.0) (2023-12-12)


### Features

* **Auth:** adds oauth2.token resources to Globus Auth service. ([#47](https://github.com/globus/globus-sdk-javascript/issues/47)) ([401526d](https://github.com/globus/globus-sdk-javascript/commit/401526d4ff812b80b1cd976d4a51d3949e5c3618))

## [1.17.0](https://github.com/globus/globus-sdk-javascript/compare/v1.16.0...v1.17.0) (2023-12-08)


### Features

* **GCS:** added create, delete, update, and patch methods for User Credentials. ([#41](https://github.com/globus/globus-sdk-javascript/issues/41)) ([966efb5](https://github.com/globus/globus-sdk-javascript/commit/966efb5e0954c651ad72f93615c8ee2c75229099))
* **GCS:** added create, remove, update and patch methods for Storage Gateways ([#42](https://github.com/globus/globus-sdk-javascript/issues/42)) ([bf25771](https://github.com/globus/globus-sdk-javascript/commit/bf2577130bf7271d363640f9a02be165a575376a))
* **Transfer:** adds Task-related service methods, endpoint.remove, and updates to shared scope constant. ([#32](https://github.com/globus/globus-sdk-javascript/issues/32)) ([d4c7c3c](https://github.com/globus/globus-sdk-javascript/commit/d4c7c3c60d81eb1ec53f07613da6a06cbce4d600))

## [1.16.0](https://github.com/globus/globus-sdk-javascript/compare/v1.15.1...v1.16.0) (2023-12-05)


### Features

* **GCS:** adds collections.create, update, patch, and {reset,update}OwnerString ([#37](https://github.com/globus/globus-sdk-javascript/issues/37)) ([5b10343](https://github.com/globus/globus-sdk-javascript/commit/5b103430a71641e229865c1b6a5dddbfdff70231))

## [1.15.1](https://github.com/globus/globus-sdk-javascript/compare/v1.15.0...v1.15.1) (2023-11-10)


### Bug Fixes

* **Flows:** flows.destory has been replaced by flows.remove ([#15](https://github.com/globus/globus-sdk-javascript/issues/15)) ([9498076](https://github.com/globus/globus-sdk-javascript/commit/9498076501dc80fc78db4dd9fc0878846e7d54ac))

## [1.15.0](https://github.com/globus/globus-sdk-javascript/compare/v1.14.0...v1.15.0) (2023-11-07)

### Features

- **GCS:** adds collections.remove() support ([#10](https://github.com/globus/globus-sdk-javascript/issues/10)) ([f12e516](https://github.com/globus/globus-sdk-javascript/commit/f12e516fd8754735d9cb694cfb1f9c3df78e287d))

## [1.14.0](https://github.com/globus/globus-sdk-javascript/compare/v1.13.0...v1.14.0) (2023-11-07)

### Features

- adds Node.js lts/iron to test matrix; Node.js 20 is now officially supported. ([#8](https://github.com/globus/globus-sdk-javascript/issues/8)) ([66b4fb2](https://github.com/globus/globus-sdk-javascript/commit/66b4fb2d58194860fd941f02bd0d90de31287d97))
- **Globus Auth:** adds support for the Identities resources in the Globus Auth API ([#7](https://github.com/globus/globus-sdk-javascript/issues/7)) ([b56667d](https://github.com/globus/globus-sdk-javascript/commit/b56667dbc26f779ddefb55deef4e2676c7591cd0))

## 1.13.0 (2023-11-04)

### Bug Fixes

- updates file paths to include '.js' and directories to use explicit 'index.js' for proper ESM support. ([#3](https://github.com/globusonline/globus-sdk-javascript/issues/3)) ([2b9b3cc](https://github.com/globusonline/globus-sdk-javascript/commit/2b9b3ccfbc10729cddd6d59f35cd944a7a1b4530))

### Miscellaneous Chores

- **internal:** updates release-please configuration ([8641488](https://github.com/globusonline/globus-sdk-javascript/commit/86414886549da7271d445a5cf4d7bc290f3ab789))

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
