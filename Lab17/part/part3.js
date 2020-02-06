module.exports = (client) => {
    Promise.resolve()
      .then(() => Set(client, 10000))
      .then(() => Incr(client, 10000))
      .then(() => Decr(client, 10000))
      .then(() => Del(client, 10000));
};

function Incr(client, count){
    let timer = Date.now();
    for (var i = 0; i < count; i++) {
      client.incr(`s${i}`, (err)=>{if(err) console.log("Error msg: "+err);});
    }
    console.log(`Task 3: Incr time for ${count} queries: ${Date.now() - timer} ms`);
}

function Decr(client, count){
    let timer = Date.now();
    for (var i = 0; i < count; i++) {
      client.decr(`s${i}`, (err)=>{if(err) console.log("Error msg: "+err);});
    }
    console.log(`Task 3: Decr time for ${count} queries: ${Date.now() - timer} ms`);
}

function Set(client, count){
    let timer = Date.now();
    for (var i = 0; i < count; i++) {
      client.set(`s${i}`, i, (err)=>{if(err) console.log("Error msg: "+err);});
    }
    console.log(`Task 3: Set time for ${count} queries: ${Date.now() - timer} ms`);
}

function Del(client, count){
    let timer = Date.now();
    for (var i = 0; i < count; i++) {
      client.del(`s${i}`, (err)=>{if(err) console.log("Error msg: "+err);});
    }
    console.log(`Task 3: Del time for ${count} queries: ${Date.now() - timer} ms`);
}
