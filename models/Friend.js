const { Schema, model } = require('mongoose');

// define Schema for Friend creation
const FriendSchema = new Schema(
    {
        friendName: {
            type: String,
            required: true,
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

// create the Friend model using UserSchema
const Friend = model('Friend', FriendSchema);

// export the User model
module.exports = Friend;