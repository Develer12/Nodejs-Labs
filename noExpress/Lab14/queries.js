const sql = require('mssql');

let connectionPool;
const config =
{
  user:'Develer12',
  password: 'admin',
  server:'DESKTOP-U4BLHC6', Database:'Nodejs'
};
let dbname = 'use Nodejs; ';

class DB {
    constructor()
    {
        connectionPool = new sql.ConnectionPool(config).connect().then(pool =>
        {
          console.log('Connected to MSSQL')
          return pool
        }).catch(err => console.log('Connection Failed: ', err));
    }
    Get(tab)
    {
        return connectionPool.then(pool => pool.query(`${dbname} SELECT * FROM ${tab}`));
    }

    Update(tab, fields)
    {
        return connectionPool.then(pool =>
          {
            let req = pool.request();
            let command = `${dbname} UPDATE ${tab} SET `;
            let tabid = '';
            Object.keys(fields).forEach(field =>
            {
                if (!field.endsWith('ID'))
                    command += `${field} = '${fields[field]}',`;
                else tabid = fields[field];
            });
            command = command.slice(0, -1);
            command += ` WHERE ${tab}_ID = '${tabid}'`;
            console.log('|'+command+'|');
             req.query(command);
        });
    }

    Insert(tab, fields)
    {
        return connectionPool.then(pool =>
        {
            const req = pool.request();
            let command = `${dbname} INSERT INTO ${tab} values (`;
            Object.keys(fields).forEach(field =>
            {
                let fieldType = Number.isInteger(fields[field]) ? sql.Int : sql.NVarChar;
                req.input(field, fieldType, fields[field]);
                command += `@${field},`;
            });
            command = command.replace(/.$/,")");
            return req.query(command);
        });
    }

    Delete(tab, id)
    {
        return connectionPool.then(pool =>
        {
          console.log(`${dbname} DELETE FROM ${tab} WHERE ${tab}_ID = ${id}`);
          if (!id)
              throw 'Problem with ID';
          return pool.query(`${dbname} DELETE FROM ${tab} WHERE ${tab}_ID = '${id}'`);
        });
    }
}

module.exports = DB;
