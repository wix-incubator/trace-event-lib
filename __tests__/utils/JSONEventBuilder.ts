import { AutocompletedEventFields, Event, AbstractEventBuilder } from '../../src';

export class JSONEventBuilder extends AbstractEventBuilder {
  private readonly _events: unknown[] = [];

  public get events(): unknown[] {
    return this._events;
  }

  protected send<T extends Event>(event: T): void {
    this._events.push(event);
  }

  protected defaults<T extends Partial<Event>>(event: T): T & AutocompletedEventFields {
    const { pid = 1 } = event;
    return super.defaults({ ...event, pid });
  }
}
