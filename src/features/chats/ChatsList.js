import React from "react";

import { ChatItem } from "./ChatItem";

import "./ChatsList.css";

export const ChatsList = ({ chats }) => {
    const renderedChats = chats.map(chat => 
        <li key={chat.id}>
            <ChatItem chat={chat} />
        </li>
    )

    return (
        <ul className="chatsList">{renderedChats}</ul>
    )
}