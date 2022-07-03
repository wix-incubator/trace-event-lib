import { Event } from '../schema';
import { Completable } from './misc';
import { EndHandle } from './EndHandle';

export class EventHandle<T extends Event> implements EndHandle<Completable<T>> {
  constructor(
    protected readonly callback: (event: Completable<T>) => void,
    protected readonly payload: Completable<T>,
  ) {}

  end(extra?: Partial<T>) {
    this.callback({ ...this.payload, ...extra });
  }
}
