import { useState } from 'react';
import './GlobalNav.css';
import menu from './menu';
import Button from './Button';


function GlobalNav({ className, setPage, activeTab, setActiveTab }) {

    const [showMenu, setShowMenu] = useState(false);

    const handleTabClick = (itemName, itemPath) => {
        setActiveTab(itemName);
        setPage(itemPath)
    };

    const listHtml = menu.map(item => {
        return (
            <li key={item.name} className='global-nav__item'>
                <a
                    className='global-nav__link'
                    onClick={() => handleTabClick(item.name, item.path)}
                >
                    {item.name}
                </a>
            </li>
        );
    });

    const showClass = showMenu ? '' : 'global-nav__list--collapsed';

    const tabsHtml = menu.map(item => {
        return (
            <div key={item.name} className='tab'>
                <input type="radio" name="css-tabs" id={item.name}
                    checked={activeTab === item.name}
                    onChange={() => handleTabClick(item.name, item.path)}
                    className="tab-switch" />

                <label htmlFor={item.name} className="tab-label">{item.name}</label>
            </div>
        );
    });

    return (
        <>
            <nav className={`global-nav ${className}`}>
                <Button className='global-nav__toggle' onClick={() => setShowMenu(!showMenu)} type="button" visual="button">
                    <img className="job-icon-hamburger" src="hamburger-menu.png" alt="hamburger-menu-icon" aria-label="Toggle menu" />
                </Button>
                <ul className={`global-nav__list ${showClass}`}>
                    {listHtml}
                </ul>
            </nav>

            <div className="wrapper header__nav">
                <div className="tabs">
                    {tabsHtml}
                </div>
            </div>
        </>
    );
}

export default GlobalNav;