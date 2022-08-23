import { CompleteEvent, DurationBeginEvent, DurationEndEvent, InstantEvent } from '../schema';

import { Simplified } from '../builder/misc';
import { AbstractEventBuilder } from '../builder';
import { Optionalized } from './misc';

export class DurationEventHandle {
  constructor(
    private _builder: AbstractEventBuilder,
    private _beginPayload: Simplified<DurationBeginEvent>,
  ) {}

  begin(payload?: Optionalized<DurationBeginEvent>): DurationEventHandle {
    return this._builder.begin({
      ...this._beginPayload,
      ...payload,
    });
  }

  instant(payload: Optionalized<InstantEvent>): this {
    this._builder.instant({
      cat: this._beginPayload.cat,
      pid: this._beginPayload.pid,
      tid: this._beginPayload.tid,
      ...payload,
    });

    return this;
  }

  end(payload?: Optionalized<DurationEndEvent>): this {
    this._builder.end({
      pid: this._beginPayload.pid,
      tid: this._beginPayload.tid,
      ...payload,
    });

    return this;
  }

  complete(payload: Optionalized<CompleteEvent>): this {
    this._builder.complete({
      cat: this._beginPayload.cat,
      pid: this._beginPayload.pid,
      tid: this._beginPayload.tid,

      ...payload,
    });

    return this;
  }
}
