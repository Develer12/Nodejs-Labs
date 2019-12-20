const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

let DBPass = '************';
config =
  {"db":{"connectionString": `mongodb+srv://Develer12:${DBPass}@cluster0-hkfnq.mongodb.net/test?retryWrites=true&w=majority`}};

let client;
class DB {
    constructor()
    {
      client = new MongoClient(config.db.connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
      client = client.connect().then(this.getConnection);
      console.log("Connected to MongoDB");
    }
    getConnection(connection) {return connection.db("Test");}

    GetPulp(tableName)
    {
        return client.then(db => {return db.collection(tableName).find({}).toArray();});
    }

}

module.exports = DB;
