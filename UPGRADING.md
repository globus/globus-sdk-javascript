# Upgrading

## Migrating from `v3` to `v4`

The `v4` release of `@globus/sdk` addresses a number of issues related to the CommonJS and ESM bundle exports. Prior to this relases, many environments **required** the use of the CommonJS bundle (even when ESM was supported).

In addition to bundle improvements, the `v4` release moves to using the native [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API) for cryptographic operations during the OAuth2 PKCE (when using the `AuthorizationManager`). Based on the async nature of the Web Crypto API, many methods of the `AuthorizationManager` now return Promises.

### Breaking Changes

#### ESM

`@globus/sdk/cjs/*` references were being used to avoid issues with the ESM package (mainly incompatible exports). If your build environment does not require you to use CommonJS, most path references can be swapped with their ESM counterpart by removing `/cjs/lib`.

```diff js
-import { endpointManager } from '@globus/sdk/cjs/lib/services/transfer';
+import { endpointManager } from '@globus/sdk/services/transfer';
```

References to `esm/lib` can also be removed in order to match the new `exports` paths.

```diff
-import type { CreatePayload } from '@globus/sdk/esm/lib/services/transfer/service/endpoint';
+import type { CreatePayload } from '@globus/sdk/services/transfer/service/endpoint';
```

#### CommonJS

We are still committed to supporting CommonJS environments, but the number of entrypoints has been reduced. We believe this decision better reflects the intended usage of the CommonJS package and the fact the the entrypoints **will bundle all required code** to make the entrypoint viable – having deep entrypoints for individual service methods doesn't seem useful at this time.

#### `AuthorizationManager`

In order to support the use of the native [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API), many methods of the `AuthorizationManager` now return Promises, impacted methods include:

- `AuthorizationManager.login()`
- `AuthorizationManager.handleErrorResponse()`
- `AuthorizationManager.handleAuthorizationRequirementsError()`
- `AuthorizationManager.handleConsentRequiredError()`

See the [`AuthorizationManager` documentation](https://globus.github.io/globus-sdk-javascript/classes/Authorization.AuthorizationManager.html) for full details.
