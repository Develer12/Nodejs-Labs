const Sequelize = require('sequelize');
let model = require('./Model/DB_Model');

const config =  {
  username: 'Develer12',
  password: 'admin',
  database: 'NodeTran',
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

          model['pulpit'](Sequelize, sequelize).belongsTo(model['faculty'](Sequelize, sequelize), {foreignKey: 'FK_PULPIT'});
          model['subject'](Sequelize, sequelize).belongsTo(model['pulpit'](Sequelize, sequelize), {foreignKey: 'FK_SUBJECT_PULPIT'});
          model['teacher'](Sequelize, sequelize).belongsTo(model['pulpit'](Sequelize, sequelize), {foreignKey: 'FK_TEACHER_PULPIT'});
          model['auditorium'](Sequelize, sequelize).belongsTo(model['auditorium_type'](Sequelize, sequelize), {foreignKey: 'AUDITORIUM_TYPENAME_NOT_NULL'});

          sequelize.sync().then(result=>{console.log(result);})
            .catch(err=> console.log("SYNC: "+err));
        })
          .catch(err=>{console.log("Connection: "+err);});
    }

    Get(tab)
    {
      return model[tab](Sequelize, sequelize).findAll();
    }

    Update(tab, fields)
    {
      return model[tab](Sequelize, sequelize).update({
          faculty: faculty,
          faculty_name: faculty_name
      });
    }

    Insert(tab, fields)
    {
      return model[tab](Sequelize, sequelize).create({
          faculty: faculty,
          faculty_name: faculty_name
      });
    }

    Delete(tab, id)
    {
      return model[tab](Sequelize, sequelize).destroy({
          faculty: faculty,
          faculty_name: faculty_name
      });    }
}

module.exports = DB;
