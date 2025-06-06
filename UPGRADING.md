# Upgrading

## Migrating from `v5` to `v6`

**For most users, this upgrade will not require any changes to your application code.** The `v6` release of `@globus/sdk` was considered a breaking change based on the following:

- **Deprecation of support for Node.js 18.** This version of Node.js has reached its end-of-life. The `@globus/sdk` has been updated to support Node.js 20 and later.
- **Removal of the `@globus/types` package.** The `@globus/types` package has been removed from the SDK, and all types are now included in the main `@globus/sdk` package. This change was made to simplify the installation process and reduce confusion about which package to use for type definitions as the source of truth. See the section below for more details on this change.
- **"Timer" service renamed to "Timer*s*".** The `@globus/sdk/services/timer` service has been renamed to `@globus/sdk/services/timers` to better reflect the rest of th Globus ecosystem.

### Removal of `@globus/types`

1. Remove the `@globus/types` package from your project dependencies.
2. Address any import statements that reference `@globus/types`; These should be updated to import from `@globus/sdk` instead.

- If you were using the OpenAPI types from the `@globus/types` package, you can now import them directly from the `@globus/sdk` package.
- For all other types, they have been co-located with their respective modules; **The global **Globus** namespace should no longer be used.**

```diff
-import type { components, operations } from '@globus/types/compute';
import {type OpenAPI } from '@globus/sdk/services/compute';
// OpenAPI.components === components
// OpenAPI.operations === operations
```

```diff
-Globus.Transfer.EndpointDocument
import type { EndpointDocument } from '@globus/sdk/services/transfer/service/endpoint';
```

### `Timer` Service Renamed to `Timers`

The `@globus/sdk/services/timer` service has been renamed to `@globus/sdk/services/timers`. This change was made to align with the naming conventions used in the rest of the Globus ecosystem.

```diff
-import { timer } from '@globus/sdk';
+import { timers } from '@globus/sdk';
```

#### `create` Service Method

```
-import { timer } from '@globus/sdk';
-timer.create({ /* ... */ });
+import { timers } from '@globus/sdk';
+timers.timer.create({ /* ... */ });
```

## Migrating from `v4` to `v5`

### In-Memory Storage by Default

The `v5` release of `@globus/sdk` updates the `AuthorizationManager` to use an in-memory storage mechanism for tokens, moving the implementation to "secure by default".

The `v4` behavior of using `localStorage` as the storage mecanism is now opt-in and should only be enabled when following [security best practices related to Storage APIs](https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html#storage-apis).

To use a different storage mechanism, a well-known storage system (i.e., `localStorage`, `sessionStorage`) can be provided as the `storage` configuration option on creation.

```ts
authorization.create({
  // ...
  storage: localStorage,
});
```

Any implementation of [`Storage`](https://developer.mozilla.org/en-US/docs/Web/API/Storage) can be provided to use a custom storage mechanism.

```ts
class MyCustomStorage implements Storage {};

authorization.create({
  // ...
 storage: new MyCustomStorage();
});
```

### `TokenLookup` has been renamed to `TokenManager`

The `TokenLookup` class has been renamed to `TokenManager` to better reflect the available methods.

```diff
-import { TokenLookup } from '@globus/sdk/core/authorization/TokenLookup';
+import { TokenManager } from '@globus/sdk/core/authorization/TokenManager';
```

## Migrating from `v3` to `v4`

The `v4` release of `@globus/sdk` addresses a number of issues related to the CommonJS and ESM bundle exports. Prior to this relases, many environments **required** the use of the CommonJS bundle (even when ESM was supported).

In addition to bundle improvements, the `v4` release moves to using the native [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API) for cryptographic operations during the OAuth2 PKCE (when using the `AuthorizationManager`). Based on the async nature of the Web Crypto API, many methods of the `AuthorizationManager` now return Promises.

### Breaking Changes

#### Package Entry Points

The distributed `package.json` file has been overhauled to better align with the intended use of the package, and build and runtime environment expectations for sourcing modules.

From an implementation standpoint, this means you should no longer need to explicitly reference the `cjs` or `esm` directories in your path references.

```diff
-import { isConsentRequiredError } from "@globus/sdk/cjs/lib/core/errors";
+import { isConsentRequiredError } from "@globus/sdk/core/errors";
```

_NOTE: The change above also reflects the removal of the `lib` directory mentioned below._

#### `lib` Directory Removed

The `lib` directory has been removed and should no longer be used in path references.

```diff js
-import { endpointManager } from '@globus/sdk/esm/lib/services/transfer';
+import { endpointManager } from '@globus/sdk/services/transfer';
```

#### ESM

Explicit `@globus/sdk/cjs/*` references were being used to avoid issues with the ESM package (mainly incompatible exports). If your build environment does not require you to use CommonJS, most path references can be swapped with their ESM counterpart by removing `/cjs/lib`.

```diff js
-import { endpointManager } from '@globus/sdk/cjs/lib/services/transfer';
+import { endpointManager } from '@globus/sdk/services/transfer';
```

#### CommonJS

We are still committed to supporting CommonJS environments, but the number of entrypoints has been reduced. We believe this decision better reflects the intended usage of the CommonJS package and the fact the the entrypoints **will bundle all required code** to make the entrypoint viable – having deep entrypoints for individual service methods doesn't seem useful at this time.

```js
const sdk = require('@globus/sdk');
```

Or, explicity:

```js
const sdk = require('@globus/sdk/cjs');
```

#### `AuthorizationManager`

In order to support the use of the native [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API), many methods of the `AuthorizationManager` now return Promises, impacted methods include:

- `AuthorizationManager.login()`
- `AuthorizationManager.handleErrorResponse()`
- `AuthorizationManager.handleAuthorizationRequirementsError()`
- `AuthorizationManager.handleConsentRequiredError()`

See the [`AuthorizationManager` documentation](https://globus.github.io/globus-sdk-javascript/classes/Authorization.AuthorizationManager.html) for full details.
