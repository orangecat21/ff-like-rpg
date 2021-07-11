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
    this.levelConfig.map.forEach((mapRow, y) => {
      mapRow.forEach((mapCell, x) => {
        this.engine.renderSpriteFrame({
          sprite: ['terrain', ...mapCell[0]],
          frame: 0,
          x: x * 48,
          y: y * 48,
          w: 48,
          h: 48,
        });
      });
    });
  }
}

export default ClientWorld;
