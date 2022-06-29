import * as path from 'path';

import type { Circus } from '@jest/types';
import type { JestEnvironmentConfig, EnvironmentContext } from '@jest/environment';
import NodeEnvironment from 'jest-environment-node';

declare module '@jest/types' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Global {
    interface Global {
      __testfile: string;
      __testname: string;
    }
  }
}

export default class TestEnvironment extends NodeEnvironment {
  constructor(config: JestEnvironmentConfig, context: EnvironmentContext) {
    super(config, context);

    this.global.__testfile = path.basename(context.testPath);
    this.global.__testname = '';
  }

  handleTestEvent(event: Circus.Event) {
    if (event.name === 'test_start') {
      this.global.__testname = event.test.name;
    }
  }
}
