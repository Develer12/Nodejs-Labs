module.exports = (client) => {
    Promise.resolve()
      .then(() => HSet(client, 10000))
      .then(() => HGet(client, 10000))
      .then(() => Del(client, 10000));
};

function HSet(client, count){
    let timer = Date.now();
    for (var i = 0; i < count; i++) {
      let param = `4s${i}`;
      client.set(param, param, (err)=>{if(err) console.log("Error msg: "+err);});
    }
    console.log(`Task 4: HSet time for ${count} queries: ${Date.now() - timer} ms`);
}

function HGet(client, count){
    let timer = Date.now();
    for (var i = 0; i < count; i++) {
      let param = `4s${i}`;
      client.get(param, (err)=>{if(err) console.log("Error msg: "+err);});
    }
    console.log(`Task 4: HGet time for ${count} queries: ${Date.now() - timer} ms`);

}

function Del(client, count){
    let timer = Date.now();
    for (var i = 0; i < count; i++) {
      let param = `4s${i}`;
      client.del(param, (err)=>{if(err) console.log("Error msg: "+err);});
    }
    console.log(`Task 4: Del time for ${count} queries: ${Date.now() - timer} ms`);
}
