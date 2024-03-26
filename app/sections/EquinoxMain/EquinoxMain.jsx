import './equinoxMain.scss';
import Clock from '@/app/components/clock/Clock';
import { useRouter } from 'next/navigation';

export default function EquinoxMain() {
    const router = useRouter();
    return (
        <div id="EquinoxMain" onClick={() => router.push(`/Equinox`)}>
            <Clock data={{ date: new Date(2024, 3, 12) }} />
        </div>
    );
}