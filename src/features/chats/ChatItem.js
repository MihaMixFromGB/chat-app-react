import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { updateChat, deleteChat } from "./chatsSlice";

import "./ChatItem.css";

export const ChatItem = ({ chat }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [newChatTitle, setNewChatTitle] = useState(chat.title);
    
    const dispatch = useDispatch();
    
    const onClickEditBtn = () => {
        if (isEdit && newChatTitle && newChatTitle !== chat.title) {
            dispatch(updateChat({
                id: chat.id,
                title: newChatTitle
            }));
        }
        
        if (!newChatTitle) setNewChatTitle(chat.title);
        setIsEdit(!isEdit);
    };
    const onNewChatTitleChanged = (event) => {
        setNewChatTitle(event.target.value.trim());
    };
    const onClickDeleteBtn = () => {
        dispatch(deleteChat(chat.id));
    };
    
    return (
        <div className="chatItem">
            { isEdit
                ?   <input
                        type="text"
                        value={newChatTitle}
                        onChange={onNewChatTitleChanged} />
                :   <Link className="text_regular" to={`${chat.id}`}>{chat.title}</Link>}
                    <input
                        type="button"
                        value="edit"
                        onClick={onClickEditBtn}
                        />
                    <input
                        type="button"
                        value="-"
                        onClick={onClickDeleteBtn}
                        />
            {/* <button onClick={onClickEditBtn}><span className="text_regular">edit</span></button>
            <button onClick={onClickDeleteBtn}><span className="text_regular">-</span></button> */}
        </div>
    )
}