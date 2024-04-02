import { Event } from '../authorization/Event';

describe('Event', () => {
  it('should dispatch an event to all listeners', async () => {
    const event = new Event('test');
    const listener1 = jest.fn();
    const listener2 = jest.fn();
    event.addListener(listener1);
    event.addListener(listener2);

    await event.dispatch();

    expect(listener1).toHaveBeenCalled();
    expect(listener2).toHaveBeenCalled();
  });

  it('dispatch with payload', async () => {
    const event = new Event('payload');
    const cb = jest.fn();
    event.addListener(cb);
    await event.dispatch({ foo: 'bar' });
    expect(cb).toHaveBeenCalled();
    expect(cb).toHaveBeenCalledWith({ foo: 'bar' });
  });

  it('dispatch without payload (event name only)', async () => {
    const event = new Event('name-only');
    const cb = jest.fn();
    event.addListener(cb);
    await event.dispatch();
    expect(cb).toHaveBeenCalledWith(undefined);
  });

  it('removing listeners', async () => {
    const event = new Event('test');
    const listener1 = jest.fn();
    const listener2 = jest.fn();
    event.addListener(listener1);

    /**
     * Ensure that the `addListener` method returns a function that can be used to remove the listener.
     */
    const removeListener = event.addListener(listener2);
    removeListener();

    await event.dispatch();

    expect(listener1).toHaveBeenCalled();
    expect(listener2).not.toHaveBeenCalled();
    /**
     * Ensure that the `removeListener` method can be used to remove a listener.
     */
    event.removeListener(listener1);
    await event.dispatch();
    expect(listener1).toHaveBeenCalledTimes(1);
  });

  it('clears all listeners', async () => {
    const event = new Event('test');
    const listener1 = jest.fn();
    const listener2 = jest.fn();
    event.addListener(listener1);
    event.addListener(listener2);

    await event.dispatch();
    event.clearListeners();
    await event.dispatch();

    expect(listener1).toHaveBeenCalledTimes(1);
    expect(listener2).toHaveBeenCalledTimes(1);
  });
});
