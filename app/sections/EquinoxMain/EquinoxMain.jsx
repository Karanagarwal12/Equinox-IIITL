import './equinoxMain.scss';
import Clock from '@/app/components/clock/Clock';

export default function EquinoxMain() {
    return (
        <div id="EquinoxMain">
            <Clock data={{ date: new Date(2024, 3, 12) }} />
        </div>
    );
}