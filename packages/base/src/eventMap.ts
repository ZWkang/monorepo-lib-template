type EventRecord = Record<string, Fn[]>;

type Fn = (...args: any[]) => void;
type ListFunctionParameters<T extends Fn[]> = Parameters<T[number]>;

type EventHandlers = EventRecord & {
  '*': Fn[];
};

const baseHandler: EventHandlers = {
  '*': [],
};

export class EventHandler<T extends EventHandlers = EventHandlers> {
  private _handlers: T;

  public constructor(handlers: T) {
    this._handlers = { ...baseHandler, ...handlers };
  }

  public on<EventName extends keyof T>(event: EventName, handler: T[EventName][number]): void {
    if (!this._handlers[event]) {
      this._handlers[event] = [] as unknown as T[EventName];
    }
    this._handlers[event].push(handler);
    return;
  }

  public off<EventName extends keyof T>(event: EventName, handler?: T[EventName][number]): void {
    if (!this._handlers[event]) {
      return;
    }

    if (!handler) {
      this._handlers[event] = [] as unknown as T[EventName];
      return;
    }

    const index = this._handlers[event].indexOf(handler);
    if (index !== -1) {
      this._handlers[event].splice(index, 1);
      return;
    }
  }

  public emit<EventName extends keyof T>(event: EventName, ...args: ListFunctionParameters<T[EventName]>): void {
    const handlers = this._handlers[event];
    const allHandlers = this._handlers['*'];

    if (handlers) {
      handlers.forEach((handler) => handler?.(...args));
    }

    if (allHandlers) {
      allHandlers.forEach((handler) => handler?.(...args));
    }
  }

  public destroy(): void {
    Object.keys(this._handlers).forEach((key) => {
      delete this._handlers[key];
    });

    this._handlers['*'] = [];
  }
}
