const { toMatchImageSnapshot } = require('jest-image-snapshot');
expect.extend({ toMatchImageSnapshot });

const URL = 'http://localhost:3001';

describe('Pages', () => {
  let newPage;
  beforeEach(async () => {
    newPage = await browser.newPage();
  });
  afterEach(async () => {
    await newPage.close();
  });

  describe('Landing page', () => {
    test('open page', async () => {
      await newPage.goto(URL);
      expect(await newPage.screenshot()).toMatchImageSnapshot({
        customSnapshotIdentifier: 'page-landing'
      });
    });
    test('go to host', async () => {
      await newPage.goto(URL);
      await Promise.all([newPage.waitForNavigation(), newPage.click('#host')]);
      expect(newPage.url()).toMatch(/host/);
    });
    test('go to play', async () => {
      await newPage.goto(URL);
      await Promise.all([
        newPage.waitForNavigation(),
        newPage.click('#player')
      ]);
      expect(newPage.url()).toMatch(/player/);
    });
  });

  describe('Host', () => {
    test('open page', async () => {
      await newPage.goto(`${URL}/#/host`);
      await newPage.waitForSelector('#gameId');
      await newPage.evaluate(() => {
        const dom = document.querySelector('#gameId');
        dom.innerHTML = 'test';
      });
      expect(await newPage.screenshot()).toMatchImageSnapshot({
        customSnapshotIdentifier: 'page-host'
      });
    });
  });

  describe('Player', () => {
    test('open page', async () => {
      await newPage.goto(`${URL}/#/player`);
      await newPage.waitForSelector('#gameId');
      expect(await newPage.screenshot()).toMatchImageSnapshot({
        customSnapshotIdentifier: 'page-player'
      });
    });
  });
});
