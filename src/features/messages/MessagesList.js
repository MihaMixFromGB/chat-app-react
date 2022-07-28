import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { MessageItem } from "./MessageItem";
import { selectMessageIds, getAllMessages } from "./messagesSlice";

import "./MessagesList.css";

export const MessagesList = ({ chatId }) => {
    const messageIds = useSelector(selectMessageIds);
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllMessages(chatId));
    }, [chatId, dispatch]);

    useEffect(() => {
        const mListElement = document.getElementById("messagesList");
        mListElement.scrollTop = mListElement.scrollHeight;
    }, [messageIds]);

    const renderedMessages = messageIds.map(messageId => 
        <li key={messageId}><MessageItem messageId={messageId} /> </li>
    );

    return (
        <div className="messagesList__container">
            <ul id="messagesList" className="messagesList">{renderedMessages}</ul>
        </div>
    );
}