import { Event } from '../schema';
import { Completable } from './misc';

export class EventHandle<E extends Event> {
  constructor(
    protected readonly endCallback: (event: Completable<E>) => void,
    protected readonly payload: Completable<E>,
  ) {}

  end(extra?: Partial<E>) {
    this.endCallback({ ...this.payload, ...extra });
  }
}
