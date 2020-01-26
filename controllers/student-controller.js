const Student = require('../db').Student;


exports.addStudent = async (req, res) => {
  res.render('add-edit');
}

exports.listStudents = async (req, res) => {
  console.log(req.user.id);

  let students = await Student.findAll({ where: { userId: req.user.id },order: [
    ['firstName', 'ASC'], //updatedAt or 'firstName' or 'lastName'
  ] });

  res.render('list', { students, flashes: req.flash('success') });
}

exports.updateStudent = async (req, res) => {
  req.body.userId = req.user.id;
  await Student.upsert(req.body);
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

