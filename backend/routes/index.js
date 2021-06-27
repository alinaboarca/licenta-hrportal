const router = require('express').Router();
const userController = require('../controllers/users');
const empController = require('../controllers/employees');
const depController = require('../controllers/departments');
const projectController = require('../controllers/projects');
const bankAccountController = require('../controllers/bankAccount');
const leaveApplicationController = require('../controllers/leaveApplication');

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
router.get('/employees/:id', empController.getEmployeeById)
router.get('/employees/user/:id', empController.getEmpByUserId)
router.get('/emp/salary', empController.getEmpsAndBankAccounts)

//bankaccount
router.post("/account",bankAccountController.createAcc);
router.get('/account',bankAccountController.getAcc);
router.put('/account/:id',bankAccountController.updateAcc);
router.delete('/account/:id',bankAccountController.deleteAcc);
router.get('/account/:id', bankAccountController.getAccByEmpId);

//departments
router.post("/departments",depController.createDep);
router.get('/departments',depController.getDep);
router.put('/departments/:id',depController.updateDep);
router.delete('/departments/:id',depController.deleteDep);

//leave
router.post("/leave",leaveApplicationController.createApplication);
router.get('/leave',leaveApplicationController.getAllApplications);
router.put('/leave/:id',leaveApplicationController.updateApplication);
router.delete('/leave/:id',leaveApplicationController.deleteApplication);
router.get('/leave/:id', leaveApplicationController.getApplicationById)
router.get('/leave/employee/:id', leaveApplicationController.getAllApplicationsForOneUser)

//projects
router.post("/projects",projectController.createProject);
router.get('/projects',projectController.getProjects);
router.put('/projects/:id',projectController.updateProject);
router.delete('/projects/:id',projectController.deleteProject);
router.post('/projects/emp', projectController.assignProjectToEmployee);
router.get('/projects/emp/:id', projectController.getAllProjectsOfOneEmployee);
module.exports = router;