import React from "react";

const TodoItem = ({ todo, onToggle, onRemove }) => {
    return (
        <div>
            <input
                type="checkbox"
                onClick={() => onToggle(todo._id, todo.check)}
                check={todo.check}
                readOnly={true}
            />
            <span
                style={{
                    textDecoration: todo.check ? "line-through" : "none",
                }}>
                {todo.todoThing}
            </span>
            <button onClick={() => onRemove(todo._id)}>삭제</button>
        </div>
    );
};

const Todos = ({
    loadingTodos,
    input,
    todos,
    onChangeInput,
    onInsert,
    onToggle,
    onRemove,
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
