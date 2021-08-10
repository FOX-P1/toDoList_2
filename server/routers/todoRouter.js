const express = require("express");
const { auth } = require("../middleware/auth");
const { Todo } = require("../models/Todo");

const todoRouter = express.Router();

todoRouter.get("/", auth, async (req, res) => {
    const userId = req.user._id;
    try {
        const todos = await Todo.find({ userId });
        if (!todos) {
            return res.status(404).json({
                success: false,
            });
        }
        return res.status(200).json({
            success: true,
            todos,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "DB Server에 접속할 수 없습니다.",
        });
    }
});

todoRouter.post("/", auth, async (req, res) => {
    const { _id } = req.user;
    const { todoThing } = req.body;
    try {
        const todo = await Todo.create({
            todoThing,
            userId: _id,
        });
        return res.status(200).json({
            success: true,
            todo,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "업로드에 실패하였습니다.",
        });
    }
});

todoRouter.patch("/:id([0-9a-f]{24})", auth, async (req, res) => {
    const id = req.params.id;
    const todo = await Todo.findByIdAndUpdate(
        id,
        {
            todoThing: req.body.todoThing,
        },
        { new: true }
    );
    console.log("todo: ", todo);
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
    const { check } = req.body;

    try {
        const todo = await Todo.findByIdAndUpdate(
            id,
            {
                check,
            },
            { new: true }
        );
        if (!todo) {
            return res.status(404).json({
                success: false,
            });
        }
        return res.status(200).json({
            success: true,
            todo: todo,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "서버 에러",
        });
    }
    // const todo = await Todo.findByIdAndUpdate(id, {
    //     todo) => todo._id === id ? {...todo, check: ! todo.check } : todo
    // });
    // if (!todo.check) {
    //     todo.check = "checked";
    //     return todo.save();
    // }
    // todo.check = "unchecked";
    // return todo.save();

    // if (!todo) {
    //     return res.status(400).json({
    //         success: false,
    //     });
    // }
    // return res.status(200).json({
    //     success: true,
    // });
});

todoRouter.delete("/:id([0-9a-f]{24})", auth, async (req, res) => {
    const id = req.params.id;
    try {
        todo = await Todo.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            todo,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
        });
    }
});

module.exports = todoRouter;
