import { createStorage } from "../../../core/storage";
import { storageGateways } from "..";

import type { MirroredRequest } from "../../../../../mocks/handlers";

const GCS_HOST = "https://fa5e.bd7c.data.globus.org";

describe("gcs – storageGateways", () => {
  createStorage("memory");

  test("getAll", async () => {
    const result = await storageGateways.getAll(
      {
        host: GCS_HOST,
        endpoint_id: "ac9cb54b-fc48-4824-b801-1388baf0a909",
      },
      {
        query: { include: ["accounts", "private_policies"] },
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
        "url": "https://fa5e.bd7c.data.globus.org/api/storage_gateways?include=accounts%2Cprivate_policies",
      }
    `);
  });

  test("get", async () => {
    const result = await storageGateways.get(
      {
        host: GCS_HOST,
        endpoint_id: "ac9cb54b-fc48-4824-b801-1388baf0a909",
      },
      "some-uuid"
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
        "url": "https://fa5e.bd7c.data.globus.org/api/storage_gateways/some-uuid",
      }
    `);
  });
});
