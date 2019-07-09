const controller = require('../controllers/user.controller');
const {Router} = require('express');
const router = Router();

router.delete('/:id', controller.deleteAccount);
router.post('/check/:id', controller.checkPassword);
router.put('/update/:id', controller.updatePassword);

module.exports = router;
