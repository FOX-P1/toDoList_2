import React from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";

function NavBar(props) {
    const onClickHandler = () => {
        axios.get("/api/users/logout").then((response) => {
            if (response.data.success) {
                props.history.push("/login");
            } else {
                alert("로그아웃을 하는데 실패 했습니다.");
            }
        });
    };
    return (
        <div>
            <ul
                style={{
                    display: "flex",
                    flexDirection: "row-reverse",
                }}>
                <li>
                    <Link to="/todo">할 일</Link>
                </li>
                <li>
                    <Link to="/contact">연락처</Link>
                </li>
                <li>
                    <Link to="/todo2">할 일 투</Link>
                </li>
                <li>
                    <button onClick={onClickHandler}>로그아웃</button>
                </li>
            </ul>
            <hr />
        </div>
    );
}

export default withRouter(NavBar);
