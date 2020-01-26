module.exports = (sequelize, Sequelize) => {
  return sequelize.define('student', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING, 
    phone: Sequelize.STRING, 
  }, { freezeTableName: true })
}