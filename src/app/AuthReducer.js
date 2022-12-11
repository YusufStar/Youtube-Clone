import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        videos: [],
        modal: false
    },
    reducers: {
        setModal: (state) => {
            state.modal = !state.modal
        },
        setUser: (state, action) => {
            state.user = action.payload
        },
        setVideos: (state, action) => {
            state.videos = action.payload
        },
    },
})

export const { setUser, setVideos, setModal } = authSlice.actions

export default authSlice.reducer