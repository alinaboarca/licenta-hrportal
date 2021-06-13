const router = require('express').Router();
const userController = require('../controllers/users');
//user
router.post('/user',userController.registerUser);
router.post('/login', userController.login);

module.exports = router;