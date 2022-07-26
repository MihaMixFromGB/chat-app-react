import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { MessagesList } from "./MessagesList";
import { addMessage } from "./messagesSlice";
import { selectAuthUserId } from "../users";

import "./MessagesPage.css";

export const MessagesPage = ({ chatId }) => {
    const authUserId = useSelector(state => selectAuthUserId(state));
    
    const [newMessage, setNewMessage] = useState("");

    const dispatch = useDispatch();

    const onChangeNewMessage = (event) => {
        setNewMessage(event.target.value);
    };
    const onEnterNewMessage = (event) => {
        if (event.key === "Enter") {
            addNewMessage();
        }
    };

    const addNewMessage = () => {
        if (!newMessage) return;

        dispatch(addMessage({
            chatId,
            userId: authUserId,
            text: newMessage
        }));

        setNewMessage("");
    };

    return (
        <div className="messages__container">
            <MessagesList chatId={chatId} />
            <div className="messages_toolbar">
                <input
                    type="text"
                    value={newMessage}
                    placeholder="Write a message..."
                    onChange={onChangeNewMessage}
                    onKeyUp={onEnterNewMessage} />
                <input
                    type="button"
                    value="+"
                    onClick={addNewMessage} />
            </div>
        </div>
    )
};

