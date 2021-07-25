const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    todoThing: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    check: {
        type: Boolean,
        required: true,
        default: false,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = { Todo };
