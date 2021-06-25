const router = require('express').Router();
const userController = require('../controllers/users');
const empController = require('../controllers/employees');
const depController = require('../controllers/departments');
const projectController = require('../controllers/projects');

//user
router.post('/users',userController.registerUser);
router.get('/users',userController.getAllUsers);
router.put('/users/:id',userController.editUser);
router.delete('/users/:id',userController.deleteUser);
router.post('/login', userController.login);

//employees
router.post("/employees",empController.createEmployee);
router.get('/employees',empController.getEmployees);
router.put('/employees/:id',empController.updateEmployee);
router.delete('/employees/:id',empController.deleteEmployee);

//departments
router.post("/departments",depController.createDep);
router.get('/departments',depController.getDep);
router.put('/departments/:id',depController.updateDep);
router.delete('/departments/:id',depController.deleteDep);

//projects
router.post("/projects",projectController.createProject);
router.get('/projects',projectController.getProjects);
router.put('/projects/:id',projectController.updateProject);
router.delete('/projects/:id',projectController.deleteProject);
module.exports = router;