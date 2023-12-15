import { configureStore } from '@reduxjs/toolkit'
import pomodoroReducer from '../reducers/pomodoroReducer'
import popupReducer from '../reducers/popupReducer'
export const store = configureStore({
    reducer: {
        pomodoro: pomodoroReducer,
        popup: popupReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch