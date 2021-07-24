import React, { useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

function LandingPage() {
    // useEffect(() => {
    //     axios.get("/api/hello").then((response) => console.log(response.data));
    // }, []);

    // const onClickHandler2 = async () => {
    //     const response = await axios.get(`/api/users/logout`);
    //     console.log(response.data);
    // };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100vh",
            }}>
            <h1>환영합니다!</h1>
        </div>
    );
}

export default withRouter(LandingPage);

/*

post : /api/todos
get : /api/todos
path : /api/todos/:id 

http://localhost:3002/api/users/login

*/
