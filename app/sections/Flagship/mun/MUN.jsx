import './mun.scss';
import Clock from '@/app/components/clock/Clock';

export default function MUN() {
    return (
        <div id="MUN">
            <div className="l">
                <video autoPlay loop muted>
                    <source src="munBg.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className="r">
                <img src="munTitle.png" alt="Equinox World MUN" />
                <Clock data={{ date: new Date(2024, 3, 11) }} />
            </div>
        </div>
    );
}