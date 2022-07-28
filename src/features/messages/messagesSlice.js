import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
    // createSelector
} from "@reduxjs/toolkit";
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
        return messages;
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
        return messageId;
    }
);

const messagesAdapter = createEntityAdapter({
    sortComparer: (a, b) => a.date.localeCompare(b.date)
});

const initialState = messagesAdapter.getInitialState({
    status: "idle",
    error: ""
});

const messagesSlice = createSlice({
    name: "messages",
    initialState,
    extraReducers(builder) {
        builder
            // getAllMessages
            .addCase(getAllMessages.pending, (state, action) => {
                state.status = "loading";
                state.error = "";
            })
            .addCase(getAllMessages.fulfilled, (state, action) => {
                state.status = "succeeded";
                messagesAdapter.setAll(state, action.payload);
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
                messagesAdapter.addOne(state, action.payload);
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
                const { id, text } = action.payload;
                const existingMessage = state.entities[id];
                if (existingMessage) {
                    existingMessage.text = text;
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
                messagesAdapter.removeOne(action.payload);
            })
            .addCase(deleteMessage.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
    }
});

export const {
    selectAll: selectMessages,
    selectById: selectMessageById,
    selectIds: selectMessageIds
} = messagesAdapter.getSelectors(state => state.messages);

export const selectMessagesStatus = (state) => state.messages.status;

// export const selectMessageIdsByChat = createSelector(
//     [selectMessages, (state, chatId) => chatId],
//     (messages, chatId) => messages.filter(message => message.chat === chatId)
//                                     .map(message => message.id)
// );

export default messagesSlice.reducer;