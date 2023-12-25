import { createSlice } from "@reduxjs/toolkit"

interface appState {
   isLoading: boolean
}

const initialState: appState = {
   isLoading: false
}

export const appSlice = createSlice({
   name: 'app',
   initialState,
   reducers: {
      setLoadingTrue: (state) => {
         state.isLoading = true
      },
      setLoadingFalse: (state) => {
         state.isLoading = false
      }
   },
})

export const { setLoadingFalse, setLoadingTrue } = appSlice.actions
export default appSlice.reducer