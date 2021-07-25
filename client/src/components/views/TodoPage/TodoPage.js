import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoList from "./TodoList";
import TodoInsert from "./TodoInsert";

function TodoPage() {
    const [todos, setTodos] = useState(null);
    const [loading, setLoading] = useState(false);
    const getTodos = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/todos");
            setTodos(response.data.todos);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };
    useEffect(() => {
        getTodos();
    }, []);

    const onRegister = async (todoThing) => {
        const payload = {
            todoThing: todoThing,
        };
        try {
            const response = await axios.post("/api/todos", payload);
            if (response.data.success) {
                alert("데이터 저장에 성공했습니다.");
                setTodos(todos.concat(response.data.todo));
            } else {
                alert("실패");
            }
        } catch (error) {
            alert("저장에 실패!");
            console.log(error);
        }
    };

    const onDelete = async (id) => {
        try {
            const response = await axios.delete(`/api/todos/${id}`);
            if (response.data.success) {
                setTodos(todos.filter((contact) => contact._id !== id));
                alert("할 일이 삭제 되었습니다.");
            } else {
                alert("연락처 삭제 실패");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onToggle = async (id, check) => {
        try {
            const response = await axios.patch(`/api/todos/${id}/check`, {
                check,
            });
            if (response.data.success) {
                const newTodo = response.data.todo;
                setTodos(todos.map((todo) => (todo._id === id ? newTodo : todo)));
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (loading) {
        return <form>대기 중...</form>;
    }
    if (!todos) {
        return <div>저장된 할 일이 없습니다.</div>;
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
            <TodoInsert onRegister={onRegister} />
            <div>
                {todos.map((todo) => (
                    <TodoList key={todo._id} todo={todo} onDelete={onDelete} onToggle={onToggle} />
                ))}
            </div>
        </div>
    );
}

export default TodoPage;

/*

post : /api/todos
get : /api/todos
path : /api/todos/:id 

http://localhost:3002/api/users/login

*/
