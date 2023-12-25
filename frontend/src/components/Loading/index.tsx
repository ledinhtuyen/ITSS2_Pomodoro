import React from 'react'
import "./Loading.scss"
import { useAppSelector } from '../../redux/hook';


const Loading = () => {
    const isLoading = useAppSelector((state) => state.app.isLoading);

    return (
        <>
            {isLoading && <div className="overlay">
                <div className="overlay__inner">
                    <div className="overlay__content"><span className="spinner"></span></div>
                </div>
            </div>}
        </>
    )
}

export default Loading