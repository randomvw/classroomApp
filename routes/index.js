const router = require('express').Router();
const studentController = require('../controllers/student-controller');
const User = require('../db').User;
const passport = require('passport');
const authController = require('../controllers/auth.controller');


router.get('/register', authController.registerPage);
router.post('/register', authController.registerUser, authController.loginUser);
router.get('/login', authController.loginPage);
router.post('/login', authController.loginUser);
router.get('/logout', authController.logout);

router.use(authController.isLoggedIn);
router.get('/', studentController.listStudents);
router.get('/add', studentController.addStudent);
router.post('/update', studentController.updateStudent);
router.get('/delete/:id', studentController.deleteStudent);
router.get('/edit/:id', studentController.editStudent);






module.exports = router;