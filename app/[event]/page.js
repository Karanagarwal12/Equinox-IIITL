"use client"

import Lenis from '@studio-freight/lenis'
import { useEffect, useRef, useState } from 'react';
import './event.scss';
import axios from 'axios';
import { backendURL } from '@/values';
import Clock from '../components/clock/Clock';

export default function Home({ params }) {
    const [event, setEvent] = useState(null);
    const progress = useRef(null);
    let endTime = new Date(event?.end).getTime();
    let startTime = new Date(event?.start).getTime();

    const checkState = () => {
        let now = new Date().getTime();
        if (endTime - now < 0) {
            return ("overed");
        } else if (startTime - now < 0) {
            return ("ongoing");
        } else {
            return ("upcoming");
        }
    }
    useEffect(() => {
        const lenis = new Lenis({
            wrapper: document.querySelector("html"),
            content: document.querySelector("#eventDetailsPage"),
            duration: 1.2,
            easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
            direction: "vertical",
            gestureDirection: "vertical",
            smooth: true,
            smoothTouch: true,
            touchMultiplier: 2,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
    }, []);
    useEffect(() => {
        let x = setInterval(function () {
            let now = new Date().getTime();
            if (progress.current) {
                progress.current.style.width = (now - startTime) / (endTime - startTime) * 100 + "%";
            }
        }, 1000);

    }, []);
    useEffect(() => {
        axios.get(backendURL + '/' + params.event)
            .then(response => {
                if (typeof(response.data) === 'object')
                    setEvent(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [])
    return (
        <div id='eventDetailsPage'>
            <div className='nav'>
                <a href='/'>&nbsp; &lt; All Events</a>
            </div>
            {event &&
                <div className='hero'>
                    <div className='l' >
                        <h1 className='title'>{event?.title}</h1>
                        {event?.prizePool && <h3 className='prizePool'>Prize Pool : <span>{event?.prizePool}</span></h3>}
                        {event?.club && <h3 className='club'>By <span>{event?.club}</span></h3>}<br /><br />
                        <pre><p className='des'>{event?.description}</p></pre><br />
                        <span className='date'>Start &nbsp;:&nbsp; {new Date(event?.start).toLocaleString()}</span><br />
                        <span className='date'>End &nbsp;&nbsp;&nbsp;:&nbsp; {new Date(event?.end).toLocaleString()}</span><br /><br />
                        <span className='tags'>Tags : {event?.tags && event?.tags.map((tag) => `${tag}, `)}etc.</span><br /><br />
                        {event?.files && <div className='files'>Attached files : {event?.files.map((file, i) => <a key={i} href={file}>file {i + 1}</a>)}<br /></div>}<br />
                        <div className='links'>{event?.links && event?.links.map((link, i) => <a key={i} href={link.link}>{link.title}</a>)}</div><br />
                    </div>
                    <div className='r' >
                        <img src={event?.coverPhoto} alt={event?.title} className='coverPhoto' />
                        {checkState() === "overed" && <span className="overed">Event Over</span>
                            || (checkState() === "upcoming" && (
                                <Clock data={{ date: new Date(event?.start) }} />
                            ) || (
                                    <>
                                        <Clock data={{ date: new Date(event?.end) }} />
                                        <div className="progressBar">
                                            <div className="progress" ref={progress}></div>
                                        </div>
                                    </>
                                ))}
                    </div>
                </div> || <p>No event named {decodeURI(params.event)}</p>
            }
        </div>
    );
}
