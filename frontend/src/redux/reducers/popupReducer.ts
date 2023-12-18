import { createSlice } from "@reduxjs/toolkit"


// Define a type for the slice state
interface PopupState {
    isOpenWarningPopup: boolean;
    isOpenTimeUpPopup: boolean;
}

// Define the initial state using that type
const initialState: PopupState = {
    isOpenWarningPopup: false,
    isOpenTimeUpPopup: false
}
export const popupSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        setOpenWarningPopup: (state) => {
            state.isOpenWarningPopup = true
        },
        setCloseWarningPopup: (state) => {
            state.isOpenWarningPopup = false
        },
        setOpenTimeUpPopup: (state) => {
            state.isOpenTimeUpPopup = true
        },
        setCloseTimeUpPopup: (state) => {
            state.isOpenTimeUpPopup = false
        },
    },
})

export const { setCloseWarningPopup, setOpenWarningPopup, setCloseTimeUpPopup, setOpenTimeUpPopup } = popupSlice.actions

export default popupSlice.reducer