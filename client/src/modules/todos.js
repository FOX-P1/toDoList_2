import { handleActions } from "redux-actions";
import axios from "axios";

const CHANGE_INPUT = "todos/CHANGE_INPUT";

const CHANGE_TODOTHING = "todos/CHANGE_TODOTHING";

export const getTodosData = () => axios.get(`/api/todos`);

const GET_TODOS = "todos/GET_TODOS";
const GET_TODOS_SUCCESS = "todos/GET_TODOS_SUCCESS";
const GET_TODOS_FAILURE = "todos/GET_TODOS_FAILURE";

// export const insertData = () => axios.post(`/api/todos`);

const INSERT = "todos/INSERT";
const INSERT_SUCCESS = "todos/INSERT_SUCCESS";
const INSERT_FAILURE = "todos/INSERT_FAILURE";

const TOGGLE = "todos/TOGGLE";
const TOGGLE_SUCCESS = "todos/TOGGLE_SUCCESS";
const TOGGLE_FAILURE = "todos/TOGGLE_FAILURE";

const REMOVE = "todos/REMOVE";
const REMOVE_SUCCESS = "todos/REMOVE_SUCCESS";
const REMOVE_FAILURE = "todos/REMOVE_FAILURE";

const REVISE = "todos/REVISE";
const REVISE_SUCCESS = "todos/REVISE_SUCCESS";
const REVISE_FAILURE = "todos/REVISE_FAILURE";

/* ------------------------------------------------------------------------------------------ */

export const getTodos = () => async (dispatch) => {
    dispatch({ type: GET_TODOS });
    try {
        const response = await getTodosData();
        dispatch({
            type: GET_TODOS_SUCCESS,
            payload: response.data.todos,
        }); // 요청성공
    } catch (e) {
        dispatch({
            type: GET_TODOS_FAILURE,
            payload: e,
            error: true,
        }); // 에러 발생
        throw e;
    }
};

export const insert = (todoThing) => async (dispatch) => {
    const payload = {
        todoThing: todoThing,
    };
    dispatch({ type: INSERT });
    try {
        const response = await axios.post("/api/todos", payload);
        dispatch({
            type: INSERT_SUCCESS,
            payload: response.data.todo,
        });
    } catch (e) {
        dispatch({
            type: INSERT_FAILURE,
            payload: e,
            error: true,
        });
        throw e;
    }
};

export const toggle = (id, check) => async (dispatch) => {
    const payload = {
        id: id,
        check: !check,
    };
    dispatch({ type: TOGGLE });
    try {
        const response = await axios.patch(`/api/todos/${id}/check`, payload);
        dispatch({
            type: TOGGLE_SUCCESS,
            payload: response.data.todo,
        });
    } catch (e) {
        dispatch({
            type: TOGGLE_FAILURE,
            payload: e,
            error: true,
        });
        throw e;
    }
};

export const remove = (id) => async (dispatch) => {
    const payload = {
        id: id,
    };
    console.log("payload: ", payload);
    dispatch({ type: REMOVE });
    try {
        const response = await axios.delete(`/api/todos/${id}`, payload);
        dispatch({
            type: REMOVE_SUCCESS,
            payload: response.data.todo,
        });
    } catch (e) {
        dispatch({
            type: REMOVE_FAILURE,
            payload: e,
            error: true,
        });
        throw e;
    }
};

export const revise = (id, todoThing) => async (dispatch) => {
    const payload = {
        id: id,
        todoThing: todoThing,
    };
    console.log("payload: ", payload);
    dispatch({ type: REVISE });
    try {
        const response = await axios.patch(`/api/todos/${id}`, payload);
        dispatch({
            type: REVISE_SUCCESS,
            payload: response.data.todo,
        });
        console.log("response.data: ", response.data);
    } catch (e) {
        dispatch({
            type: REVISE_FAILURE,
            payload: e,
            error: true,
        });
        throw e;
    }
};

export const changeInput = (input) => {
    return {
        type: CHANGE_INPUT,
        input,
    };
};

export const changeTodoThing = (id, todoThing) => {
    console.log("id2: ", id);
    return {
        type: CHANGE_TODOTHING,
        id,
        todoThing,
    };
};

/* ------------------------------------------------------------------------------------------ */

const initialState = {
    input: "",
    loading: {
        GET_TODOS: false,
    },
    todos: null,
};

/* ------------------------------------------------------------------------------------------ */

const todos = handleActions(
    {
        [GET_TODOS]: (state) => ({
            ...state,
            loading: {
                ...state.loading,
                GET_TODOS: true,
            },
        }),
        [GET_TODOS_SUCCESS]: (state, action) => ({
            ...state,
            loading: {
                ...state.loading,
                GET_TODOS: false,
            },
            todos: action.payload,
        }),
        [GET_TODOS_FAILURE]: (state, action) => ({
            ...state,
            loading: {
                ...state.loading,
                GET_TODOS: false,
            },
        }),

        [INSERT]: (state) => ({
            ...state,
            loading: {
                ...state.loading,
                INSERT: true,
            },
        }),
        [INSERT_SUCCESS]: (state, action) => ({
            ...state,
            loading: {
                ...state.loading,
                INSERT: false,
            },
            todos: state.todos.concat(action.payload),
        }),
        [INSERT_FAILURE]: (state, action) => ({
            ...state,
            loading: {
                ...state.loading,
                INSERT: false,
            },
        }),

        [TOGGLE]: (state) => ({
            ...state,
            loading: {
                ...state.loading,
                TOGGLE: true,
            },
        }),
        [TOGGLE_SUCCESS]: (state, action) => ({
            ...state,
            loading: {
                ...state.loading,
                TOGGLE: false,
            },
            todos: state.todos.map((todo) =>
                todo._id === action.payload._id ? action.payload : todo
            ),
        }),
        [TOGGLE_FAILURE]: (state, action) => ({
            ...state,
            loading: {
                ...state.loading,
                TOGGLE: false,
            },
        }),

        [REMOVE]: (state) => ({
            ...state,
            loading: {
                ...state.loading,
                REMOVE: true,
            },
        }),
        [REMOVE_SUCCESS]: (state, action) => ({
            ...state,
            loading: {
                ...state.loading,
                REMOVE: false,
            },
            todos: state.todos.filter(
                (todo) => todo._id !== action.payload._id
            ),
        }),
        [REMOVE_FAILURE]: (state, action) => ({
            ...state,
            loading: {
                ...state.loading,
                REMOVE: false,
            },
        }),

        [REVISE]: (state) => ({
            ...state,
            loading: {
                ...state.loading,
                REVISE: true,
            },
        }),
        [REVISE_SUCCESS]: (state, action) => ({
            ...state,
            loading: {
                ...state.loading,
                REVISE: false,
            },
            todos: state.todos.map((todo) =>
                todo._id === action.payload._id ? action.payload : todo
            ),
        }),
        [REVISE_FAILURE]: (state, action) => ({
            ...state,
            loading: {
                ...state.loading,
                REVISE: false,
            },
        }),

        [CHANGE_INPUT]: (state, action) => {
            return {
                ...state,
                input: action.input,
            };
        },

        [CHANGE_TODOTHING]: (state, action) => {
            console.log("id3: ", action);
            return {
                ...state,
                todos: state.todos.map((todo) =>
                    todo._id === action.id
                        ? {
                              ...todo,
                              todoThing: action.todoThing,
                          }
                        : todo
                ),
            };
        },
    },
    initialState
);

export default todos;
