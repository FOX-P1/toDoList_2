import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoListItem from "./TodoListItem";

function TodoList({ todos, onRefresh }) {
    const onDelete = async (id) => {
        const response = await axios.delete(`/api/todos/${id}`);
        if (response.data.success) {
            alert("성공");
            onRefresh();
        }
    };

    return (
        <div>
            {todos.map((todo) => (
                <div
                    key={todo._id}
                    style={{
                        display: "flex",
                    }}>
                    {todo._id}
                    <input type="checkBox" />
                    <input type="text" placeholder={todo.todoThing} />
                    <button onClick={() => onDelete(todo._id)}>❌</button>
                    <button>🖊</button>
                </div>
            ))}
        </div>
    );
}

export default TodoList;
