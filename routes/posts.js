var express = require('express');
var router = express.Router();
const passport = require('passport');

var post_controller = require('../controllers/postController');
var commentsRouter = require('./comments');
router.use('/:postId/comments', commentsRouter);

router.get('/', post_controller.post_list);
router.post('/', passport.authenticate('jwt', {session: false}), post_controller.post_create);

router.get('/:id', post_controller.post_detail);
router.put('/:id', passport.authenticate('jwt', {session: false}), post_controller.post_update);
router.delete('/:id', passport.authenticate('jwt', {session: false}), post_controller.post_delete);


module.exports = router;

