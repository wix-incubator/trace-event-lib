jest.useFakeTimers();

import { toMatchImageSnapshot } from 'jest-image-snapshot';
import { SnapshotExtractor } from './utils/SnapshotExtractor';
import { JSONEventBuilder } from './utils/JSONEventBuilder';
import { Screenshotter } from './utils/Screenshotter';

export let trace: JSONEventBuilder;
export let screenshotter: Screenshotter;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toMatchImageSnapshot(): R;
    }
  }
}

expect.extend({ toMatchImageSnapshot });

beforeAll(async () => {
  screenshotter = new Screenshotter();
  await screenshotter.init();
});

beforeEach(() => {
  jest.useFakeTimers();
  trace = new JSONEventBuilder();
});

afterEach(async () => {
  expect(trace.events).toMatchSnapshot();
  jest.useRealTimers();

  const json = await SnapshotExtractor.save(trace.events);
  expect(await screenshotter.screenshot(json)).toMatchImageSnapshot();
});

afterAll(async () => {
  await screenshotter.cleanup();
});
