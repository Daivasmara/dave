const { Router } = require('express');
const { UserController } = require('controllers');
const { auth } = require('middlewares');
const { ROLES } = require('helpers/constants');

const router = Router();

router.get('/', auth(), UserController.getAll, UserController.getOne);

router.post('/signup', UserController.signUp);
router.post('/login', UserController.logIn);

router.delete('/:id', auth([ROLES.admin]), UserController.deleteOne);
router.patch('/:id', auth([ROLES.admin]), UserController.patchOne);

module.exports = router;
