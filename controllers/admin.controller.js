const User = require('../db').User;
const Role = require('../db').Role;

exports.listUsers = async (req, res) => {
  // Get all of the users
  let users = await User.findAll({
    include: [
      { model: Role,
        as: 'role',
        required: true,
      }
    ]
  });

  let roles = await Role.findAll();
  console.log(roles[0].name);
  

users = users.map(user => {
  user.roles = JSON.parse(JSON.stringify(roles));
  user.roles = user.roles.map(role => {
    if (role.id === user.roleId) {
      role.selected = true;
    }
    return role;
  })
  return user;
})

console.log(users);

  // Render the users page
  res.render('users', { users });
}

exports.updateRoles = async (req, res) => {
  for (let userId in req.body) {
    let roleId = req.body[userId];

    let user = await User.findByPk(userId);

    user.roleId = roleId;
    await user.save();
  }


  console.log(req.body);
  res.redirect('/admin');
}