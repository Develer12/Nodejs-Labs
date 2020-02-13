const Sequelize = require('sequelize');
const model = require('./Model/DB_Model');

const config =  {
  username: 'Develer12',
  password: 'admin',
  database: 'Nodejs',
  host: 'localhost',
  dialect: 'mssql',
  dialectOptions: {
    multipleStatements: true
  }
}
let sequelize;

class DB {
    constructor(){
        sequelize = new Sequelize(config);
        sequelize.authenticate().then(()=>{
          console.log("DB Connected");
        })
          .catch(err=>{console.log('Error: '+err);});
    }

    Get(tab)
    {
      return model[tab].findAll();
    }

    Update(tab, fields)
    {
      return model[tab].update({
          faculty: faculty,
          faculty_name: faculty_name
      });
    }

    Insert(tab, fields)
    {
      return model[tab].create({
          faculty: faculty,
          faculty_name: faculty_name
      });
    }

    Delete(tab, id)
    {
      return model[tab].destroy({
          faculty: faculty,
          faculty_name: faculty_name
      });    }
}

module.exports = DB;
