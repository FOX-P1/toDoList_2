import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";

function TodoInsert() {
    const [value, setValue] = useState("");

    const onChange = useCallback((e) => {
        setValue(e.target.value);
    }, []);

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
        <form className="TodoInsert">
            <input placeholder="할 일을 입력하세요" value={value} onChange={onChange} />
            <button type="submit">제출</button>
        </form>
    );
}

export default TodoInsert;
