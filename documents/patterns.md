---
title: Patterns and Key Concepts
group: Documents
---

# Patterns and Key Concepts

- All service methods return a `Promise` that resolves to a [Fetch API Response object](https://developer.mozilla.org/en-US/docs/Web/API/Response).
  - Under the hood, we are returning the result of a composed [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/fetch).
- All service methods accept a `ServiceMethodOptions` object to pass query parameters, a payload, and headers.
- All service methods support a tail argument to pass options to the SDK, including the composed `fetch` call.

## Service Method Names

Basic CRUD operations provided by services are exposed as the following:
| Service Method Name | HTTP Method | Description | Example |
| --------------------| ----------- | ---------------------------- | ------- |
| `get` | `GET` | Fetch a single resource. | `transfer.endpoint.get()` |
| `getAll` | `GET` | Fetch a list of resources. | `flows.flows.getAll()` |
| `create` | `POST` | Create a new resource. | `gcs.roles.create()` |
| `update` | `PUT` | Update an existing resource. | `gcs.endpoint.update()` |
| `patch` | `PATCH` | Update an existing resource. | `gcs.endpoint.patch()` |
| `remove` | `DELETE` | Delete an existing resource. | `gcs.collections.remove()`|

Methods that do not map to obvious CRUD operations are named according to the resource. i.e., `groups.groups.getMyGroups()`, `transfer.endpointSearch()`, `search.query.post()`

```ts
// @example Using the SDK to search for endpoints via Transfer API.

import { transfer } from "@globus/sdk";
const result = await (
  await globus.transfer.endpointSearch(
    {
       query: { filter_fulltext: "Globus Tutorial" }
       headers: {
         Authorization: "Bearer MY_ACCESS_TOKEN",
       },
    },
    {
      fetch: {
        // Provide parameters to the underlying `fetch` call.
        // https://developer.mozilla.org/en-US/docs/Web/API/fetch#parameters
        options: {
          priority: "high"
        },
      },
    }
  )
).json();
```

```ts
// @example Using the SDK to fetch a single flow from the Flows API.
import { flows } from '@globus/sdk';
const result = await (await flows.flows.get('452bbea3-5e3b-45a5-af08-50179839a4e8')).json();
```

### Authorization

While all methods support passing of `headers` and direct modification of the underlying `fetch` call, the SDK provides an {@link Authorization.AuthorizationManager | `AuthorizationManager`} that can be used to manage access tokens and handle the authorization process.

```ts
// @example Using the AuthorizationManager with a service method.
import { transfer, authorization } from "@globus/sdk";
const manager = authorization.create({ ... });
const result = await (
  await globus.transfer.endpointSearch(
    {
       query: { filter_fulltext: "Globus Tutorial" },
       manager
    }
  )
).json();
```

## Service Version Support

Some Globus services expose multiple API generations. The SDK surfaces these under a version namespace on the service object (e.g, `transfer.v2`).

```ts
import { transfer } from '@globus/sdk';

await transfer.v2.bookmarks.getAll();
await transfer.v2.bookmarks.get({ bookmark_id: '...' });
await transfer.v2.bookmarks.create({ request: { data: { name, endpoint_id, path } } });
await transfer.v2.bookmarks.update({ bookmark_id: '...', request: { data: { name } } });
await transfer.v2.bookmarks.remove({ bookmark_id: '...' });

// Service-specific imports are also available.
import { bookmarks } from '@globus/sdk/tranfer/v2';
import { getAll } from '@globus/sdk/tranfer/v2/bookmarks';
```

As of `v6.x.x` the methods on the default namespace _may_ access mixed version usage (service and resource dependent).
This default namespace will likely be removed, or more formally aliased to the "latest" version of a service resource in an upcoming major release (breaking change).
