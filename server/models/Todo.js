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
        type: String,
        required: true,
        default: "unchecked",
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = { Todo };
