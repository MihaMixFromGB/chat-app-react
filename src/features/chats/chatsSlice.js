import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
        chats.sort(sortMethod);
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

const initialState = {
    status: "idle",
    error: "",
    chats: []
};

const sortMethod = (a, b) => a.title.localeCompare(b.title);

const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        addChatToLocalStore(state, action) {
            state.chats.push({
                id: nanoid(),
                title: action.payload
            })
        }
    },
    extraReducers(builder) {
        builder
            // getAllChats
            .addCase(getAllChats.pending, (state, action) => {
                state.status = "loading";
                state.error = "";
            })
            .addCase(getAllChats.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.chats = action.payload.slice();
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
                state.chats.push(action.payload);
                state.chats.sort(sortMethod);
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
                state.status = "succeede";
                const existingChat = state.chats.find(chat => chat.id === action.payload.id);
                if (existingChat) {
                    existingChat.title = action.payload.title
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
                state.chats = state.chats.filter(chat => chat.id !== action.payload)
            })
            .addCase(deleteChat.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
    }
});

export const { addChatToLocalStore } = chatsSlice.actions;

export const selectAllChats = (state) => 
    state.chats.chats;
export const selectChatById = (state, chatId) => 
    state.chats.chats.find(chat => chat.id === chatId);
export const selectChatsStatus = (state) => state.chats.status;

export default chatsSlice.reducer;