import PositionedObject from '../common/PositionedObject';
import ClientCell from './ClientCell';

class ClientWorld extends PositionedObject {
  constructor(game, engine, levelConfig) {
    super();
    const worldHeight = levelConfig.map.length;
    const worldWidth = levelConfig.map[0].length;
    const cellSize = engine.canvas.height / levelConfig.camera.height;

    Object.assign(this, {
      game,
      engine,
      levelConfig,
      height: worldHeight * cellSize,
      width: worldWidth * cellSize,
      worldHeight,
      worldWidth,
      cellWidth: cellSize,
      cellHeight: cellSize,
      map: [],
    });
  }

  init() {
    const { levelConfig, map, worldWidth, worldHeight } = this;

    for (let row = 0; row < worldHeight; row++) {
      for (let col = 0; col < worldWidth; col++) {
        if (!map[row]) {
          map[row] = [];
        }
        map[row][col] = new ClientCell({
          world: this,
          cellCol: col,
          cellRow: row,
          cellConfig: levelConfig.map[row][col],
        });
      }
    }
  }

  render(time) {
    const { levelConfig, map, worldWidth, worldHeight } = this;

    for (let layerId = 0; layerId < levelConfig.layers.length; layerId += 1) {
      for (let row = 0; row < worldHeight; row++) {
        for (let col = 0; col < worldWidth; col++) {
          map[row][col].render(time, layerId);
        }
      }
    }
  }

  cellAt(col, row) {
    return this.map[row] && this.map[row][col];
  }
}

export default ClientWorld;
