import './index.scss';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

ctx.beginPath();
ctx.moveTo(50, 50);
ctx.lineTo(550, 50);
ctx.lineTo(550, 550);
ctx.lineTo(50, 550);

ctx.fillStyle = 'red';
ctx.lineWidth = 10;
ctx.closePath();
ctx.stroke();
ctx.fill();

ctx.beginPath();
ctx.arc(300, 400, 100, 0, 3.14);
ctx.stroke();

ctx.beginPath();
ctx.arc(150, 200, 50, 0, 3.14);
ctx.stroke();

ctx.beginPath();
ctx.arc(450, 200, 50, 0, 3.14);
ctx.stroke();

let isOpen = false;

const openCloseEye = () => {
  if (isOpen) {
    ctx.clearRect(95, 145, 110, 55);
    ctx.fillRect(95, 145, 110, 55);

    ctx.clearRect(395, 145, 110, 55);
    ctx.fillRect(395, 145, 110, 55);

    ctx.clearRect(195, 295, 210, 105);
    ctx.fillRect(195, 295, 210, 105);
  } else {
    ctx.beginPath();
    ctx.arc(150, 200, 50, Math.PI, 2 * Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(450, 200, 50, Math.PI, 2 * Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(300, 400, 100, Math.PI, 2 * Math.PI);
    ctx.stroke();
  }
  isOpen = !isOpen;
};

setInterval(openCloseEye, 1000);
