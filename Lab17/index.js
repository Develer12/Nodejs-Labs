const redis = require('redis');

let config =
{
  "host": "redis-10813.c135.eu-central-1-1.ec2.cloud.redislabs.com",
  "port": 10813,
  "no_ready_check": true,
  "auth_pass": "KXlVEmk67na4tAjnm92ep1phngABZZSl"
}

const client = redis.createClient(config);

client.on('connect', () => {
    console.log('Redis connected');
