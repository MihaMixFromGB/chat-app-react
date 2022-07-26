import { configureStore } from "@reduxjs/toolkit";

import chatsReducer from "../features/chats/chatsSlice";
import usersReducer from "../features/users/usersSlice";
import messagesReducer from "../features/messages/messagesSlice";

export default configureStore({
    reducer: {
        chats: chatsReducer,
        users: usersReducer,
        messages: messagesReducer
    }
});