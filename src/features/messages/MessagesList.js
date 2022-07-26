import React, { useEffect } from "react";

import { MessageItem } from "./MessageItem";

import "./MessagesList.css";

export const MessagesList = ({ messages }) => {
    const renderedMessages = messages.map(message => 
        <li key={message.id}><MessageItem message={message} /> </li>
    );

    useEffect(() => {
        const mListElement = document.getElementById("messagesList");
        mListElement.scrollTop = mListElement.scrollHeight;
    }, [messages]);

    return (
        <div className="messagesList__container">
            <ul id="messagesList" className="messagesList">{renderedMessages}</ul>
        </div>
    );
}