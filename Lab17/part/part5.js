module.exports = (config, redis) => {
    const pub = redis.createClient(config);
    const sub = redis.createClient(config);

    sub.on('message', (chanel, message)=>{console.log(`Message: ${message}|From ${chanel}`);});
    sub.on('subscribe', (chanel, count)=>{console.log(`Subscribers: ${count}|From ${chanel}`);});

    sub.subscribe('chanel1');
    setTimeout(()=>{sub.unsubscribe('chanel1'); sub.quit()}, 60000);

    pub.publish('chanel1', 'pub-msg1');
    let i = 0;
    setInterval(()=>{i++; pub.publish('chanel1', `pub-msg${i}`);}, 2000);
    setTimeout(()=>{pub.quit();}, 55000);
};
