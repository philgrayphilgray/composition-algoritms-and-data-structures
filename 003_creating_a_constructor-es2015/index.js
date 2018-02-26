class TV {
  constructor(defaults) {
    this.name = 'TV';
    this.channel = defaults.channel;
    this.on = defaults.power;
  }

  switchOnOff() {
    this.on = !this.on;
  }

  changeChannel(newChannel) {
    if (this.on) {
      this.channel = newChannel;
    } else {
      console.log('You must first turn the tv on!');
    }
  }
}

const tv = new TV({channel: 3, on: false});

module.exports = tv;
