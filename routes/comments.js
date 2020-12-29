var express = require('express');
var router = express.Router({mergeParams: true});
const passport = require('passport');

var commentController = require('../controllers/commentController');

router.get('/', commentController.comment_list);
router.post('/', passport.authenticate('jwt', {session: false}), commentController.comment_create);

router.get('/:id', commentController.comment_detail);
router.put('/:id', passport.authenticate('jwt', {session: false}), commentController.comment_update);
router.delete('/:id', passport.authenticate('jwt', {session: false}), commentController.comment_delete);


module.exports = router;