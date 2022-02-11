const { Schema, model } = require('mongoose');

// define Schema for User creation
const UserSchema = new Schema(
    {
        userName: {
            type: String,
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
        ]
    }
);

// create the User model using UserSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;