import React, { useState } from 'react';
import { HamburgerIcon, UserIcon } from '../../../assets/Icons';
import s from './ProfileNav.module.css'
import UserInfo from './UserInfo.jsx';
import onClickOutside from 'react-onclickoutside'
import Authentication from '../../Authorization/Authentication';

const ProfileNav = function(){
    
    let [profileNav, setProfileNav] = useState(false);

    let [isLogin, setLogin] = useState(0);

    ProfileNav.handleClickOutside = ()=>{setProfileNav(false)};

    return (
        <>
            <div className={s.profileNav}>
                <button className={s.profileNav__button} onClick={() => setProfileNav(!profileNav)}>
                    <UserIcon />
                </button>
                {profileNav && 
                    <UserInfo 
                        profileNav={profileNav} 
                        setProfileNav={setProfileNav} 
                        setLogin={setLogin}
                    /> }
                {isLogin!==0 && <Authentication setLogin={setLogin} isLogin={isLogin} />}
            </div>
        </>
    )

}

const clickOutsideConfig = {

    handleClickOutside: () => ProfileNav.handleClickOutside,

}

export default onClickOutside(ProfileNav, clickOutsideConfig);