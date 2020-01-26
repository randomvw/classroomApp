const Student = require('../db').Student;


exports.addStudent = async (req, res) => {
  res.render('add-edit');
}

exports.listStudents = async (req, res) => {
  let students = await Student.findAll({ order: [
    ['firstName', 'ASC'], //updatedAt or 'firstName' or 'lastName'
  ] });

  res.render('list', { students });
}

exports.updateStudent = async (req, res) => {
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

