import './index.scss';
import terrainAtlas from './assets/terrain.png';
import worldCfg from './configs/world.json';
import sprites from './configs/sprites';
import ClientGame from './client/ClientGame';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// Ширина и высота кадра на спрайте
const spriteW = 48;
const spriteH = 48;

// const terrain = document.createElement('img');
// terrain.src = terrainAtlas;
//
// terrain.addEventListener('load', () => {
//   const { map } = worldCfg;
//   map.forEach((configRow, y) => {
//     configRow.forEach((configCell, x) => {
//       const [sX, sY, sW, sH] = sprites.terrain[configCell[0]].frames[0];
//       ctx.drawImage(terrain, sX, sY, sW, sH, x * spriteW, y * spriteH, spriteW, spriteH);
//     });
//   });
// });

window.addEventListener('load', () => {
  ClientGame.init({ tagId: 'game' });
});
