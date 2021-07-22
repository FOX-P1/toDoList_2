import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import TodoPage from "./components/views/TodoPage/TodoPage";
import Auth from "./hoc/auth";
import NavBar from "./components/views/NavBar/NavBar";

function App() {
    //     const history = useHistory();
    //     const onClickHandler = () => {
    //         axios.get("/api/users/logout").then((response) => {
    //             if (response.data.success) {
    //                 history.push("/login");
    //             } else {
    //                 alert("로그아웃을 하는데 실패 했습니다.");
    //             }
    //         });
    //     };

    return (
        <Router>
            <div>
                {/*
            A <Switch> looks through all its children <Route>
            elements and renders the first one whose path
            matches the current URL. Use a <Switch> any time
            you have multiple routes, but you want   only one
            of them to render at a time
          */}
                <Route exact path={["/", "/todo"]} component={Auth(NavBar, true)} />

                <Switch>
                    <Route exact path="/" component={Auth(LandingPage, true)} />
                    <Route path="/login" component={Auth(LoginPage, false)} />
                    <Route path="/register" component={Auth(RegisterPage, false)} />
                    <Route path="/todo" component={Auth(TodoPage, true)} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
