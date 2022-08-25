import { trace } from './setup-snapshot-testing';

test('async events', async () => {
  const launchEvent1 = {
    cat: 'app',
    id: 0,
    name: 'launch app [com.example.App1]',
    ts: 0,
  };

  trace.beginAsync({ ...launchEvent1 });
  trace.beginAsync({ ...launchEvent1, name: 'install app' });
  trace.endAsync({ ...launchEvent1, name: 'install app', ts: 8e6 });
  trace.endAsync({ ...launchEvent1, ts: 10e6 });

  const launchEvent2 = {
    cat: 'app',
    id: 1,
    name: 'launch app [com.example.App2]',
    ts: 2e6,
  };

  trace.beginAsync({ ...launchEvent2 });
  trace.beginAsync({ ...launchEvent2, name: 'install app' });
  trace.endAsync({ ...launchEvent2, name: 'install app', ts: 8e6 });
  trace.endAsync({ ...launchEvent2, ts: 12e6 });
});
