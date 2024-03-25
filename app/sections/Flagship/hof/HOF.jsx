import './hof.scss';
import Clock from '@/app/components/clock/Clock';

export default function HOF() {
    return (
        <div id="HOF">
            <Clock data={{ date: new Date(2024, 3, 5) }} />
        </div>
    );
}