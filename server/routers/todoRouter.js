const express = require("express");
const { auth } = require("../middleware/auth");
const { Todo } = require("../models/Todo");

const todoRouter = express.Router();

todoRouter.get("/", auth, async (req, res) => {
    const userId = req.user._id;
    const todos = await Todo.find({ userId });
    if (!todos) {
        return res.status(404).json({
            success: false,
        });
    }
    return res.status(200).json({
        success: true,
        todos: todos,
    });
});

todoRouter.post("/", auth, async (req, res) => {
    const { _id } = req.user;
    try {
        const newTodo = await Todo.create({
            todoThing: req.body.todoThing,
            userId: req.user._id,
        });
        // const user = await User.findById({ _id });
        // console.log(user.todos);
        // user.todos.push(newTodo._id);
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "업로드에 실패하였습니다.",
        });
    }
    return res.status(200).json({
        success: true,
    });
});

todoRouter.patch("/:id([0-9a-f]{24})", auth, async (req, res) => {
    const id = req.params.id;
    const todo = await Todo.findByIdAndUpdate(id, {
        todoThing: req.body.todoThing,
    });
    if (!todo) {
        return res.status(400).json({
            success: false,
        });
    }
    return res.status(200).json({
        success: true,
        todo: todo,
    });
});

todoRouter.patch("/:id([0-9a-f]{24})/check", auth, async (req, res) => {
    const id = req.params.id;
    const todo = await Todo.findByIdAndUpdate(id, {
        check: "checked",
    });
    // if (!todo.check) {
    //     todo.check = "checked";
    //     return todo.save();
    // }
    // todo.check = "unchecked";
    // return todo.save();
    if (!todo) {
        return res.status(400).json({
            success: false,
        });
    }
    return res.status(200).json({
        success: true,
    });
});

todoRouter.delete("/:id([0-9a-f]{24})", auth, async (req, res) => {
    let todo;
    const id = req.params.id;

    todo = await Todo.findByIdAndDelete(id);

    if (!todo)
        return res.status(400).json({
            success: false,
        });
    return res.status(200).json({
        success: true,
        todo: todo,
    });
});

module.exports = todoRouter;
