type Callback<T> = (payload: unknown, event: T) => Promise<void> | void;

export class Event<EventName extends string, Payload extends unknown> {
  #callbacks: Callback<EventName>[] = [];

  public constructor(protected readonly name: EventName) {}

  addListener(callback: Callback<EventName>) {
    this.#callbacks.push(callback);
    return () => this.removeListener(callback);
  }

  removeListener(callback: Callback<EventName>) {
    this.#callbacks = this.#callbacks.filter((cb) => cb !== callback);
  }

  async dispatch(payload?: Payload) {
    await Promise.all(this.#callbacks.map((callback) => callback(payload, this.name)));
  }
}
