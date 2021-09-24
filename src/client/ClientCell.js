import PositionedObject from '../common/PositionedObject';
import ClientGameObject from './ClientGameObject';

class ClientCell extends PositionedObject {
  constructor(cfg) {
    super();
    const { cellWidth, cellHeight } = cfg.world;

    Object.assign(
      this,
      {
        cfg,
        objects: [],
        x: cellWidth * cfg.cellCol,
        y: cellWidth * cfg.cellRow,
        width: cellWidth,
        height: cellHeight,
      },
      cfg,
    );

    this.initGameObjects();
  }

  initGameObjects() {
    const { cellConfig } = this;

    // this.objects = cellConfig[0].map((objCfg) => new ClientGameObject({ cell: this, objCfg }));
    this.objects = cellConfig.map((layer, layerId) => layer.map((objCfg) => new ClientGameObject({
      cell: this,
      objCfg,
      layerId,
    })));
  }

  render(time, layerId) {
    const { objects } = this;

    if (objects[layerId]) {
      objects[layerId].forEach((obj) => obj.render(time));
    }
  }

  addGameObject(objToAdd) {
    const { objects } = this;
    if (objToAdd.layerId === undefined) {
      // eslint-disable-next-line no-param-reassign
      objToAdd.layerId = objects.length;
    }

    if (!objects[objToAdd.layerId]) {
      objects[objToAdd.layerId] = [];
    }

    objects[objToAdd.layerId].push(objToAdd);
  }

  removeGameObject(objToRemove) {
    // this.objects = this.objects.filter((obj) => obj !== objToRemove);
    const { objects } = this;
    objects.forEach((layer, layerId) => {
      objects[layerId] = layer.filter((obj) => obj !== objToRemove);
    });
  }

  findObjectsByType(type) {
    let foundObjects = [];

    this.objects.forEach((layer) => {
      foundObjects = [...foundObjects, ...layer].filter((obj) => obj.type === type);
    });
    return foundObjects;
  }

  static cellIsGrass(cell) {
    return Boolean(cell.findObjectsByType('grass').length);
  }
}

export default ClientCell;
