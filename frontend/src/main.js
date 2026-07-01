import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createForbiddenArchipelago } from './engine/createGame.js';
import { ConsoleHud } from './ui/hud/ConsoleHud.js';
import { PauseOverlay } from './ui/menus/PauseOverlay.js';

function Shell() {
  const [snapshot, setSnapshot] = useState({ hp: 100, mana: 74, gold: 24500, combo: 0, biome: 'Green Continent', paused: false });
  useEffect(() => {
    const game = createForbiddenArchipelago({ parent: 'game-root', onSnapshot: setSnapshot });
    return () => game.destroy(true);
  }, []);
  return React.createElement('main', { className: 'console-shell' },
    React.createElement('section', { className: 'screen-bezel' },
      React.createElement('div', { id: 'game-root', className: 'phaser-stage', 'aria-label': 'Forbidden Archipelago game scene' }),
      React.createElement(ConsoleHud, { snapshot }),
      snapshot.paused ? React.createElement(PauseOverlay) : null));
}

createRoot(document.getElementById('root')).render(React.createElement(Shell));
