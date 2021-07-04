import './index.scss';
import characterSprite from './assets/Female-2-Walk.png';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// Ширина и высота кадра на спрайте
const spriteW = 48;
const spriteH = 48;
// Количество кадров
const shots = 3;
// Текущий кадр
let cycle = 0;

// Время последнего рендера (мс)
let lastRender = 0;

const img = document.createElement('img');
img.src = characterSprite;

const drawShot = (timestamp) => {
  if (!lastRender || timestamp - lastRender >= 0.1 * 1000) {
    lastRender = timestamp;
    cycle = (cycle + 1) % shots;
    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    ctx.drawImage(img, cycle * spriteW, 0, spriteW, spriteH, 0, 0, 100, 100);
  }
  window.requestAnimationFrame(drawShot);
};

img.addEventListener('load', () => {
  drawShot();
});
