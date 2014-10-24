var Swarm = require('swarm');

module.exports = Swarm.Model.extend('Position', {
  defaults: {
    x: 0,
    y: 0
  }
});
