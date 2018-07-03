const authHelper                                    = require('../helpers/authhelper');
const controller                                    = require('../controllers');
const authController                                = controller.auth;
const usersController                               = controller.users;


module.exports = function (app) {
    app.get('/api', function(req, res){
        res.status(200).send({message: 'Welcome to the SEAN API!'});
    });

    app.post('/api/login', authController.login);

    app.post('/api/register',  usersController.create);
    app.get('/api/users', authHelper.isAuthenticated , usersController.list);
    app.get('/api/users/:id', authHelper.isAuthenticated,usersController.retrieve);
    app.put('/api/users/:id', authHelper.isAuthenticated,usersController.update);
    app.delete('/api/users/:id', authHelper.isAuthenticated, usersController.destroy);
};