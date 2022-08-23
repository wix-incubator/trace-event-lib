import { OmitOptionally, RealtimeKeysAndPhase } from '../builder/misc';
import { Event } from '../schema';

export type RealtimeKeysPhaseAndCategory = RealtimeKeysAndPhase | 'cat';

export type Optionalized<T extends Event> = OmitOptionally<T, RealtimeKeysPhaseAndCategory>;
