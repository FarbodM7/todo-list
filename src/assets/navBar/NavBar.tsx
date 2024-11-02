// @ts-ignore
import React, {useEffect, useState} from 'react';
import './NavBar.css'
import {NavLink, Outlet} from 'react-router-dom'

import {
    AccountCircleOutlined,
    HomeOutlined, PlaylistAdd,
    PlaylistAddCheckOutlined,
    SettingsOutlined
} from "@mui/icons-material";


const Navbar = () => {
    const [date, setDate] = useState<string>('');

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const options: Intl.DateTimeFormatOptions = {
                weekday: 'long',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,

            };
            setDate(now.toLocaleDateString(undefined, options));
        }, 1000);

        return () => clearInterval(interval);

    }, []);

    return (
        <>
            <nav className={'nav'}>
                <div className={'date'}>{date}</div>
                <div className={'buttons'}>
                    <NavLink className={({isActive}) => isActive ? 'button-selected' : 'button'}
                             to={'/'}><HomeOutlined/>Home
                    </NavLink>
                    <NavLink className={({isActive}) => isActive ? 'button-selected' : 'button'}
                             to={'todo'}><PlaylistAdd/>Add Task
                    </NavLink>
                    <NavLink className={({isActive}) => isActive ? 'button-selected' : 'button'}
                             to={'recent-tasks'}><PlaylistAddCheckOutlined/>Recent Tasks
                    </NavLink>
                    <NavLink className={({isActive}) => isActive ? 'button-selected' : 'button'}
                             to={'connection-status'}><PlaylistAddCheckOutlined/>Connection Status
                    </NavLink>
                    <button className={'settingButton'}><SettingsOutlined/></button>
                    <button className={'profileButton'}><AccountCircleOutlined/></button>
                </div>
            </nav>
            <Outlet/>
        </>
    );
};

export default Navbar;
