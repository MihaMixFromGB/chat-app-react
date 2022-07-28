import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import classNames from "classnames";

import {
    selectChatById,
    updateChat,
    deleteChat
} from "./chatsSlice";

import "./ChatItem.css";

export const ChatItem = ({ chatId }) => {
    const chat = useSelector(state => selectChatById(state, chatId));
    const { chatId: selectedChatId } = useParams();

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
                :   <Link
                        className={classNames(
                            "text_regular",
                            { "chatItem_selected": selectedChatId === chat.id }
                        )}
                        to={`${chat.id}`}>
                            {chat.title}
                    </Link>}
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
        </div>
    )
}