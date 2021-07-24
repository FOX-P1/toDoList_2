import React, { useState, useEffect } from "react";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import TodoList from "./TodoList";

function TodoPage() {
    const [todos, setTodos] = useState(null);
    const [loading, setLoading] = useState(false);
    const getTodos = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/todos");
            console.log(response.data.todos);
            setTodos(response.data.todos);
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    };
    useEffect(() => {
        getTodos();
    }, []);

    const [value, setValue] = useState("");
    const onChange = (event) => {
        const { value } = event.target;
        setValue(value);
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        const payload = {
            todoThing: value,
        };

        const response = await axios.post("/api/todos", payload);
        if (response.data.success) {
            alert("데이터 저장에 성공했습니다.");
            getTodos();
        } else {
            alert("실패");
        }
    };

    if (loading) {
        return <form>대기 중...</form>;
    }
    if (!todos) {
        return null;
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100vh",
            }}>
            <h1>ToDo List</h1>
            <form className="TodoInsert" onSubmit={onSubmit}>
                <input placeholder="할 일을 입력하세요" value={value} onChange={onChange} />
                <button type="submit">제출</button>
            </form>
            <div>
                <TodoList todos={todos} onRefresh={getTodos} />
                {/* <input type="text" placeholder={todo.todoThing} /> */}
            </div>
        </div>
    );
}

export default withRouter(TodoPage);

/*

post : /api/todos
get : /api/todos
path : /api/todos/:id 

http://localhost:3002/api/users/login

*/
