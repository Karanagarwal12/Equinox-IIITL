import './hof.scss';
import Clock from '@/app/components/clock/Clock';
import { useRouter } from 'next/navigation';

export default function HOF() {
    const router = useRouter();
    return (
        <div id="HOF" onClick={() => router.push(`/${encodeURI("Hack-O-Fiesta")}`)}>
            <Clock data={{ date: new Date(2024, 3, 5) }} />
        </div>
    );
}