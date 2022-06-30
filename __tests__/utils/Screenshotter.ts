import { launch, Browser } from 'puppeteer';

export class Screenshotter {
  public browser?: Browser;

  async init() {
    this.browser = await launch();
  }

  async screenshot(traceJsonFile: string) {
    if (!this.browser) {
      throw new Error('Please launch the Puppeteer before you go to take screenshots!');
    }

    const page = await this.browser.newPage();

    try {
      await page.setViewport({ width: 920, height: 500 });
      await page.goto(`chrome://tracing`);
      const [fileChooser] = await Promise.all([
        page.waitForFileChooser(),
        page.click('#load-button'),
      ]);

      await fileChooser.accept([traceJsonFile]);
      await page.waitForSelector('.overlay', { hidden: true });
      await page.waitForSelector('#hint_text', { hidden: true });
      await page.waitForTimeout(500);
      const image = await page.screenshot();

      return image;
    } finally {
      await page.close();
    }
  }

  async cleanup() {
    await this.browser?.close();
  }
}
