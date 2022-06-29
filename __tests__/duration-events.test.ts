import { trace } from './setup-snapshot-testing';

test('single process', async () => {
  // Instant event
  trace.instant({ cat: 'config', name: 'Resolve config', ts: 0, args: { testTimeout: 60_000 } });

  // Duration events: separate calls
  trace.begin({ cat: 'device', name: 'Boot a device', ts: 0 });
  trace.end({ ts: 1e6 });

  // Duration events: chainable call
  trace.begin({ cat: 'test', name: 'Run a test suite', ts: 1e6 }).end({ ts: 1e7 });

  // Complete event
  trace.complete({ cat: 'device', name: 'Shutdown the device', ts: 1e7, dur: 3e6 });
});

test('multiple processes', async () => {
  // Metadata events: process_name - simplified
  trace.process_name('cli', 1);
  // Metadata events: process_name - explicit
  trace.metadata({ pid: 2, name: 'process_name', args: { name: 'jest' } });

  // Process 1
  trace.complete({ cat: 'spawn', name: 'jest --runInBand', ts: 0, dur: 2.5e6 });
  // Process 2
  trace.complete({ pid: 2, cat: 'run', name: '01.test.js', ts: 0.25e6, dur: 1e6 });
  trace.complete({ pid: 2, cat: 'run', name: '02.test.js', ts: 1.25e6, dur: 1e6 });
});

test('multiple threads', async () => {
  // Simple thread (1)
  trace.begin({ tid: 1, cat: 'device', name: 'boot', ts: 0 }).end({ ts: 1e6 });
  trace.complete({ tid: 1, cat: 'device', name: 'install app', ts: 1.25e6, dur: 0.75e6 });
  trace.complete({ tid: 1, cat: 'device', name: 'launch app', ts: 4e6, dur: 0.25e6 });

  // Stacked thread (0)
  trace.begin({
    tid: 0,
    cat: 'lifecycle',
    name: 'Dashboard - should have a currency widget',
    ts: 3e6,
  });
  trace.begin({ tid: 0, cat: 'lifecycle', name: 'beforeEach', ts: 4e6 }).end({ ts: 5e6 });
  trace.begin({ tid: 0, cat: 'lifecycle', name: 'testFn', ts: 6e6 }).end({ ts: 8e6 });
  trace.begin({ tid: 0, cat: 'lifecycle', name: 'afterEach', ts: 9e6 }).end({ ts: 10e6 });
  trace.end({ tid: 0, ts: 11e6 });

  // Metadata events: thread_name - explicit
  trace.metadata({ tid: 0, name: 'thread_name', args: { name: 'Test lifecycle' } });
  // Metadata events: thread_name - implicit
  trace.thread_name('Device', 1);

  // Metadata events: thread_sort_index - explicit
  trace.metadata({ tid: 0, name: 'thread_sort_index', args: { sort_index: 2 } });
  // Metadata events: thread_sort_index - implicit
  trace.thread_sort_index(1, 1);
});
