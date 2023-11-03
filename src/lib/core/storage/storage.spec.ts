import type { StorageSystem } from "./index";

import storage, { __reset } from "./index";
import { MemoryStorage } from "./memory";
import { LocalStorage } from "./local-storage";

describe("storage", () => {
  afterEach(() => {
    __reset();
  });

  it("default storage interface (memory)", () => {
    expect(storage()).toBeInstanceOf(MemoryStorage);
  });

  it("can be configured using known interface", () => {
    expect(storage("localStorage")).toBeInstanceOf(LocalStorage);
  });

  it("can be provided a custom storage interface", () => {
    expect(storage(CustomStorage)).toBeInstanceOf(CustomStorage);
  });
});

class CustomStorage implements StorageSystem {
  get(key: string) {}
  set(key: string, value: any): void {}
  remove(key: string): void {}
  clear(): void {}
}
