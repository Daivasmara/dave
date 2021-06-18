const { Router } = require('express');
const { user, token } = require('versions/v1/routes');

const router = Router();

router.use('/user', user);
router.use('/token', token);

module.exports = router;
