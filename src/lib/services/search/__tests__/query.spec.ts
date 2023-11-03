import { createStorage } from "../../../../lib/core/storage";
import { query } from "..";

import type { MirroredRequest } from "../../../../../mocks/handlers";

describe("search – query", () => {
  test("get", async () => {
    createStorage("memory");
    const result = await query.get("524de2f6-d1a6-4b49-9286-d8dccb4196ae", {
      query: {
        q: "test",
      },
    });
    const {
      req: { url, method, headers },
    } = (await result.json()) as MirroredRequest;
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
          "host": "search.api.globus.org",
          "user-agent": "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
        },
        "method": "GET",
        "url": "https://search.api.globus.org/v1/index/524de2f6-d1a6-4b49-9286-d8dccb4196ae/search?q=test",
      }
    `);
  });
  test("post", async () => {
    createStorage("memory");
    const result = await query.post("524de2f6-d1a6-4b49-9286-d8dccb4196ae", {
      payload: { q: "test" },
    });
    const {
      req: { url, method, headers, json },
    } = (await result.json()) as unknown as MirroredRequest;
    expect({
      url,
      method,
      headers,
      json
    }).toMatchInlineSnapshot(`
      {
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip,deflate",
          "connection": "close",
          "content-length": "12",
          "content-type": "application/json",
          "host": "search.api.globus.org",
          "user-agent": "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
        },
        "json": {
          "q": "test",
        },
        "method": "POST",
        "url": "https://search.api.globus.org/v1/index/524de2f6-d1a6-4b49-9286-d8dccb4196ae/search",
      }
    `);
  });
});
