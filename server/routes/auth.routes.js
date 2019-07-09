const controller = require('../controllers/auth.controller');
const {Router} = require('express');
const router = Router();

router.post('/login', controller.login);
router.post('/registration', controller.registration);

module.exports = router;
