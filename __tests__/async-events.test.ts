import { trace } from './setup-snapshot-testing';

test('async events', async () => {
  const launchEvent1 = trace.beginAsync({
    cat: 'app',
    id: 0,
    name: 'launch app [com.example.App1]',
    ts: 0,
  });

  trace.beginAsync({ cat: 'app', id: 0, name: 'install app', ts: 0 }).end({ ts: 8e6 });
  launchEvent1.end({ ts: 10e6 });

  const launchEvent2 = trace.beginAsync({
    cat: 'app',
    id: 1,
    name: 'launch app [com.example.App2]',
    ts: 2e6,
  });

  trace.beginAsync({ cat: 'app', id: 1, name: 'install app', ts: 2e6 }).end({ ts: 8e6 });
  launchEvent2.end({ ts: 12e6 });
});
