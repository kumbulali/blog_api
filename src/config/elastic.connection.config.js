const { Client } = require('@elastic/elasticsearch'),
  config = require('../config/environment.variables.config');

const client = new Client(config.elastic)

client.ping({}, (error) => {
  if (error) {
    console.error('Elastic cloud connection error', error);
  } else {
    console.log('Elastic cloud connection established');
  }
});

module.exports = client;