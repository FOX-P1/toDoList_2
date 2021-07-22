const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./config/key");
const userRouter = require("./routers/userRouter");
const todoRouter = require("./routers/todoRouter");

const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/users", userRouter);
app.use("/api/todos", todoRouter);

const mongoose = require("mongoose");

mongoose
    .connect(config.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => console.log("MongoDB Connected...🥭"))
    .catch((err) => console.log(err));

// app.get("/api/todos", async (req, res) => {
//     const todos = await Todo.find({});
//     // res.send("전체 투두리스트를 가져오는 Api입니다.");
//     if (!todos) {
//         res.json({ message: "목록이 없습니다." });
//     }
//     return res.json({ todos: todos });
// });

app.listen(port, () => console.log(`Todo List v.2 listening on port ${port}!`));
