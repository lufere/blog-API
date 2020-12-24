var User = require('../models/user');

exports.user_list = (req, res, next) => {
    res.send('Get all users');
}

exports.user_create = (req, res, next) => {
    res.send('Create a new user');
}

exports.user_detail = (req, res, next) => {
    res.send('Show user with id: ' + req.params.id);
}

exports.user_update = (req, res, next) => {
    res.send('Update user with id: ' + req.params.id);
}

exports.user_delete = (req, res, next) => {
    res.send('Delete user with id: ' + req.params.id);
}