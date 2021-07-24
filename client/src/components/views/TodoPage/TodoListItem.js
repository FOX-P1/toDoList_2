import React from "react";
import cn from "classnames";

const TodoListItem = ({ todo }) => {
    const { todoThing, check } = todo;
    return (
        <div className="TodoListItem">
            <div className={cn("checkbox", { check })}>
                {check ? (
                    <input type="checkBox" check="checked" />
                ) : (
                    <input type="checkBox" check="unchecked" />
                )}
            </div>
            <input type="text" placeholder={todoThing} />
            <div className="remove">
                <button>❌</button>
            </div>
            <div className="modify">
                <button>🖊</button>
            </div>
        </div>
    );
};

export default TodoListItem;
