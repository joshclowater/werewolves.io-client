const puppeteer = require('puppeteer');
const { toMatchImageSnapshot } = require('jest-image-snapshot');
expect.extend({ toMatchImageSnapshot });

const URL = 'http://localhost:3001';

const sleep = timeout => new Promise(r => setTimeout(r, timeout));

describe('Landing page', () => {
  test('open page', async () => {
    await page.goto(URL);
    expect(await page.screenshot()).toMatchImageSnapshot({
      customSnapshotIdentifier: 'page-landing'
    });
  });
  test('go to host', async () => {
    await page.goto(URL);
    await Promise.all([page.waitForNavigation(), page.click('#host')]);
    expect(page.url()).toMatch(/host/);
  });
  test('go to play', async () => {
    await page.goto(URL);
    await Promise.all([page.waitForNavigation(), page.click('#player')]);
    expect(page.url()).toMatch(/player/);
  });
});

describe('Host', () => {
  test('open page', async () => {
    await page.goto(`${URL}/host`);
    await page.waitForSelector('#gameId');
    await page.evaluate(() => {
      const dom = document.querySelector('#gameId');
      dom.innerHTML = 'test';
    });
    expect(await page.screenshot()).toMatchImageSnapshot({
      customSnapshotIdentifier: 'page-host'
    });
  });
});

describe('Player', () => {
  test('open page', async () => {
    await page.goto(`${URL}/player`);
    expect(await page.screenshot()).toMatchImageSnapshot({
      customSnapshotIdentifier: 'page-player'
    });
  });
});

let headless;
let browser;
describe('Game', () => {
  beforeEach(async () => {
    headless = false; // can set to false for debugging
    browser = await puppeteer.launch({ headless });
  });
  afterEach(() => {
    browser.close();
  });

  test('works', async () => {
    // Open tabs for host and players
    const host = await browser.newPage();
    const players = [];
    players.push(await browser.newPage());
    players.push(await browser.newPage());
    players.push(await browser.newPage());
    players.push(await browser.newPage());

    // Open host page and get game id
    await host.goto(`${URL}/host`);
    const gameId = await host.evaluate(
      element => element.textContent,
      await host.waitForSelector('#gameId')
    );
    expect(gameId.length).toBe(5);

    // Add each player to the game
    for await (const [index, player] of players.entries()) {
      await player.bringToFront();
      await player.goto(`${URL}/player`);
      await player.waitForSelector('#gameId');
      await player.focus('#gameId');
      await player.keyboard.type(gameId);
      await player.focus('#name');
      await player.keyboard.type(`player${index}`);
      await player.click('#joinGame');
      await player.waitForSelector('#connected');
      if (headless && index === 0) {
        expect(await player.screenshot()).toMatchImageSnapshot({
          customSnapshotIdentifier: 'game-1-player-connected-to-game'
        });
      }
    }

    // Validate players have been added on host and start game
    await host.bringToFront();
    const playersText = await host.evaluate(
      element => element.textContent,
      await host.waitForSelector('#players')
    );
    expect(playersText).toMatch(/player0/);
    expect(playersText).toMatch(/player1/);
    expect(playersText).toMatch(/player2/);
    expect(playersText).toMatch(/player3/);
    await host.click('#startGame');
    if (headless) {
      expect(await host.screenshot()).toMatchImageSnapshot({
        customSnapshotIdentifier: 'game-2-host-started-game'
      });
    }

    // Validate werewolf and villager roles
    const werewolves = [];
    const villagers = [];
    for await (const [index, player] of players.entries()) {
      await player.bringToFront();
      const description = await player.evaluate(
        element => element.textContent,
        await player.waitForSelector('#description')
      );
      if (description.includes('You are a villager')) {
        villagers.push(index);
        if (headless && villagers.length === 1) {
          expect(await player.screenshot()).toMatchImageSnapshot({
            customSnapshotIdentifier: 'game-3-player-villager'
          });
        }
      } else if (description.includes('You are a werewolf')) {
        werewolves.push(index);
        if (headless && werewolves.length === 1) {
          expect(await player.screenshot()).toMatchImageSnapshot({
            customSnapshotIdentifier: 'game-4-player-werewolf'
          });
        }
      }
    }
    expect(villagers.length).toBe(3);
    expect(werewolves.length).toBe(1);

    // Night started
    await host.bringToFront();
    await sleep(10000); // TODO wait for div would be better
    if (headless) {
      expect(await host.screenshot()).toMatchImageSnapshot({
        customSnapshotIdentifier: 'game-5-host-night-started'
      });
    }
    for await (const player of players) {
      await player.bringToFront();
      await player.waitForSelector('#night');
      if (headless) {
        expect(await player.screenshot()).toMatchImageSnapshot({
          customSnapshotIdentifier: 'game-6-player-night-started'
        });
      }
    }

    // Host says werewolf picks
    await host.bringToFront();
    await sleep(5000); // TODO wait for div would be better
    if (headless) {
      expect(await host.screenshot()).toMatchImageSnapshot({
        customSnapshotIdentifier: 'game-7-host-werewolf-picks'
      });
    }

    // Werewolves can make pick
    for await (const [index, player] of players.entries()) {
      await player.bringToFront();
      if (headless) {
        if (werewolves.includes(index)) {
          expect(await player.screenshot()).toMatchImageSnapshot({
            customSnapshotIdentifier: 'game-8-player-werewolf-pick',
            failureThreshold: 150 // threshold for different order depending on who is werewolf
          });
        } else {
          expect(await player.screenshot()).toMatchImageSnapshot({
            customSnapshotIdentifier: 'game-6-player-night-started'
          });
        }
      }
    }

    // Werewolves pick
    for await (const playerIndex of werewolves) {
      const player = players[playerIndex];
      await player.bringToFront();
      await player.click('input');
      await player.click('#submitPick');
      player.waitForSelector('#submittedPick');
    }

    // Night for all players
    for await (const player of players) {
      await player.bringToFront();
      await player.waitForSelector('#night');
      if (headless) {
        expect(await player.screenshot()).toMatchImageSnapshot({
          customSnapshotIdentifier: 'game-6-player-night-started'
        });
      }
    }

    // Werewolf picking ended
    await host.bringToFront();
    await host.waitForSelector('#werewolvesPickEnded');
    if (headless) {
      expect(await host.screenshot()).toMatchImageSnapshot({
        customSnapshotIdentifier: 'game-9-host-werewolf-picks-ended'
      });
    }

    // Day started
    await sleep(5000); // TODO wait for div would be better
    await host.waitForSelector('#day');
    if (headless) {
      expect(await host.screenshot()).toMatchImageSnapshot({
        customSnapshotIdentifier: 'game-10-host-day-started',
        failureThreshold: 102 // threshold for different order depending on who is werewolf
      });
    }

    // Deceased player sees deceased screen, other players see options to kill
    const deceased = [];
    deceased.unshift(villagers.splice(0, 1)[0]);
    for await (const [index, player] of players.entries()) {
      await player.bringToFront();
      if (headless) {
        if (deceased.includes(index)) {
          expect(await player.screenshot()).toMatchImageSnapshot({
            customSnapshotIdentifier: 'game-11a-player-deceased'
          });
        } else {
          await player.waitForSelector('#villagerPick');
        }
      }
    }

    // Every player picks villager
    for await (const [index, player] of players.entries()) {
      if (!deceased.includes(index)) {
        await player.bringToFront();
        await player.click(`#player${villagers[0]}Option`);
        await player.click('#submitPick');
        await player.waitForSelector('#submittedPick');
      }
    }

    await sleep(15000);

    // TODO next
  }, 60000);
});
