import Profile from './Profile';
import AddJob from './AddJob';
import Overview from './Overview';
import AllJobs from './AllJobs';
import { useAppContext } from './AppContext';

function MainArea() {
    const { page } = useAppContext();
    return (
        <main id='main' className='main'>
            {(page === '/') && <Overview />}
            {(page === '/allJobs') && <AllJobs />}
            {(page === '/profile') && <Profile />}
            {(page === '/addJob') && <AddJob />}
        </main>
    );
}

export default MainArea;