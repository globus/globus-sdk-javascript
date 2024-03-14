# Authorization

## Architecture

The general approach and architecture of our authorization utility is derived from [oidc-client-ts](https://github.com/authts/oidc-client-ts). The main difference is that our implementation is tightly coupled to the [Globus Auth implementation of OAuth and OIDC](https://docs.globus.org/api/auth/developer-guide/). The most notable differences are:

- Globus Auth is the authority for _many_ services (and tokens), so most OIDC client libraries will not work out of the box.
  Additionally, non-standard properties (e.g., ` other_tokens`, `resource_server`) in token responses require custom handling.
- Domain-specific error handling (i.e., "High Assurance")

## Key Concepts

### Authorizatoin Manager (`index.ts`)

The `AuthorizationManager` class is responsible for managing the authorization process for an application.

### Events

The `AuthorizationManager` emits events to notify the application of changes in the authorization state. The application can listen to these events and respond accordingly.

### Storage

Where the `AuthorizationManager` stores tokens and other authorization data. The SDK provides an in-memory storage implementation and `localStorage`. Should a user want to use a different storage mechanism, they can implement the `Storage` interface – this should allow use of our authorization utility in most runtimes (e.g. Node.js, Browser, etc.).

### Transport (i.e. `RedirectTransport.ts`)

A "transport" is the actual mechanism the application will use to complete an authorization flow (grant). At the moment,
the only supported transport is the `RedirectTransport`, which will redirect the user's browser to Globus Auth using [PKCE](https://oauth.net/2/pkce/).

The abstraction exists to support additional transports in the future, i.e., `PopupTransport,` `ServiceWorkerTransport,` etc.

### Token Lookup

An instance of `TokenLookup` is used to retrieve tokens from the token store. The token store is an instance of `Storage` (e.g., `localStorage`). An instance of `TokenLookup` is made available on the `AuthorizationManager.tokens`.

## Implementation Notes

- Tokens are stored as `${client_id}:${resource_server}` keys in the token store. This allows multiple `AuthorizationManager` instances to be used in the same application without conflict (multiple `client_id`s).
