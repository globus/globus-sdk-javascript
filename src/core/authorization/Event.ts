/**
 * @todo It would be nice to not `| any` here, but ideally callers do not need to
 * fully type the payload to attach listeners.
 */
type ListenerCallback<P> = (payload?: P | any) => Promise<void> | void;

export class Event<EventName extends string, Payload extends unknown> {
  #callbacks: ListenerCallback<Payload>[] = [];

  constructor(readonly name: EventName) {}

  addListener(callback: ListenerCallback<Payload>) {
    this.#callbacks.push(callback);
    return () => this.removeListener(callback);
  }

  removeListener(callback: ListenerCallback<Payload>) {
    this.#callbacks = this.#callbacks.filter((cb) => cb !== callback);
  }

  clearListeners() {
    this.#callbacks = [];
  }

  async dispatch(payload?: Payload) {
    await Promise.all(this.#callbacks.map((callback) => callback(payload)));
  }
}
