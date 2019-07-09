const controller = require('../controllers/post.controller');
const upload = require('../middleware/upload');
const {Router} = require('express');
const router = Router();

router.post(
  '/',
  upload.single('image'),
  controller.create
);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/get/byTitle', controller.getByTitle);
router.put('/:id', controller.updatePost);

module.exports = router;
