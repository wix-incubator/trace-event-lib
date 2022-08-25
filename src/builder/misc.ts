import hrtime from 'browser-process-hrtime';

import { Event } from '../schema';

declare const process: { pid?: number } | undefined;

export type RealtimeKeys = 'ts' | 'pid' | 'tid';
export type RealtimeKeysAndPhase = RealtimeKeys | 'ph';

export type OmitOptionally<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type Completable<T extends Event> = OmitOptionally<T, RealtimeKeys>;
export type Simplified<T extends Event> = OmitOptionally<T, RealtimeKeysAndPhase>;
export type AutocompletedEventFields = Pick<Event, RealtimeKeys>;

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

/**
 * @returns {number} current time in microseconds
 */
export function now(): number {
  if (Number.isNaN(HRTIME_ZERO)) {
    HRTIME_ZERO = Date.now() - Math.round(hrtime2ms());
  }

  return HRTIME_ZERO + Math.round(hrtime2ms() * 1e3);
}

/** Starting point to align the human world time and OS-specific high-resolution time. */
let HRTIME_ZERO = Number.NaN;

/** Returns high-resolution time in milliseconds. */
function hrtime2ms() {
  const [seconds, nanoseconds] = hrtime();
  return s2ms(seconds) + ns2ms(nanoseconds);
}

/**
 * @param {number} s - seconds
 * @returns {number} microseconds
 */
function s2ms(s: number): number {
  return s * 1e6;
}

/**
 * @param {number} ns - nanoseconds
 * @returns {number} milliseconds
 */
function ns2ms(ns: number): number {
  return Math.round(ns * 1e-6);
}
