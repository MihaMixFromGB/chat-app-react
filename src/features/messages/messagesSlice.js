import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";

import {
    getAllMessagesFb,
    setMessageFb,
    deleteMessageFb
} from "../../api/database";

export const getAllMessages = createAsyncThunk(
    "messages/getAllMessages",
    async (chatId) => {
        const messages = await getAllMessagesFb(chatId);
        messages.sort((a, b) => a.date.localeCompare(b.date));
        return { chatId, messages }
    }
);
export const addMessage = createAsyncThunk(
    "messages/addMessage",
    async ({chatId, userId, text}) => {
        const message = {
            id: nanoid(),
            date: (new Date()).toISOString(),
            text,
            chat: chatId,
            user: userId
        };
        await setMessageFb(message);
        return message;
    }
);
export const updateMessage = createAsyncThunk(
    "messages/updateMessage",
    async (message) => {
        await setMessageFb(message);
        return message;
    }
);
export const deleteMessage = createAsyncThunk(
    "",
    async (chatId, messageId) => {
        await deleteMessageFb(chatId, messageId);
        return { chatId, messageId }
    }
);

const initialState = {
    status: "idle",
    error: "",
    messages: {}
};

const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        addMessageToLocalStore:{
            reducer(state, action) {
                state.messages[action.payload.chat].push(action.payload)
            },
            prepare(chatId, userId, text) {
                return {
                    payload: {
                        id: nanoid(),
                        text,
                        chat: chatId,
                        user: userId
                    }
                }
            }
        }
    },
    extraReducers(builder) {
        builder
            // getAllMessages
            .addCase(getAllMessages.pending, (state, action) => {
                state.status = "loading";
                state.error = "";
            })
            .addCase(getAllMessages.fulfilled, (state, action) => {
                state.status = "succeeded";
                const { chatId, messages } = action.payload;
                state.messages[chatId] = messages;
            })
            .addCase(getAllMessages.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            // addMessage
            .addCase(addMessage.pending, (state, action) => {
                state.status = "loading";
                state.error = "";
            })
            .addCase(addMessage.fulfilled, (state, action) => {
                state.status = "succeeded";
                const message = action.payload;
                if (!state.messages[message.chat]) state.messages[message.chat] = []
                state.messages[message.chat].push(message);
            })
            .addCase(addMessage.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            // updateMessage
            .addCase(updateMessage.pending, (state, action) => {
                state.status = "loading";
                state.error = "";
            })
            .addCase(updateMessage.fulfilled, (state, action) => {
                state.status = "succeeded";
                const updatedMessage = action.payload;
                let existingMessage = state.messages[updatedMessage.chat]?.find(
                    message => message.id === updateMessage.id
                );
                if (existingMessage) {
                    existingMessage = { ...updateMessage }
                }
            })
            .addCase(updateMessage.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            // deleteMessage
            .addCase(deleteMessage.pending, (state, action) => {
                state.status = "loading";
                state.error = "";
            })
            .addCase(deleteMessage.fulfilled, (state, action) => {
                state.status = "succeeded";
                const { chatId, messageId } = action.payload;
                state.messages[chatId]?.filter(message => message !== messageId);
            })
            .addCase(deleteMessage.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
    }
});

export const { addMessageToLocalStore } = messagesSlice.actions;

export const selectMessages = (state, chatId) => 
    state.messages.messages[chatId] ?? [];
export const selectMessagesStatus = (state) => state.messages.status;

export default messagesSlice.reducer;