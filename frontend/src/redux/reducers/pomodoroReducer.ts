import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const defaultTime = 0.1 * 60

export enum Process {
    POMODORO = "Pomodoro",
    LONG_BREAK = "Long Break",
    SHORT_BREAK = "Short Break",
}

// Define a type for the slice state
interface PomodoroState {
    isRunning: boolean;
    totalIteration: number;
    currentIteration: number;
    currentProcess: Process;
    pomodoro: number;
    shortBreak: number;
    longBreak: number;
    sleepReminder: string;
    time: number;
    reset: boolean;
}

// Define the initial state using that type
const initialState: PomodoroState = {
    isRunning: false,
    totalIteration: 4,
    currentIteration: 1,
    currentProcess: Process.POMODORO,
    pomodoro: defaultTime,
    shortBreak: 0.2 * 60,
    longBreak: 0.05 * 60,
    sleepReminder: '16:04',
    time: defaultTime,
    reset: true
}

export const pomodoroSlice = createSlice({
    name: 'pomodoro',
    initialState,
    reducers: {
        minusOneSecond: (state) => {
            state.time -= 1
        },
        setTimeWithProcessCorresponding: (state) => {
            if (state.currentProcess === Process.POMODORO) { state.time = state.pomodoro }
            else if (state.currentProcess === Process.SHORT_BREAK) { state.time = state.shortBreak }
            else {
                state.time = state.longBreak
            }
        },
        setToNextProcess: (state) => {
            if (state.currentIteration < state.totalIteration) {
                state.currentProcess === Process.POMODORO ? state.currentProcess = Process.SHORT_BREAK : state.currentProcess = Process.POMODORO
            }
            else {
                if (state.currentProcess === Process.POMODORO) {
                    state.currentProcess = Process.SHORT_BREAK
                }
                else if (state.currentProcess === Process.SHORT_BREAK) {
                    state.currentProcess = Process.LONG_BREAK
                } else {
                    setIsRunningFalse();
                    setIsResetFalse();
                    state.time = 0
                }
            }
            state.currentIteration += 0.5;
        },
        setIsRunning: (state) => {
            state.isRunning = !state.isRunning
        },
        setIsRunningFalse: (state) => {
            state.isRunning = false
        },
        setIsResetFalse: (state) => {
            state.reset = false
        },
        handleResetPomodoro: (state) => {
            state.reset = true;
            state.isRunning = false;
            state.currentIteration = 1;
            state.currentProcess = Process.POMODORO
        },
        setPomodoro: (state, action: PayloadAction<number>) => {
            state.pomodoro = action.payload
        },
        setShortBreak: (state, action: PayloadAction<number>) => {
            state.shortBreak = action.payload
        },
        setLongBreak: (state, action: PayloadAction<number>) => {
            state.longBreak = action.payload
        },
        setSleepReminder: (state, action: PayloadAction<string>) => {
            state.sleepReminder = action.payload
        },
        plusFiveMinutesMore: (state) => {
            state.time += 5 * 60
        }
    },
})

export const { handleResetPomodoro, minusOneSecond, setIsRunning, setTimeWithProcessCorresponding, setToNextProcess, setIsResetFalse, setIsRunningFalse, setLongBreak, setPomodoro, setShortBreak, setSleepReminder, plusFiveMinutesMore } = pomodoroSlice.actions
export default pomodoroSlice.reducer
