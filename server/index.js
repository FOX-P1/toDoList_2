const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./config/key");
const userRouter = require("./routers/userRouter");
const todoRouter = require("./routers/todoRouter");
const contactRouter = require("./routers/contactRouter");

const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/users", userRouter);
app.use("/api/todos", todoRouter);
app.use("/api/contacts", contactRouter);

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

app.listen(port, () => console.log(`Todo List v.2 listening on port ${port}!`));
