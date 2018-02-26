const Building = require('./index');

describe('`Building`', () => {
  it('is a constructor', () => {
    expect(typeof Building.prototype.constructor).toEqual('function');
  });
  it('has `floors` and `name` properties', () => {
    const numberOfFloors = 6;
    const building = new Building(numberOfFloors);
    expect(building.floors).toEqual(numberOfFloors);
    expect(building.name).toEqual('building');
  });
});
