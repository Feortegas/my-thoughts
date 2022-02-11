const { Schema, model } = require('mongoose');

// define Schema for User creation
const UserSchema = new Schema(
    {
        username: {
            type: String,
        },
        email: {
            type: String,
            unique: true,
            match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Friend'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);


UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// create the User model using UserSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;