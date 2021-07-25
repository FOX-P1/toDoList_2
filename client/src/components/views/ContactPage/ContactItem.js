import React, { useState, useEffect } from "react";

function ContactItem({ contact, onDelete, onUpdate }) {
    // console.log(props.contact);
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    // const { contact } = props;
    const onChangePhoneNumber = (event) => {
        const phoneNumber = event.target.value;
        // setPhoneNumber(phoneNumber);
        onUpdate;
    };
    const onChangeName = (event) => {
        const name = event.target.value;
        setName(name);
    };

    const handleUpdate = () => {
        onUpdate(contact._id, name, phoneNumber);
    };
    const handleDelete = () => {
        onDelete(contact._id);
    };
    /*
         useEffect 를 이용해 contact 가 변경 될 때 render  한다. 
    */
    useEffect(() => {
        setName(contact.name);
        setPhoneNumber(contact.phoneNumber);
    }, [contact]);
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
            }}>
            <div>
                <input type="text" value={name} onChange={onChangeName} />
            </div>
            <div>
                <input type="text" value={phoneNumber} onChange={onChangePhoneNumber} />
            </div>
            <button onClick={handleUpdate}>수정</button>
            <button onClick={handleDelete}>삭제</button>
        </div>
    );
}
export default ContactItem;
