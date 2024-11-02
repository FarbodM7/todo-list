import Calendar from '../images/calendar.png'
import './Landing.css'
import {Link} from "react-router-dom";

const Landing = () => {
    return (
        <div className={'startBox'}>
            <img className={'calendarImg'} src={Calendar} alt='Calendar Image'/>
            <h1 className={'heading'}>FOCUS ON YOUR DAY</h1>
            <Link to={'todo'}>
                <button className={'startBtn'}>Let's Start!</button>
            </Link>
        </div>
    );
};

export default Landing;