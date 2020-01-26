const Sequelize = require('sequelize');
const StudentModel = require('./models/student');
const UserModel = require('./models/user');

const sequelize = new Sequelize(process.env.DATABASE_URL);


const Student = StudentModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);

sequelize.sync().then( () => console.log('Tables are created'));
// { force: true } under sequelize.sync to override (delete whole
//   database every time server restarts)





module.exports = {
  Student,
  User,
}

