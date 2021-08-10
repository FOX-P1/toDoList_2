import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
    getTodos,
    changeInput,
    insert,
    toggle,
    remove,
    changeTodoThing,
    revise,
} from "../modules/todos";
import Todos from "../components/Todos";

const TodosContainer = ({
    getTodos,
    loadingTodos,
    input,
    todos,
    changeInput,
    insert,
    toggle,
    remove,
    changeTodoThing,
    revise,
}) => {
    useEffect(() => {
        getTodos();
    }, [getTodos, insert]);
    return (
        <Todos
            loadingTodos={loadingTodos}
            input={input}
            todos={todos}
            onChangeInput={changeInput}
            onInsert={insert}
            onToggle={toggle}
            onRemove={remove}
            onChangeTodoThing={changeTodoThing}
            onRevise={revise}
        />
    );
};

export default connect(
    ({ todos }) => ({
        input: todos.input,
        todos: todos.todos,
        loadingTodos: todos.loading.GET_TODOS,
    }),
    {
        getTodos,
        changeInput,
        insert,
        toggle,
        remove,
        changeTodoThing,
        revise,
    }
)(TodosContainer);
