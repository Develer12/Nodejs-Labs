const sql = require('mssql');

let connectionPool;
const config =
{
  user:'Develer12',
  password: 'admin',
  server:'DESKTOP-U4BLHC6', Database:'Nodejs'
};

class DB
{
    constructor()
    {
        connectionPool = new sql.ConnectionPool(config).connect().then(pool =>
        {
          console.log('Connected to MSSQL');
          return pool
        }).catch(err => console.log('Connection Failed: ', err));
    }

    GetTab(tab)
    {
        return connectionPool
          .then(pool => pool.query(`SELECT * FROM ${tab}`))
          .then(res => res.recordset);
    }

    GetField(tab, fields)
    {
        return connectionPool.then(pool =>
        {
          const req = pool.req();
          let command = `SELECT TOP(1) * FROM ${tab} WHERE`;
          Object.keys(fields).forEach(field =>
          {
            let fieldType = Number.isInteger(fields[field]) ? sql.Int : sql.NVarChar;
            req.input(field, fieldType, fields[field]);
            command += ` ${field} = @${field} AND`;
          });
          command = command.slice(0, -3);
          return req.query(command);
        })
        .then(res => res.recordset);
    }
}

module.exports = DB;
