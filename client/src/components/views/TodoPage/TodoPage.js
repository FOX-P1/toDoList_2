import React, { useEffect } from "react";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";

function TodoPage(props) {
    useEffect(() => {
        axios.get("/api/todos").then((response) => console.log(response.data));
    }, []);

    // const onClickHandler2 = async () => {
    //     const response = await axios.get(`/api/users/logout`);
    //     console.log(response.data);
    // };

    return (
        <form
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100vh",
            }}>
            <h1>할일 목록</h1>
            <div>
                <input type="text" placeholder="할일을 적으세요" />
                <input type="submit" Value="add todo" />
            </div>
            <div>
                <input type="checkbox"></input>
                <span>밥먹기</span>
                <button>수정하기</button>
            </div>
            <div>
                <input type="checkbox"></input>
                <span>화장실가기</span>
                <button>수정하기</button>
            </div>
            <div>
                <input type="checkbox"></input>
                <span>노래하기</span>
                <button>수정하기</button>
            </div>
        </form>
    );
}

export default withRouter(TodoPage);

/*

post : /api/todos
get : /api/todos
path : /api/todos/:id 

http://localhost:3002/api/users/login

*/
