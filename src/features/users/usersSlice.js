import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
    signInFb,
    signOutFb,
    signUpFb
} from "../../api/auth";
import {
    getAllProfilesFb,
    setProfileFb
} from "../../api/database";

export const signIn = createAsyncThunk(
    "users/signIn",
    async (user, { dispatch }) => {
        const userId = await signInFb(user.email, user.password);
        dispatch(getAllProfiles());
        return userId;
    }
);
export const signOut = createAsyncThunk(
    "users/signOut",
    async () => { await signOutFb() }
);
export const signUp = createAsyncThunk(
    "users/signUp",
    async (user, { dispatch }) => {
        const userId = await signUpFb(user.email, user.password);
        await setProfileFb({
            id: userId,
            email: user.email,
            firstname: "",
            lastname: "",
            nickname: user.email
        })
        dispatch(getAllProfiles());
        return userId;
    }
);

export const getAllProfiles = createAsyncThunk(
    "users/getAllProfiles",
    async () => {
        return await getAllProfilesFb()
    }
);
export const updateProfile = createAsyncThunk(
    "users/updateProfile",
    async (profile) => {
        await setProfileFb(profile);
        return profile;
    }
);

const initialState = {
    isAuth: false,
    authUserId: "",
    status: "idle",
    error: "",
    profiles: {}
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        userUpdated(state, action) {
            const { id, firstname, lastname, nickname } = action.payload;
            const existingUser = state.profiles[id];
            if (existingUser) {
                existingUser.firstname = firstname;
                existingUser.lastname = lastname;
                existingUser.nickname = nickname;
            }
        }
    },
    extraReducers(builder) {
        builder
            // signIn
            .addCase(signIn.pending, (state, action) => {
                state.status = "loading";
                state.error = "";
                state.isAuth = false;
                state.authUserId = "";
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.isAuth = true
                state.authUserId = action.payload;
            })
            .addCase(signIn.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            
            //signOut
            .addCase(signOut.pending, (state, action) => {
                state.status = "loading";
                state.error = "";
            })
            .addCase(signOut.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.isAuth = false;
                state.authUserId = "";
            })
            .addCase(signOut.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            // signUp
            .addCase(signUp.pending, (state, action) => {
                state.status = "loading";
                state.error = "";
                state.isAuth = false;
                state.authUserId = "";
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.isAuth = true
                state.authUserId = action.payload;
            })
            .addCase(signUp.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            // getAllProfiles
            .addCase(getAllProfiles.pending, (state, action) => {
                state.status = "loading";
                state.error = "";
            })
            .addCase(getAllProfiles.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.profiles = { ...action.payload }
            })
            .addCase(getAllProfiles.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            // updateProfile
            .addCase(updateProfile.pending, (state, action) => {
                state.status = "loading";
                state.error = "";
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.profiles[action.payload.id] = { ...action.payload }
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
    }
});

export const { userUpdated } = usersSlice.actions;

export const selectAllUsers = (state) => 
    state.users.profiles;
export const selectUserById = (state, userId) => 
    state.users.profiles[userId];
export const selectUserNicknameById = (state, userId) => 
    state.users.profiles[userId].nickname;
export const selectAuthUserId = (state) => 
    state.users.authUserId;
export const selectUsersStatus = (state) => 
    state.users.status;
export const selectAuthStatus = (state) => 
    state.users.isAuth;

export default usersSlice.reducer;