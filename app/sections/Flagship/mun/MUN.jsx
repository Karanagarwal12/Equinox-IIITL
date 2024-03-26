import './mun.scss';
import Clock from '@/app/components/clock/Clock';
import { useRouter } from 'next/navigation';

export default function MUN() {
    const router = useRouter();
    return (
        <div id="MUN" onClick={() => router.push(`/${encodeURI("Equinox World MUN")}`)}>
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