import React, { useEffect } from 'react'
import { useAppSelector } from '../redux/hook';

const useCustomTitle = () => {
    const time = useAppSelector((state) => state.pomodoro.time);
    const currentProcess = useAppSelector(
        (state) => state.pomodoro.currentProcess
    );
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes
    const displaySeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds

    useEffect(() => {
        document.title = `${displayMinutes}:${displaySeconds} - ${currentProcess}`
    }, [time, currentProcess])
}

export default useCustomTitle