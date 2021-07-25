import React, { useState, useEffect } from "react";

function TodoList({ todo, onDelete, onToggle }) {
    const [todoThing, setTodoThing] = useState("");
    const [check, setCheck] = useState(false);

    const onChange = (event) => {
        const todoThing = event.target.value;
        setTodoThing(todoThing);
    };
    const onCheckChange = (event) => {
        const check = event.target.checked;
        // setCheck(check);
        onToggle(todo._id, check);
    };

    const handleDelete = () => {
        onDelete(todo._id);
    };

    useEffect(() => {
        setTodoThing(todo.todoThing);
        setCheck(todo.check);
    }, [todo]);

    return (
        <div
            style={{
                display: "flex",
            }}>
            <input type="checkBox" name="checkBox" checked={check} onChange={onCheckChange} />
            <input type="text" value={todoThing} onChange={onChange} />
            <button onClick={handleDelete}>❌</button>
            <button>🖊</button>
        </div>
    );
}

export default TodoList;
