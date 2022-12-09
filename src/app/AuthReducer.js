import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        videos: null
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setVideos: (state, action) => {
            state.videos = action.payload
        },
    },
})

export const { setUser, setVideos } = authSlice.actions

export default authSlice.reducer