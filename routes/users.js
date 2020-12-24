var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController');

router.get('/', userController.user_list);
router.post('/', userController.user_create);

router.get('/:id', userController.user_detail);
router.put('/:id', userController.user_update);
router.delete('/:id', userController.user_delete);

module.exports = router;
