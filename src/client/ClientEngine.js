import EventSourceMixin from '../common/EventSourceMixin';
import { ClientCamera } from './ClientCamera';
import ClientInput from './ClientInput';

class ClientEngine {
  constructor(canvas) {
    Object.assign(this, {
      canvas,
      context: null,
      imageLoaders: [],
      sprites: {},
      images: {},
      camera: new ClientCamera({ canvas, engine: this }),
      input: new ClientInput(canvas),
    });

    this.context = canvas.getContext('2d');

    this.loop = this.loop.bind(this);
  }

  start() {
    this.loop();
  }

  loop(timestamp = 0) {
    const { context, canvas } = this;
    context.fillStyle = 'black';
    context.clearRect(0, 0, canvas.width, canvas.height);

    this.trigger('render', timestamp);

    this.initNextFrame();
  }

  initNextFrame() {
    window.requestAnimationFrame(this.loop);
  }

  loadSprites(spritesGroup) {
    this.imageLoaders = [];

    Object.keys(spritesGroup).forEach((groupName) => {
      const group = spritesGroup[groupName];
      this.sprites[groupName] = group;
      Object.keys(group).forEach((spriteName) => {
        const { img } = group[spriteName];
        if (!this.images[img]) {
          this.imageLoaders.push(this.loadImage(img));
        }
      });
    });

    return Promise.all(this.imageLoaders);
  }

  loadImage(imgUrl) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      this.images[imgUrl] = image;
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error(`Error when load image ${imgUrl}`));
      image.src = imgUrl;
    });
  }

  renderSpriteFrame({ sprite, frame, x, y, w, h }) {
    const spriteConfig = this.sprites[sprite[0]][sprite[1]];
    const [fx, fy, fw, fh] = spriteConfig.frames[frame];
    const img = this.images[spriteConfig.img];

    this.context.drawImage(img, fx, fy, fw, fh, x, y, w, h);
  }
}

Object.assign(ClientEngine.prototype, EventSourceMixin);

export default ClientEngine;
