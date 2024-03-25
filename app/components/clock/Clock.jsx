import { useEffect, useRef } from 'react';
import './clock.scss';

export default function Clock({ data }) {
    const daysRef = useRef(null);
    const hoursRef = useRef(null);
    const minsRef = useRef(null);
    const secondsRef = useRef(null);
    useEffect(() => {
        // Set the countdown date
        let countDownDate = new Date(data?.date).getTime();

        // Update the count down every 1 second
        let x = setInterval(function () {
            if (daysRef.current && hoursRef.current && minsRef.current && secondsRef.current) {
                // Get the current time
                let now = new Date().getTime();

                // Find the distance between current time and the count down date
                let distance = countDownDate - now;

                // Time calculations for days, hours, minutes and seconds
                let days = Math.floor(distance / (1000 * 60 * 60 * 24));
                let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                let seconds = Math.floor((distance % (1000 * 60)) / 1000);

                // Display the result in the corresponding elements
                daysRef.current.innerHTML = days < 10 ? '0' + days : days;
                hoursRef.current.innerHTML = hours < 10 ? '0' + hours : hours;
                minsRef.current.innerHTML = minutes < 10 ? '0' + minutes : minutes;
                secondsRef.current.innerHTML = seconds < 10 ? '0' + seconds : seconds;


                // If the count down is finished display 00
                if (distance < 0) {
                    clearInterval(x);
                    daysRef.current.innerHTML = "00";
                    hoursRef.current.innerHTML = "00";
                    minsRef.current.innerHTML = "00";
                    secondsRef.current.innerHTML = "00";
                }
            }
        }, 1000);
    }, [])

    return (
        <div id="Clock">
            <div ref={daysRef} className='clockElem'>NA</div>
            <div className='clockElem'>:</div>
            <div ref={hoursRef} className='clockElem'>NA</div>
            <div className='clockElem'>:</div>
            <div ref={minsRef} className='clockElem'>NA</div>
            <div className='clockElem'>:</div>
            <div ref={secondsRef} className='clockElem'>NA</div>
        </div>
    );
}