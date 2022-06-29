import { Event } from '../schema';
import { Completable } from './misc';

export class EventHandle<T extends Event> {
  constructor(
    protected readonly callback: (event: Completable<T>) => void,
    protected readonly payload: Completable<T>,
  ) {}

  end(extra?: Partial<T>) {
    this.callback({ ...this.payload, ...extra });
  }
}
