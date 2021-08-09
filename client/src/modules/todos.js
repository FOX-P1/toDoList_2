import { handleActions } from "redux-actions";
import axios from "axios";

const CHANGE_INPUT = "todos/CHANGE_INPUT";
const REMOVE = "todos/REMOVE";

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
    // todo: {
    //     todoThing,
    //     check: false,
    // },
};

export const toggle = (id, check) => async (dispatch) => {
    const payload = {
        id: id,
        check: check,
    };
    dispatch({ type: TOGGLE });
    try {
        const response = await axios.patch(`/api/todos/${id}/check`, payload);
        dispatch({
            type: TOGGLE_SUCCESS,
            payload: response.data.todo,
        });
    } catch (e) {}
};

export const remove = (id) => ({
    type: REMOVE,
    id,
});

export const changeInput = (input) => ({
    type: CHANGE_INPUT,
    input,
});

const initialState = {
    input: "",
    loading: {
        GET_TODOS: false,
    },
    todos: null,
    // todos: [
    //     {
    //         id: 1,
    //         text: "리덕스 기초",
    //     },
    //     {
    //         id: 2,
    //         text: "리액트와 리덕스 사용하기",
    //     },
    // ],
};

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
        [CHANGE_INPUT]: (state, action) => ({
            ...state,
            input: action.input,
        }),
        [INSERT]: (state) => ({
            ...state,
            loading: {
                ...state.loading,
                POST_TODOS: true,
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
    },
    initialState
);

// function todos(state = initialState, action) {
//     switch (action.type) {
//         case CHANGE_INPUT:
//             return {
//                 ...state,
//                 input: action.input,
//             };
//         case INSERT:
//             return {
//                 ...state,
//                 todos: state.todos.concat(action.todo),
//             };
//         case TOGGLE:
//             return {
//                 ...state,
//                 todos: state.todos.map((todo) =>
//                     todo.id === action.id
//                         ? { ...todo, check: !todo.check }
//                         : todo
//                 ),
//             };
//         case REMOVE:
//             return {
//                 ...state,
//                 todos: state.todos.filter((todo) => todo.id !== action.id),
//             };
//         default:
//             return state;
//     }
// }

export default todos;
