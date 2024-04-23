import './Header.css';
import GlobalNav from './GlobalNav';
import Button from './Button';
import Modal from './Modal';
import { useRef, useState } from 'react';

import { useAppContext } from './AppContext';


function Header() {
    const { isDarkTheme, setIsDarkTheme, username, setPage } = useAppContext();
    const [showDropdown, setShowDropdown] = useState();
    const [activeTab, setActiveTab] = useState('Overview');

    const toggleDarkTheme = () => {
        const newDarkTheme = !isDarkTheme;
        setIsDarkTheme(newDarkTheme);
        document.body.classList.toggle('dark-theme', newDarkTheme);
    };

    const dialogRef = useRef();

    function changePage(e) {
        e.preventDefault();
        setActiveTab('Overview');
        setPage('/');
    }

    const showClass = showDropdown ? '' : 'set-username--collapsed';


    return (
        <header className="header">
            <img className="header__logo" src="logo.svg" alt="jobify-logo" onClick={changePage} aria-label='Return to Homepage' />
            <h1 className="header__title">
                Job Tracking App
            </h1>

            <img className='dark__toggle'
                src={isDarkTheme ? 'sun.png' : 'moon.png'}
                alt={isDarkTheme ? 'sun-icon' : 'moon-icon'}
                onClick={toggleDarkTheme}
                aria-label='Toggle theme' />

            <div className='header__username'>

                <Button className='set-username__toggle' onClick={() => setShowDropdown(!showDropdown)} type="button" visual="button">
                    <img className="job-icon-user" src="user.png" alt="User Icon" />{' '}
                    <span className='user-toggle-label'>{username} </span>{' '}
                    <img className="job-icon-arrow" src="down-arrow.png" alt="Dropdown Arrow" />
                </Button>

                <ul className={`set-username ${showClass}`}>
                    <li className='set-username__item'>
                        <Button
                            visual='link'
                            className='global-nav__link'
                            onClick={() => {
                                dialogRef.current.showModal();
                            }}
                        >
                            Set Username
                        </Button>
                    </li>
                </ul>

                <Modal dialogRef={dialogRef}/>
            </div>

            <GlobalNav setPage={setPage} activeTab={activeTab} setActiveTab={setActiveTab} />
        </header>
    );
}

export default Header;