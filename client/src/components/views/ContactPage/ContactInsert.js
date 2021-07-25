import React, { useState } from "react";

function ContactInsert({ onRegister }) {
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const onNewPhoneNumber = (event) => {
        const phoneNumber = event.target.value;
        setPhoneNumber(phoneNumber);
    };
    const onNewName = (event) => {
        const name = event.target.value;
        setName(name);
    };
    const handleRegister = () => {
        onRegister(name, phoneNumber);
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
            }}>
            <div>
                <input placeholder="이름" defaultValue={name} onChange={onNewName} />
            </div>
            <div>
                <input placeholder="전화번호" value={phoneNumber} onChange={onNewPhoneNumber} />
            </div>
            <button onClick={handleRegister}>저장</button>
        </div>
    );
}

export default ContactInsert;
