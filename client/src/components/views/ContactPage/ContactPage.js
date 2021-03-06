import React, { useState, useEffect } from "react";
import axios from "axios";
import ContactItem from "./ContactItem";
import ContactInsert from "./ContactInsert";

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

    const onRegister = async (name, phoneNumber) => {
        const payload = {
            name: name,
            phoneNumber: phoneNumber,
        };
        try {
            const response = await axios.post("/api/contacts", payload);
            if (response.data.success) {
                console.log(response.data.contact);
                setContacts(contacts.concat(response.data.contact));

                alert("연락처 저장에 성공!");
            } else {
                alert("연락처 저장 실패!");
            }
        } catch (error) {
            alert("저장에 실패하였습니다.");
            console.log(error);
        }
    };

    const onDelete = async (id) => {
        const response = await axios.delete(`/api/contacts/${id}`);
        console.log(response.data.contact);
        if (response.data.success) {
            setContacts(contacts.filter((contact) => contact._id !== id));
            alert("연락처가 삭제 되었습니다.");
        } else {
            alert("연락처 삭제 실패!");
        }
    };

    const onUpdate = async (id, name, phoneNumber) => {
        const payload = {
            name,
            phoneNumber,
        };
        console.log(payload);
        const response = await axios.patch(`/api/contacts/${id}`, payload);
        if (response.data.success) {
            const newContact = response.data.contact;
            setContacts(contacts.map((contact) => (contact._id === id ? newContact : contact)));
            alert("연락처가 수정 되었습니다.");
        } else {
            alert("연락처 수정 실패!");
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
            <ContactInsert onRegister={onRegister} />
            <div>
                {contacts.map((contact) => (
                    <ContactItem
                        key={contact._id}
                        contact={contact}
                        onDelete={onDelete}
                        onUpdate={onUpdate}
                    />
                ))}
            </div>
        </div>
    );
}

export default ContactPage;
