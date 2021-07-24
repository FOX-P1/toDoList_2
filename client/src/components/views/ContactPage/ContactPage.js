import React, { useState, useEffect } from "react";
import axios from "axios";

function ContactPage() {
    const [contacts, setContacts] = useState(null);
    const [loading, setLoading] = useState(false);
    const getContacts = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/contacts");
            setContacts(response.data.contacts);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };
    useEffect(() => {
        getContacts();
    }, []);

    const [phoneNumber, setPhoneNumber] = useState("");
    const [name, setName] = useState("");

    const onChangePhoneNumber = (event) => {
        const phoneNumber = event.target.value;
        setPhoneNumber(phoneNumber);
    };
    const onChangeName = (event) => {
        const name = event.target.value;
        setName(name);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        const payload = {
            name: name,
            phoneNumber: phoneNumber,
        };
        const response = await axios.post("/api/contacts", payload);
        if (response.data.success) {
            alert("연락처 저장에 성공!");
            getContacts();
        } else {
            alert("연락처 저장 실패!");
        }
    };

    const onDelete = async (id) => {
        const response = await axios.delete(`/api/contacts/${id}`);
        if (response.data.success) {
            alert("연락처가 삭제 되었습니다.");
            getContacts();
        } else {
            alert("연락처 삭제 실패!");
        }
    };

    if (loading) {
        return <div>대기 중...</div>;
    }
    if (!contacts) {
        return <div>저장된 연락처가 없습니다.</div>;
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100vh",
            }}>
            <h1>연락처</h1>
            <form
                const
                onSubmit={onSubmit}
                style={{
                    display: "flex",
                    flexDirection: "row",
                }}>
                <div>
                    <input placeholder="이름" defaultValue={name} onChange={onChangeName} />
                </div>
                <div>
                    <input
                        placeholder="전화번호"
                        defaultValue={phoneNumber}
                        onChange={onChangePhoneNumber}
                    />
                </div>
                <button type="submit">저장</button>
            </form>
            <div>
                {contacts.map((contact) => (
                    <div
                        key={contact._id}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "300px",
                        }}>
                        <div
                            style={{
                                width: "150px",
                            }}>
                            {contact.name}
                        </div>
                        <div
                            style={{
                                width: "150px",
                            }}>
                            {contact.phoneNumber}
                        </div>
                        <button onClick={() => onDelete(contact._id)}>😵</button>
                        {/* <input type="text" placeholder={contact.name} />
                        <input type="text" placeholder={contact.phoneNumber} /> */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ContactPage;
