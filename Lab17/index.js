const redis = require('redis');

let config = {
  "host": "redis-10813.c135.eu-central-1-1.ec2.cloud.redislabs.com",
  "port": 10813,
  "no_ready_check": true,
  "auth_pass": "KXlVEmk67na4tAjnm92ep1phngABZZSl"
}

const client = redis.createClient(config);

client
  .on('ready', () => {console.log('Client is ready');})
  .on('error', (err) => {console.log("Error: " + err);})
  .on('end', () => {console.log("End of connection");})
  .on('ready', () => {
    console.log('Redis connected');

    Promise.resolve()
      .then(() => {require(__dirname + '/part/part2')(client);})
      .then(() => {require(__dirname + '/part/part3')(client);})
      .then(() => {require(__dirname + '/part/part4')(client);})
      .then(() => {require(__dirname + '/part/part5')(config, redis);});
  });
