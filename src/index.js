import './index.scss';
import ClientGame from './client/ClientGame';

const canvas = document.getElementById('game');

// Ширина и высота кадра на спрайте
const spriteW = 48;
const spriteH = 48;

window.addEventListener('load', () => {
  ClientGame.init({ tagId: 'game' });
});
