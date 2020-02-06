module.exports = (client) => {
    Promise.resolve()
      .then(() => Set(client, 10000))
      .then(() => Get(client, 10000))
      .then(() => Del(client, 10000));
};

function Set(client, count){
    let timer = Date.now();
    for (var i = 0; i < count; i++) {
      let param = `s${i}`;
      client.set(param, param, (err)=>{if(err) console.log("Error msg: "+err);});
    }
    console.log(`Task 2: Set time for ${count} queries: ${Date.now() - timer} ms`);
}

function Get(client, count){
    let timer = Date.now();
    for (var i = 0; i < count; i++) {
      let param = `s${i}`;
      client.get(param, (err)=>{if(err) console.log("Error msg: "+err);});
    }
    console.log(`Task 2: Get time for ${count} queries: ${Date.now() - timer} ms`);

}

function Del(client, count){
    let timer = Date.now();
    for (var i = 0; i < count; i++) {
      let param = `s${i}`;
      client.del(param, (err)=>{if(err) console.log("Error msg: "+err);});
    }
    console.log(`Task 2: Del time for ${count} queries: ${Date.now() - timer} ms`);
}
