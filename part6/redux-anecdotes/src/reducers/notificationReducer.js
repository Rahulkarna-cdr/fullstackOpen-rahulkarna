import { createSlice } from "@reduxjs/toolkit";

const initialState  = "Welcome to the Anecdote App"
const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        setNotification: (state, action) => {
            return action.payload
        },
        clearNotification: () => {
            return ""
        }
    }
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const notify = (notification) => {
    return async (dispatch) => {
        dispatch(setNotification(notification))
        setTimeout(()=>{
            dispatch(clearNotification())
        },5000)
    }
}
export default notificationSlice.reducer