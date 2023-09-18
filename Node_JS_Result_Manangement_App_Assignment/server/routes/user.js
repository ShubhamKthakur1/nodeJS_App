const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes
router.get('/teacher/login', userController.teacher_login);
router.get('/student/login', userController.student_login);
router.get('/', userController.main);
router.get('/logout', userController.logout);
router.get('/home', userController.home);
router.post('/teacher/teacherlogin', userController.view);
router.post('/student/login', userController.find);
router.get('/adduser', userController.form);
router.post('/adduser', userController.create);
router.get('/edituser/:id', userController.edit);
router.post('/edituser/:id', userController.update);
router.get('/viewuser/:id', userController.viewall);
router.get('/:id',userController.delete);
  
module.exports = router;