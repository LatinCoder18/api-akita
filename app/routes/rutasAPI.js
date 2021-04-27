
//Rutas de la API
var router = require('express').Router();
//var {createUserSchemaValidate} = require('../middlewares/validators/userValidator');

// import all controllers
const userController = require('../controllers/UserController');
const negocioController = require('../controllers/NegocioController');
const authController = require('../controllers/authController.js');
const auth = require('../middlewares/auth-passport');
const awaitHandlerFactory = require('../middlewares/awaitHandlerFactory.middleware');

// Rutas localhost:3000/api/v1/....
//Rutas de User
router.get('/userAll', awaitHandlerFactory(userController.getAllUsers)); // localhost:3000/api/v1/users
router.get('/id/:id',awaitHandlerFactory(userController.getUserById)); // localhost:3000/api/v1/users/id/1
//router.post('/', createUserSchemaValidate, awaitHandlerFactory(userController.createUser)); // localhost:3000/api/v1/users
router.post('/user', awaitHandlerFactory(userController.createUser)); // localhost:3000/api/v1/users

router.get('/username', awaitHandlerFactory(userController.getUserByuserName)); // localhost:3000/api/v1/users/usersname/julia
/*router.get('/whoami', auth(), awaitHandlerFactory(userController.getCurrentUser)); // localhost:3000/api/v1/users/whoami
router.patch('/id/:id', auth(Role.Admin), updateUserSchema, awaitHandlerFactory(userController.updateUser)); // localhost:3000/api/v1/users/id/1 , using patch for partial update
router.delete('/id/:id', auth(Role.Admin), awaitHandlerFactory(userController.deleteUser)); // localhost:3000/api/v1/users/id/1
*/

//router.post('/login', validateLogin, awaitHandlerFactory(userController.userLogin)); // localhost:3000/api/v1/users/login
router.post('/auth/login', awaitHandlerFactory(authController.userLogin));
router.get('/auth/user', auth ,authController.getAuth); // localhost:3000/api/v1/users/login

//Rutas para los Negocios
//router.post('/negocio/login', awaitHandlerFactory(authController.negocioLogin));
//router.get('/negocio/login', auth ,authController.getAuth);
//router.post('/negocio/logout', auth ,authController.getAuth);

router.get('/negocio', awaitHandlerFactory(negocioController.getAllNegocios)); 
router.get('/negocio/:id',awaitHandlerFactory(negocioController.getNegocioById));
//router.post('/', createNegocioValidate, awaitHandlerFactory(userController.createUser));
router.post('/negocio', awaitHandlerFactory(negocioController.createNegocio));
router.patch('/negocio/:id', awaitHandlerFactory(negocioController.updateUser));
router.delete('/negocio/:id', awaitHandlerFactory(negocioController.deleteUser));


module.exports = router;
