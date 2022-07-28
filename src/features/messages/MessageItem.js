import React from "react";
import { useSelector } from "react-redux";
import { parseISO, format } from "date-fns";
import classNames from "classnames";

import "./MessageItem.css";
import { selectMessageById } from "./messagesSlice";
import { selectUserNicknameById, selectAuthUserId } from "../users";

export const MessageItem = ({ messageId }) => {
    const message = useSelector(state => selectMessageById(state, messageId));
    const nickname = useSelector(state => selectUserNicknameById(state, message.user));
    const authUserId = useSelector(state => selectAuthUserId(state));

    return (
        <div className={classNames(
            "message__container",
            {
                "message_toRight": authUserId === message.user
            }
        )}>
            <p className="message_author text_light">
                {nickname}
            </p>
            <p className="message_text text_regular">
                {message.text}
            </p>
            <p className="message_date text_light">
                {format(parseISO(message.date), "dd-MM-yyyy HH:mm:ss")}
            </p>
        </div>
    )
}