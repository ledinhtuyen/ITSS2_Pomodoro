import { createSlice } from "@reduxjs/toolkit"


// Define a type for the slice state
interface PopupState {
    isOpenWarningPopup: boolean;
}

// Define the initial state using that type
const initialState: PopupState = {
    isOpenWarningPopup: false
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
        }
    },
})

export const { setCloseWarningPopup, setOpenWarningPopup } = popupSlice.actions

export default popupSlice.reducer