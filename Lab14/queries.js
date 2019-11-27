const sql = require('mssql/msnodesqlv8');

let connectionPool;
const config =
{
    "driver": "msnodesqlv8",
    "connectionString": "Driver={SQL Server Native Client 11.0};Server={DESKTOP-U4BLHC6};Database={Nodejs};Trusted_Connection={yes};"
};

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
        return connectionPool.then(pool => pool.query(`SELECT * FROM ${tab}`));
    }

    Update(tab, fields)
    {
        return connectionPool.then(pool =>
          {
            const tab = tab + '_Id';
            if (!fields[tab] || !Number.isInteger(fields[tab]))
                throw 'Problem with ID';
            const req = pool.req();
            let command = `UPDATE ${tab} SET `;
            Object.keys(fields).forEach(field =>
            {
                let fieldType = Number.isInteger(fields[field]) ? sql.Int : sql.NVarChar;
                req.input(field, fieldType, fields[field]);
                if (!field.endsWith('Id'))
                    command += `${field} = @${field},`;
            });
            command = command.slice(0, -1);
            command += ` WHERE ${tab} = @${tab}`;
            return req.query(command);
        });
    }

    Insert(tab, fields)
    {
        return connectionPool.then(pool =>
        {
            const req = pool.request();
            let command = `INSERT INTO ${tab} values (`;
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
          if (!id || !Number.isInteger(Number(id)))
              throw 'Problem with ID';
          return pool.query(`DELETE FROM ${tab} WHERE ${tab}_Id = ${id}`);
        });
    }
}

module.exports = DB;
