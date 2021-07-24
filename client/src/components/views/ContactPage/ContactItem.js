import axios from "axios";
import React, { useState } from "react";

function ContactItem({ contact, onDelete }) {
    // console.log(props.contact);

    // const { contact } = props;
    return (
        <div
            // key={contact._id}
            style={{
                display: "flex",
                justifyContent: "space-between",
            }}>
            <form
                style={{
                    display: "flex",
                    flexDirection: "row",
                }}>
                <div>
                    <input type="text" placeholder={contact.name} />
                    {/* <input
                        type="text"
                        placeholder={contact.name}
                        defaultValue={name}
                        onChange={onChangeName}
                    /> */}
                </div>
                <div>
                    <input type="text" placeholder={contact.phoneNumber} />
                    {/* <input
                        type="INT"
                        placeholder={contact.phoneNumber}
                        defaultValue={phoneNumber}
                        onChange={onChangePhoneNumber}
                    /> */}
                </div>
                <button type="submit">수정</button>
            </form>
            <button onClick={() => onDelete(contact._id)}>삭제</button>
        </div>
    );
}
export default ContactItem;
