import React, { useState } from "react";

function TodoInsert({ onRegister }) {
    const [todoThing, setTodoThing] = useState("");

    const onChange = (event) => {
        const todoThing = event.target.value;
        setTodoThing(todoThing);
    };

    const handleRegister = () => {
        onRegister(todoThing);
        setTodoThing("");
    };

    // const [todos, setTodos] = useState(null);

    // useEffect(() => {
    //     const getTodos = async () => {
    //         try {
    //             const response = await axios.post("/api/todos");
    //             setTodos(response.data.todos);
    //         } catch (e) {
    //             console.log(e);
    //         }
    //     };
    //     getTodos();
    // }, []);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
            }}>
            <div>
                <input placeholder="할 일을 입력하세요" value={todoThing} onChange={onChange} />
            </div>
            <button onClick={handleRegister}>제출</button>
        </div>
    );
}

export default TodoInsert;
