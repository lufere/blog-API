var express = require('express');
var router = express.Router();

var post_controller = require('../controllers/postController');
var commentsRouter = require('./comments');
router.use('/:userId/comments', commentsRouter);

router.get('/', post_controller.post_list);
router.post('/', post_controller.post_create);

router.get('/:id', post_controller.post_detail);
router.put('/:id', post_controller.post_update);
router.delete('/:id', post_controller.post_delete);


module.exports = router;

