const { Schema, model } = require('mongoose');

// define Schema for Reaction creation
const ReactionSchema = new Schema(
    {

        // set custom id to avoid confusion with parent comment _id
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            // match: [`^[A-Za-z0-9\W]{1,280}$`, 'Please enter a text between 1 and 280 characters']
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now()
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

// define Schema for Thought creation
const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            // match: [`^[A-Za-z0-9\W]{1,280}$`, 'Please enter a text between 1 and 280 characters']
        },
        createdAt: {
            type: Date,
            default: Date.now()
        },
        username: {
            type: String,
            required: true
        },
        // use ReplySchema to validate data for a reply
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });

// create the Thought model using UserSchema
const Thought = model('Thought', ThoughtSchema);

// export the Thought model
module.exports = Thought;