import { timer } from "../index";
import type { MirroredRequest } from "../__mocks__/handlers";

describe("sdk-options", () => {
  test("environment", async () => {
    const payload = {
      timer: {
        schedule: {
          type: "once" as const,
        },
        timer_type: "transfer" as const,
        body: {
          source_endpoint: "endpoint-1",
          destination_endpoint: "endpoint-2",
          DATA_TYPE: "transfer" as const,
          DATA: [],
        },
      },
    };

    const withEnvironment = await timer.create(
      {
        headers: {
          Authorization: "Bearer example",
        },
        payload,
      },
      {
        environment: "sandbox",
      }
    );

    const {
      req: { headers: withEnvironmentHeaders },
    } = (await withEnvironment.json()) as MirroredRequest;

    expect(withEnvironmentHeaders["host"]).toEqual(
      "sandbox.timer.automate.globus.org"
    );

    const withoutEnvironment = await timer.create({
      headers: {
        Authorization: "Bearer example",
      },
      payload,
    });

    const {
      req: { headers: withoutEnvironmentHeaders },
    } = (await withoutEnvironment.json()) as MirroredRequest;

    expect(withoutEnvironmentHeaders["host"]).toEqual(
      "timer.automate.globus.org"
    );
  });
});
