import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { ChatsList } from "./ChatsList";
import { MessagesPage } from "../messages/";
import { selectChats, addChat } from "./chatsSlice";

import "./ChatsPage.css";

const MessagesPageExcerpt = React.memo(MessagesPage);

export const ChatsPage = () => {
    const [newChat, setNewChat] = useState("");
    const [isValidNewChat, setIsValidNewChat] = useState(false);

    const chats = useSelector(selectChats);

    const { chatId } = useParams();

    const dispatch = useDispatch();

    const onChangeNewChat = (event) => {
        setNewChat(event.target.value);
    };
    const addNewChat = () => {
        dispatch(addChat(newChat));
        setNewChat("")
    };

    useEffect(() => {
        if (newChat && !chats.some(chat => chat.title === newChat)) {
            setIsValidNewChat(true);
        } else {
            setIsValidNewChat(false);
        }
    }, [chats, newChat, setIsValidNewChat]);

    const onEnterNewChat = (event) => {
        if (isValidNewChat && event.key === "Enter") {
            addNewChat();
        }
    };

    return (
        <div className="chats__container">
            <div className="chatNavbar">
                <div className="chatNavbar__toolbar">
                    <input
                        type="text"
                        value={newChat}
                        placeholder="Create a new chat..."
                        onChange={onChangeNewChat}
                        onKeyUp={onEnterNewChat} />
                    <input
                        type="button"
                        value="+"
                        disabled={!isValidNewChat}
                        onClick={addNewChat} />
                </div>
                <ChatsList />
            </div>
            <div className="chatMessages">
                {!chatId
                    ? <span className="text_regular">Please select a chat to start messaging</span>
                    : <MessagesPageExcerpt chatId={chatId}/>
                }
            </div>
        </div>
    )
};