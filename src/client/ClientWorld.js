class ClientWorld {
  constructor(game, engine, levelConfig) {
    Object.assign(this, {
      game,
      engine,
      levelConfig,
      height: levelConfig.map.length,
      width: levelConfig.map[0].length,
    });
  }

  init() {
    this.engine.renderSpriteFrame({
      sprite: ['terrain', 'grass'],
      frame: 0,
      x: 0,
      y: 0,
      w: 48,
      h: 48,
    });
  }
}

export default ClientWorld;
