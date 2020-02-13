module.exports = {
  faculty: (Sequelize, sequelize) =>{
    return sequelize.define('faculty', {
        faculty: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false
        },
        faculty_name: {
            type: Sequelize.STRING
        }
    });
  },
  teacher: (Sequelize, sequelize) =>{
    return sequelize.define('teacher', {
        teacher: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false
        },
        teacher: {
            type: Sequelize.STRING
        }
    });
  }

}
