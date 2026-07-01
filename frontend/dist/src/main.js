import './styles.css';
import { createGameStore } from './state/stores.js';
import { Engine } from './game/core/Engine.js';
import { renderHud } from './components/hud/Hud.js';
import { renderWorldMap } from './components/worldmap/WorldMap.js';
import { renderEventLog } from './components/overlays/EventLog.js';
import { renderPauseMenu } from './components/menus/PauseMenu.js';

const root = document.getElementById('root');
const store = createGameStore();
let engine;

function mountWorld() { engine?.destroy(); root.innerHTML = ''; root.append(renderWorldMap(() => mountGame())); }
function mountGame() {
  root.innerHTML = '<section class="game-screen"><canvas class="game-canvas" aria-label="Forbidden Archipelago game canvas"></canvas><div id="hud"></div><div id="events"></div><div id="pause"></div></section>';
  const canvas = root.querySelector('canvas');
  engine = new Engine(canvas, { onPlayer: (p) => store.set({ player: p }), onEnemies: (enemies) => store.set({ enemies }), onEvent: (event) => store.pushEvent(event), isPaused: () => store.get().paused, onPause: () => store.set({ paused: !store.get().paused }) });
  engine.start();
  store.subscribe((state) => { renderHud(document.getElementById('hud'), state); renderEventLog(document.getElementById('events'), state.events); renderPauseMenu(document.getElementById('pause'), state.paused, () => store.set({ paused: false }), mountWorld); });
  store.emit();
}
mountWorld();
