var express = require('express');
var router = express.Router();
const passport = require('passport');

var userController = require('../controllers/userController');

router.get('/', userController.user_list);
router.post('/', userController.user_create);

router.get('/:id', passport.authenticate('jwt', {session: false}), userController.user_detail);
router.put('/:id', passport.authenticate('jwt', {session: false}), userController.user_update);
router.delete('/:id', passport.authenticate('jwt', {session: false}), userController.user_delete);

module.exports = router;
