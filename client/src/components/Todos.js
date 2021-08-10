import React from "react";

const TodoItem = ({
    todo,
    onToggle,
    onRemove,
    onRevise,
    onChangeTodoThing,
}) => {
    const handleChange = (e) => {
        console.log("id: ", todo._id);
        onChangeTodoThing(todo._id, e.target.value);
    };
    // function onChange(e) {

    // }
    return (
        <div>
            <input
                type="checkbox"
                onClick={() => onToggle(todo._id, todo.check)}
                checked={todo.check}
                readOnly={true}
            />
            <input
                type="text"
                style={{
                    textDecoration: todo.check ? "line-through" : "none",
                }}
                value={todo.todoThing}
                onChange={handleChange}
            />
            <button onClick={() => onRemove(todo._id)}>삭제</button>
            <button onClick={() => onRevise(todo._id, todo.todoThing)}>
                수정
            </button>
        </div>
    );
};

const Todos = ({
    loadingTodos,
    input,
    todos,
    onChangeTodoThing,
    onChangeInput,
    onInsert,
    onToggle,
    onRemove,
    onRevise,
}) => {
    const onSubmit = (e) => {
        e.preventDefault();
        onInsert(input);
        onChangeInput("");
    };

    const onChange = (e) => onChangeInput(e.target.value);

    return (
        <div>
            <section>
                <h1>할 일</h1>
                {loadingTodos && "로딩 중..."}
                {!loadingTodos && todos && (
                    <div>
                        <form onSubmit={onSubmit}>
                            <input
                                placeholder="할 일을 입력하세요"
                                value={input}
                                onChange={onChange}
                            />
                            <button type="submit">등록</button>
                        </form>
                        <div>
                            {todos.map((todo) => (
                                <TodoItem
                                    todo={todo}
                                    key={todo._id}
                                    onToggle={onToggle}
                                    onRemove={onRemove}
                                    onRevise={onRevise}
                                    onChangeTodoThing={onChangeTodoThing}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Todos;
