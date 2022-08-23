import hrtime from 'browser-process-hrtime';

import { Event } from '../schema';

export type RealtimeKeys = 'ts' | 'pid' | 'tid';
export type RealtimeKeysAndPhase = RealtimeKeys | 'ph';

export type OmitOptionally<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type Completable<T extends Event> = OmitOptionally<T, RealtimeKeys>;
export type Simplified<T extends Event> = OmitOptionally<T, RealtimeKeysAndPhase>;

/**
 * @param {number} ns - nanoseconds
 * @returns {number} microseconds
 */
export function ns2ms(ns: number): number {
  return Math.round(ns * 1e-3);
}

/**
 * @param {number} s - seconds
 * @returns {number} microseconds
 */
export function s2ms(s: number): number {
  return s * 1e6;
}

/**
 * @returns {number} current time in microseconds
 */
export function now(): number {
  const [seconds, nanoseconds] = hrtime();
  return s2ms(seconds) + ns2ms(nanoseconds);
}

declare let process: { pid?: number } | undefined;

/**
 * Simplistic cross-browser'ish get PID implementation
 *
 * @returns {number} PID or 1 (stub)
 */
export function getProcessId(): number {
  if (typeof process === 'object' && typeof process.pid === 'number') {
    return process.pid;
  }

  return 1;
}

export type AutocompletedEventFields = Pick<Event, 'ts' | 'pid' | 'tid'>;
