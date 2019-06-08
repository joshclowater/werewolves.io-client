const puppeteer = require('puppeteer');
const { toMatchImageSnapshot } = require('jest-image-snapshot');
expect.extend({ toMatchImageSnapshot });

const URL = 'http://localhost:3001';

const sleep = timeout => new Promise(r => setTimeout(r, timeout));

// Set debug to true to put in extra timeouts and run in chromium browser
const debug = false;
const headless = !debug;

describe('Gameplay', () => {
  let gameplayBrowser;
  beforeEach(async () => {
    gameplayBrowser = await puppeteer.launch({ headless });
  });
  afterEach(async () => {
    await gameplayBrowser.close();
  });

  test('four player game, werewolves win', async () => {
    await playGame(gameplayBrowser, 4, true);
  }, 90000);

  test('four player game, villagers win', async () => {
    await playGame(gameplayBrowser, 4, false);
  }, 90000);

  test('six player game, werewolves win', async () => {
    await playGame(gameplayBrowser, 6, true);
  }, 120000);
});

const playGame = async (playGameBrowser, numberOfPlayers, werewolvesWin) => {
  // Open tabs for host and players
  const host = await playGameBrowser.newPage();
  const players = [];
  // (Not sure how to do syntax below without eslint warning)
  // eslint-disable-next-line no-unused-vars
  for await (const index of Array(numberOfPlayers)) {
    players.push(await playGameBrowser.newPage());
  }

  // Open host page and get game id
  await host.goto(`${URL}/#/host`);
  const gameId = await host.evaluate(
    element => element.textContent,
    await host.waitForSelector('#gameId')
  );
  expect(gameId.length).toBe(5);

  // Add each player to the game
  for await (const [index, player] of players.entries()) {
    await player.bringToFront();
    await player.goto(`${URL}/#/player`);
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
  for (const [index] of players.entries()) {
    expect(playersText.includes(`player${index}`)).toBe(true);
  }
  await host.click('#startGame');
  if (headless) {
    await host.waitForSelector('#startingGame');
    await host.waitForSelector('#roundStarted');
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
      debug && (await sleep(2000));
    }
  }
  expect(villagers.length).toBe(numberOfPlayers - 1);
  expect(werewolves.length).toBe(1);
  const originalVillagers = [...villagers];
  const deceased = [];

  let turns;
  if (werewolvesWin) {
    turns = Array(Math.floor(numberOfPlayers / 2) - 1);
  } else {
    turns = Array(1);
  }

  // For every turn
  // (Not sure how to do syntax below without eslint warning)
  // eslint-disable-next-line no-unused-vars
  for await (const turn of turns) {
    // Night started
    await host.bringToFront();
    await host.waitForSelector('#night', {
      timeout: 15000
    });
    if (headless) {
      expect(await host.screenshot()).toMatchImageSnapshot({
        customSnapshotIdentifier: 'game-5-host-night-started'
      });
    }
    for await (const [index, player] of players.entries()) {
      if (!deceased.includes(index)) {
        await player.bringToFront();
        await player.waitForSelector('#night');
        if (headless) {
          expect(await player.screenshot()).toMatchImageSnapshot({
            customSnapshotIdentifier: 'game-6-player-night-started'
          });
        }
      }
    }

    // Host says werewolf picks
    await host.bringToFront();
    await host.waitForSelector('#werewolvesPick');
    if (headless) {
      expect(await host.screenshot()).toMatchImageSnapshot({
        customSnapshotIdentifier: 'game-7-host-werewolf-picks'
      });
    }

    // Werewolves can make pick
    for await (const [index, player] of players.entries()) {
      await player.bringToFront();
      if (headless && !deceased.includes(index)) {
        if (werewolves.includes(index)) {
          expect(await player.screenshot()).toMatchImageSnapshot({
            customSnapshotIdentifier: `game-8-player-werewolf-pick-from-${
              villagers.length
            }-villagers`,
            failureThreshold: 200 // threshold for different order depending on who is werewolf
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
      await player.waitForSelector('input');
      debug && (await sleep(2000));
      await player.click(`#player${villagers[0]}Option`);
      debug && (await sleep(2000));
      await player.click('#submitPick');
      debug && (await sleep(2000));
    }

    // Night for all players
    for await (const [index, player] of players.entries()) {
      if (!deceased.includes(index)) {
        await player.bringToFront();
        await player.waitForSelector('#night');
        if (headless) {
          expect(await player.screenshot()).toMatchImageSnapshot({
            customSnapshotIdentifier: 'game-6-player-night-started'
          });
        }
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
    await host.waitForSelector('#day');
    if (headless) {
      expect(await host.screenshot()).toMatchImageSnapshot({
        customSnapshotIdentifier: `game-10-host-day-started-${villagers.length +
          werewolves.length -
          1}-of-${numberOfPlayers}-remaining`,
        failureThreshold: 200 // threshold for different order depending on who is werewolf and turn
      });
    }

    // Deceased player sees deceased screen, other players see options to kill
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

    // Every player picks
    for await (const [index, player] of players.entries()) {
      if (!deceased.includes(index)) {
        await player.bringToFront();
        debug && (await sleep(1000));
        if (werewolvesWin) {
          await player.click(`#player${villagers[0]}Option`);
        } else {
          await player.click(`#player${werewolves[0]}Option`);
        }
        debug && (await sleep(1000));
        await player.click('#submitPick');
        if (index < players.length - 1) {
          await player.waitForSelector('#submittedPick');
        }
      }
    }
    if (werewolvesWin) {
      deceased.unshift(villagers.splice(0, 1)[0]);
    } else {
      deceased.unshift(werewolves.splice(0, 1)[0]);
    }

    // TODO here
  }

  // Round ended on host
  await host.bringToFront();
  debug && (await sleep(2000));
  await host.waitForSelector('#roundOver');
  const winText = await host.evaluate(
    element => element.textContent,
    await host.$('#win')
  );
  if (werewolvesWin) {
    expect(winText.includes('Werewolves win')).toBe(true);
  } else {
    expect(winText.includes('Villagers win')).toBe(true);
  }
  const deceasedText = await host.evaluate(
    element => element.textContent,
    await host.$('#deceased')
  );
  for (const playerIndex of deceased) {
    expect(deceasedText.includes(`player${playerIndex}`)).toBe(true);
  }
  const villagersText = await host.evaluate(
    element => element.textContent,
    await host.$('#villagers')
  );
  for (const playerIndex of villagers) {
    expect(villagersText.includes(`player${playerIndex}`)).toBe(true);
  }
  const werewolvesText = await host.evaluate(
    element => element.textContent,
    await host.$('#werewolves')
  );
  for (const playerIndex of werewolves) {
    expect(werewolvesText.includes(`player${playerIndex}`)).toBe(true);
  }

  // Round ended on players
  for await (const [index, player] of players.entries()) {
    await player.bringToFront();
    const roundOverText = await player.evaluate(
      element => element.textContent,
      await player.$('#roundOver')
    );
    if (
      (werewolvesWin && werewolves.includes(index)) ||
      (!werewolvesWin && originalVillagers.includes(index))
    ) {
      expect(roundOverText.includes('You won!')).toBe(true);
    } else {
      expect(roundOverText.includes('You lost')).toBe(true);
    }
  }

  // Play again
  await host.bringToFront();
  await Promise.all([host.waitForNavigation(), host.click('#playAgain')]);
  await host.waitForSelector('#gameId');
  for await (const player of players) {
    await player.bringToFront();
    await Promise.all([player.waitForNavigation(), player.click('#playAgain')]);
    await player.waitForSelector('#gameId');
  }
};
