const { Router } = require('express');
const { TokenController } = require('controllers');

const router = Router();

router.post('/', TokenController.refreshAccessToken);

module.exports = router;
