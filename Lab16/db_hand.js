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
        })
          .catch(err => console.log('Connection Failed: ', err));
    }

    query(query)
    {
        return connectionPool
          .then(pool => pool.query(query))
          .then(res => res.recordset);
    }

    GetTab(tab)
    {
        return connectionPool
          .then(pool => pool.query(`SELECT * FROM ${tab}`))
          .then(res => res.recordset);
    }

    GetField(tab, field)
    {
        return connectionPool.then(pool =>
        {
          const req = pool.request();
          let command = `USE Nodejs; SELECT TOP(1) * FROM ${tab} WHERE ${tab}_ID = '${field}'`;
          console.log(command);
          return req.query(command);
        })
        .then(res => res.recordset);
    }

    InsertField(tab, fields) {
        return connectionPool.then(pool => {
            const req = pool.request();
            let command = `USE Nodejs; INSERT INTO ${tab} values (`;
            Object.keys(fields).forEach(field => {
                let fieldType = Number.isInteger(fields[field]) ? sql.Int : sql.NVarChar;
                req.input(field, fieldType, fields[field]);
                command += `'${field}',`;
            });
            command = command.replace(/.$/,")");
            console.log(command);

            return req.query(command);
        });
    }

    UpdateField(tab, fields) {
        return connectionPool.then(pool => {
            const idField = tab + '_ID';
            if (!fields[idField] || !Number.isInteger(fields[idField])) {
                throw 'There are no Id value has been provided. Example: {tab}_Id';
            }
            const req = pool.request();
            let command = `USE Nodejs; UPDATE ${tab} SET `;
            Object.keys(fields).forEach(field => {
                let fieldType = Number.isInteger(fields[field]) ? sql.Int : sql.NVarChar;
                req.input(field, fieldType, fields[field]);
                if (!field.endsWith('ID')) {
                    command += `${field} = @${field},`;
                }
            });
            command = command.slice(0, -1);
            command += ` WHERE ${idField} = @${idField}`;
            return req.query(command);
        });
    }

    DeleteField(tab, id) {
        return connectionPool.then(pool => {
            if (!id || !Number.isInteger(Number(id))) {
                throw 'There are no Id value has been provided. Example: /api/instances/:id';
            }
            return pool.query(`DELETE FROM ${tab} WHERE ${tab}_ID = ${id}`);
        });
    }
}

module.exports = DB;
