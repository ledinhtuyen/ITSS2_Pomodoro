import { combineReducers, configureStore } from '@reduxjs/toolkit'
import pomodoroReducer from '../reducers/pomodoroReducer'
import popupReducer from '../reducers/popupReducer'
import appReducer from '../reducers/appReducer'
import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from 'redux-persist'

const rootReducer = combineReducers({
    pomodoro: pomodoroReducer,
    popup: popupReducer,
    app: appReducer
})

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['app', 'pomodoro', 'popup']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
    reducer: persistedReducer
})

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
