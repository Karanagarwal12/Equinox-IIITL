import { useEffect, useRef, useState } from 'react';
import './event.scss';
import Clock from '@/app/components/clock/Clock';
import { redirect } from 'next/navigation'

export default function Event({ data }) {
    const [eventTime, setEventTime] = useState(null);
    let endTime = new Date(data?.end).getTime();
    let startTime = new Date(data?.start).getTime();
    const progress = useRef(null);
    useEffect(() => {
        let x = setInterval(function () {
            let now = new Date().getTime();
            if (eventTime === "overed") {
                clearInterval(x);
            }
            if (endTime - now < 0) {
                setEventTime("overed");
            } else if (startTime - now < 0) {
                setEventTime("ongoing");
            } else {
                setEventTime("upcoming");
            }
            if (progress.current) {
                progress.current.style.width = (now - startTime) / (endTime - startTime) * 100 + "%";
            }
        }, 1000);

    }, []);

    const regHandler = () =>{
        console.log("clicked reg");
    }

    return (
        <div className="Event" id={data?.title} onClick={data?.clickHandler}>
            <img src={data?.coverPhoto} alt="CoverPhoto" className="coverPhoto" />
            <div className="details">
                <h1 className="title">{data?.title}</h1>
                {eventTime === "overed" && <span className="overed">Event Overed</span>
                    || (eventTime === "upcoming" && (
                        <Clock data={{ date: new Date(data?.start) }} />
                    ) || (
                            <>
                                <Clock data={{ date: new Date(data?.end) }} />
                                <div className="progressBar">
                                    <div className="progress" ref={progress}></div>
                                </div>
                            </>
                        ))}
                {eventTime !== "overed" && <button className="register" onClick={regHandler} >{data?.title=="Add Event" && "Add Event" || "Regester Now"}</button>}
            </div>
        </div>
    );
}