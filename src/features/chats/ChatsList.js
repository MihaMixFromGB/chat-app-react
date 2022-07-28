import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { ChatItem } from "./ChatItem";
import {
    selectChatIds,
    selectChatsStatus,
    getAllChats,
} from "./chatsSlice";

import "./ChatsList.css";

export const ChatsList = () => {
    const chatIds = useSelector(selectChatIds);
    const chatsStatus = useSelector(selectChatsStatus);
    
    const dispatch = useDispatch();

    useEffect(() => {
        if (chatsStatus === "idle") {
            dispatch(getAllChats());
        }
    }, [chatsStatus, dispatch]);

    const renderedChats = chatIds.map(chatId => 
        <li key={chatId}>
            <ChatItem chatId={chatId} />
        </li>
    )

    return (
        <ul className="chatsList">{renderedChats}</ul>
    )
}