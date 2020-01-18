const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

let DBPass = 'admin';
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

    GetTab(tableName)
    {
        return client.then(db => {return db.collection(tableName).find({}).toArray();});
    }

    GetField(tableName, fields)
    {
      return client
      .then(db => {return db.collection(tableName).findOne(fields);})
      .then(record =>
      {
        if(!record) throw 'No records';
      });
    }

    InsertField(tableName, fields)
    {
      return client
      .then(async db => {await db.collection(tableName).insertOne(fields);})
      .then(db => {return db.collection(tableName).findOne(fields);})
      .then(record => {if (!record) {throw 'No records';} return record;});
    }

    UpdateField(tableName, id, fields)
    {
      return client
      .then(async db =>
      {
        console.log(id);
        if (!id) {throw "Wrong ID";}
        await db.collection(tableName).updateOne({_id: ObjectId(id)}, {$set: fields});
        return db;
      })
      .then(db => {return db.collection(tableName).findOne(fields);});
    }

    DeleteField(tableName, id)
    {
      return client
      .then(async db =>
      {
        if (!id) {throw 'Wrong ID';}
        console.log("DB delete");
        let removedRecord = await this.GetField(tableName, {_id: ObjectId(id)});
        await db.collection(tableName).deleteOne({_id: ObjectId(id)});
        return removedRecord;
      });
    }

}

module.exports = DB;
