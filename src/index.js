import './index.scss';
import characterSprite from './assets/Female-2-Walk.png';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const img = document.createElement('img');
img.src = characterSprite;

// Ширина и высота кадра на спрайте
const spriteW = 48;
const spriteH = 48;
// Координаты персонажа на холсте
let pY = canvas.offsetHeight / 2 - spriteH / 2;
let pX = canvas.offsetWidth / 2 - spriteW / 2;
// Количество кадров
const shots = 3;
// Текущий кадр
let cycle = 0;
// Флаг нажатия стрелок
let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;

// Множитель направления для выбора нужного кадра направления
let direction = 0;
// Время последнего рендера (мс)
let lastRender = 0;

const drawShot = (timestamp) => {
  // Условие для рендера раз в x (100) мс
  if (!lastRender || timestamp - lastRender >= 100) {
    lastRender = timestamp;

    if (downPressed || upPressed || leftPressed || rightPressed) {
      cycle = (cycle + 1) % shots;
    }

    if (downPressed) {
      if (pY + 10 <= canvas.offsetHeight - spriteH) {
        pY += 10;
      }
      direction = 0;
    }

    if (upPressed) {
      if (pY - 10 >= 0) {
        pY -= 10;
      }
      direction = 3;
    }

    if (leftPressed) {
      if (pX - 10 >= 0) {
        pX -= 10;
      }
      direction = 1;
    }

    if (rightPressed) {
      if (pX + 10 <= canvas.offsetWidth - spriteW) {
        pX += 10;
      }
      direction = 2;
    }

    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    ctx.drawImage(
      img,
      cycle * spriteW,
      spriteH * direction,
      spriteW,
      spriteH,
      pX,
      pY,
      spriteW,
      spriteH,
    );
  }
  window.requestAnimationFrame(drawShot);
};

const keyDownHandler = (event) => {
  if (event.key === 'Down' || event.key === 'ArrowDown') {
    event.preventDefault();
    downPressed = true;
  }

  if (event.key === 'Up' || event.key === 'ArrowUp') {
    event.preventDefault();
    upPressed = true;
  }

  if (event.key === 'Left' || event.key === 'ArrowLeft') {
    event.preventDefault();
    leftPressed = true;
  }

  if (event.key === 'Right' || event.key === 'ArrowRight') {
    event.preventDefault();
    rightPressed = true;
  }
};

const keyUpHandler = (event) => {
  event.preventDefault();
  if (event.key === 'Down' || event.key === 'ArrowDown') {
    downPressed = false;
  }

  if (event.key === 'Up' || event.key === 'ArrowUp') {
    upPressed = false;
  }

  if (event.key === 'Left' || event.key === 'ArrowLeft') {
    leftPressed = false;
  }

  if (event.key === 'Right' || event.key === 'ArrowRight') {
    rightPressed = false;
  }
};

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

img.addEventListener('load', () => {
  drawShot();
});
