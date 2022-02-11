const { User } = require('../models');

const userController = {
    // get all users
    getAllUser(req, res) { 
        User.find({})
            .populate({ 
                path: 'friends',
                select: '-__v'
            })
            // .sort({ friendName: ascending()})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(404);
            });
    },

    // create user
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    }
};

module.exports = userController;