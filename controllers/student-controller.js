const Student = require('../db').Student;


exports.addStudent = async (req, res) => {
  res.render('add-edit');
}

exports.listStudents = async (req, res) => {
    //! {where: { userId: req.user.id }} lists students corresponding to that particular userId
    
  let students = await Student.findAll({ where: { userId: req.user.id },order: [
    ['firstName', 'ASC'], //updatedAt or 'firstName' or 'lastName'
  ] });
  


  res.render('list', { isAdmin: req.user.roleId === 2, students, flashes: req.flash('success') });
}



//! IMPORTANT - Ties added student to the user that added them
exports.updateStudent = async (req, res) => {
  req.body.userId = req.user.id;  //! <--- this line
  await Student.upsert(req.body); // { firstName: "bob", lastName: "Smith", userID: 2, phone: '1234', }
  console.log(req.body);

  res.redirect('/');
}




exports.deleteStudent = async (req, res) => {
  const id = req.params.id;

  await Student.destroy({where: { id}});
  res.redirect('/');  

}

exports.editStudent = async (req, res) => {
  const id = req.params.id;
  let student = await Student.findByPk(id);

  res.render('add-edit', { student });

}

