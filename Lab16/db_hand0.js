const sql = require('mssql');
let connectionPool;
let transaction;
const config =
{
  user:'Develer12',
  password: 'admin',
  server:'DESKTOP-U4BLHC6', Database:'NodeTran'
};

class DB {
    constructor()
    {
        connectionPool = new sql.ConnectionPool(config).connect().then(pool =>
        {
          transaction = new sql.Transaction(pool);
          console.log('Connected to MSSQL');
          return pool
        }).catch(err => console.log('Connection Failed: ', err));
    }


}

module.exports = DB;
