import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";

import {
    getAllChatsFb,
    setChatFb,
    deleteChatFb
} from "../../api/database";

export const getAllChats = createAsyncThunk(
    "chats/getAllChats",
    async () => {
        const chats = await getAllChatsFb();
        return chats;
    }
);
export const addChat = createAsyncThunk(
    "chats/addChat",
    async (chatTitle) => {
        const newChat = {
            id: nanoid(),
            title: chatTitle
        }
        await setChatFb(newChat);
        return newChat;
    }
);
export const updateChat = createAsyncThunk(
    "chats/updateChat",
    async (chat) => {
        await setChatFb(chat);
        return chat;
    }
);
export const deleteChat = createAsyncThunk(
    "chats/deleteChat",
    async (chatId) => {
        await deleteChatFb(chatId);
        return chatId;
    }
);

const chatsAdapter = createEntityAdapter({
    sortComparer: (a, b) => a.title.localeCompare(b.title)
});

const initialState = chatsAdapter.getInitialState({
    status: "idle",
    error: ""
});

const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    extraReducers(builder) {
        builder
            // getAllChats
            .addCase(getAllChats.pending, (state, action) => {
                state.status = "loading";
                state.error = "";
            })
            .addCase(getAllChats.fulfilled, (state, action) => {
                state.status = "succeeded";
                chatsAdapter.setAll(state, action.payload)
            })
            .addCase(getAllChats.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            // addChat
            .addCase(addChat.pending, (state, action) => {
                state.status = "loading";
                state.error = "";
            })
            .addCase(addChat.fulfilled, (state, action) => {
                state.status = "succeeded";
                chatsAdapter.addOne(state, action.payload);
            })
            .addCase(addChat.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            // updateChat
            .addCase(updateChat.pending, (state, action) => {
                state.status = "loading";
                state.error = "";
            })
            .addCase(updateChat.fulfilled, (state, action) => {
                state.status = "succeeded";
                const { id, title } = action.payload;
                const existingChat = state.entities[id];
                if (existingChat) {
                    existingChat.title = title;
                }
            })
            .addCase(updateChat.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            // deleteChat
            .addCase(deleteChat.pending, (state, action) => {
                state.status = "loading";
                state.error = "";
            })
            .addCase(deleteChat.fulfilled, (state, action) => {
                state.status = "succeeded";
                chatsAdapter.removeOne(state, action.payload);
            })
            .addCase(deleteChat.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
    }
});

export const {
    selectAll: selectChats,
    selectById: selectChatById,
    selectIds: selectChatIds
} = chatsAdapter.getSelectors(state => state.chats);

export const selectChatsStatus = (state) => state.chats.status;

export default chatsSlice.reducer;