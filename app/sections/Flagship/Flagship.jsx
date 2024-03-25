import './flagship.scss';
import HOF from './hof/HOF';
import MUN from './mun/MUN';

export default function Flagship() {
    return (
        <div id="Flagship">
            <span className='title'>Flagship Events ----</span>
            <div className="flagEvents">
                <HOF />
                <MUN />
            </div>
        </div>
    );
}