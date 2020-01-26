const router = require('express').Router();
const studentController = require('../controllers/student-controller');
const User = require('../db').User;
const passport = require('passport');
const authController = require('../controllers/auth.controller');


router.get('/', authController.isLoggedIn, studentController.listStudents);
router.get('/add', authController.isLoggedIn, studentController.addStudent);
router.post('/update', authController.isLoggedIn, studentController.updateStudent);
router.get('/delete/:id', authController.isLoggedIn, studentController.deleteStudent);
router.get('/edit/:id', authController.isLoggedIn, studentController.editStudent);
router.get('/register', authController.registerPage);
router.post('/register', authController.registerUser);
router.get('/login', authController.loginPage);
router.post('/login', authController.loginUser);
router.get('/logout', authController.logout);





module.exports = router;