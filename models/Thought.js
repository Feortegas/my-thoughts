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
            required: true
        },
        writtenBy: {
            type: String,
            required: true,
            trim: true
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
        thoughtBody: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now()
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