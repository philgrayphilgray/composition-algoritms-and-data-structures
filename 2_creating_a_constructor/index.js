function TV(defaults) {
  this.name = 'TV';
  this.channel = defaults.channel;
  this.on = true;
}

TV.prototype.switchOnOff = function() {
  this.on = !this.on;
};

TV.prototype.changeChannel = function(newChannel) {
  this.channel = newChannel;
};

module.exports = TV;
