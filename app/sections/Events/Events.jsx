import { useEffect, useState } from 'react';
import './events.scss';
import Event from './Event/Event';
import axios from 'axios';
import { backendURL } from '@/values';

export default function Events() {
    const addEvent = {
        title: "Add Event",
        start: new Date(2024, 2, 1),
        end: new Date(2024, 3, 12),
        coverPhoto: "https://firebasestorage.googleapis.com/v0/b/equinox-b4f85.appspot.com/o/addEvent.png?alt=media&token=2decfc57-e6c8-4594-a103-d246611e293d",
    }
    const [ongoing, setOngoing] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [overed, setOvered] = useState([]);
    const checkState = (event) => {
        let endTime = new Date(event?.end).getTime();
        let startTime = new Date(event?.start).getTime();
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
        axios.get(backendURL)
            .then(response => {
                setOngoing(response.data.filter(event => checkState(event) === "ongoing"));
                setUpcoming(response.data.filter(event => checkState(event) === "upcoming"));
                setOvered(response.data.filter(event => checkState(event) === "overed"));
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [])


    return (
        <div id="Events">
            <div className="ongoing eventState">
                <h1 className="title">Ongoing Events</h1>
                <div className="events">
                    <a href="https://forms.gle/MehtJCWYq3jCgakB8" target="_blank"><Event data={{...addEvent,clickHandler:()=>{}}} key={-1} /></a>
                    {ongoing.map((event, i) => (
                        <Event data={event} key={i} />
                    ))}
                </div>
            </div>
            <div className="upcoming eventState">
                <h1 className="title">Upcoming Events</h1>
                <div className="events">
                    <a href="https://forms.gle/MehtJCWYq3jCgakB8" target="_blank"><Event data={{...addEvent,clickHandler:()=>{}}} key={-1} /></a>
                    {upcoming.map((event, i) => (
                        <Event data={event} key={i} />
                    ))}
                </div>
            </div>
            <div className="overed eventState">
                <h1 className="title">Overed Events</h1>
                <div className="events">
                    <a href="https://forms.gle/MehtJCWYq3jCgakB8" target="_blank"><Event data={{...addEvent,clickHandler:()=>{}}} key={-1} /></a>
                    {overed.map((event, i) => (
                        <Event data={event} key={i} />
                    ))}
                </div>
            </div>
        </div>
    );
}