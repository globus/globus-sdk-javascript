import { createStorage } from "../../../core/storage";
import { getClient } from "../client";

import type { MirroredRequest } from "../../../../__mocks__/handlers";

const GCS_CONFIGURATION = {
  host: "https://fa5e.bd7c.data.globus.org",
  endpoint_id: "ac9cb54b-fc48-4824-b801-1388baf0a909",
};

describe("gcs – client", () => {
  test("can be created WITHOUT storage", async () => {
    const client = getClient(GCS_CONFIGURATION);

    const result = await client.endpoint.get(undefined, {
      fetch: {
        options: {
          headers: {
            Authorization: `Bearer SOME_TOKEN`,
          },
        },
      },
    });
    const {
      req: { url, method, headers },
    } = (await result.json()) as unknown as MirroredRequest;

    expect({
      url,
      method,
      headers,
    }).toMatchInlineSnapshot(`
      {
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip,deflate",
          "authorization": "Bearer SOME_TOKEN",
          "connection": "close",
          "host": "fa5e.bd7c.data.globus.org",
          "user-agent": "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
        },
        "method": "GET",
        "url": "https://fa5e.bd7c.data.globus.org/api/endpoint",
      }
    `);

    const result2 = await client.collections.get(
      "a-b-c-d",
      {
        query: {
          include: ["private_policies"],
        },
      },
      {
        fetch: {
          options: {
            headers: {
              Authorization: `Bearer SOME_OTHER_TOKEN`,
            },
          },
        },
      }
    );

    const {
      req: { url: url2, method: method2, headers: headers2 },
    } = (await result2.json()) as unknown as MirroredRequest;

    expect({
      url: url2,
      method: method2,
      headers: headers2,
    }).toMatchInlineSnapshot(`
      {
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip,deflate",
          "authorization": "Bearer SOME_OTHER_TOKEN",
          "connection": "close",
          "host": "fa5e.bd7c.data.globus.org",
          "user-agent": "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
        },
        "method": "GET",
        "url": "https://fa5e.bd7c.data.globus.org/api/collections/a-b-c-d?include=private_policies",
      }
    `);
  });

  test("obtain client and call endpoint.get", async () => {
    createStorage("memory");
    const client = getClient(GCS_CONFIGURATION);
    const result = await client.endpoint.get();
    const {
      req: { url, method, headers },
    } = (await result.json()) as unknown as MirroredRequest;
    expect({
      url,
      method,
      headers,
    }).toMatchInlineSnapshot(`
      {
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip,deflate",
          "connection": "close",
          "host": "fa5e.bd7c.data.globus.org",
          "user-agent": "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
        },
        "method": "GET",
        "url": "https://fa5e.bd7c.data.globus.org/api/endpoint",
      }
    `);
  });

  test("obtain client and call collections.get", async () => {
    createStorage("memory");
    const client = getClient(GCS_CONFIGURATION);
    const result = await client.collections.get(
      "5e70cb38-90b4-4939-b5b7-2f502363004bs",
      {
        query: {
          include: ["private_policies"],
        },
      }
    );
    const {
      req: { url, method, headers },
    } = (await result.json()) as unknown as MirroredRequest;
    expect({
      url,
      method,
      headers,
    }).toMatchInlineSnapshot(`
      {
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip,deflate",
          "connection": "close",
          "host": "fa5e.bd7c.data.globus.org",
          "user-agent": "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
        },
        "method": "GET",
        "url": "https://fa5e.bd7c.data.globus.org/api/collections/5e70cb38-90b4-4939-b5b7-2f502363004bs?include=private_policies",
      }
    `);
  });
});
