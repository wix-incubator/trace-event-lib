import { AsyncEndEvent, AsyncInstantEvent, AsyncStartEvent } from '../schema';

import { Simplified } from '../builder/misc';
import { AbstractEventBuilder } from '../builder';
import { Optionalized } from './misc';

export class AsyncEventHandle {
  constructor(
    private _builder: AbstractEventBuilder,
    private _beginPayload: Simplified<AsyncStartEvent>,
  ) {}

  begin(payload?: Optionalized<AsyncStartEvent>): AsyncEventHandle {
    return this._builder.beginAsync({
      ...this._beginPayload,
      ...payload,
    });
  }

  instant(payload: Optionalized<AsyncInstantEvent>): this {
    this._builder.instantAsync({
      cat: this._beginPayload.cat,
      pid: this._beginPayload.pid,
      tid: this._beginPayload.tid,
      id: this._beginPayload.id,
      id2: this._beginPayload.id2,
      scope: this._beginPayload.scope,

      ...payload,
    });

    return this;
  }

  end(payload?: Optionalized<AsyncEndEvent>): this {
    this._builder.endAsync({
      cat: this._beginPayload.cat,
      pid: this._beginPayload.pid,
      tid: this._beginPayload.tid,
      id: this._beginPayload.id,
      id2: this._beginPayload.id2,
      name: this._beginPayload.name,
      scope: this._beginPayload.scope,

      ...payload,
    });

    return this;
  }
}
