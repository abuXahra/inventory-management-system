
import React, { useState, useContext, useRef, useEffect } from 'react'
import { HamburgerWrapperHeader, HamburgerWrapperHeaderi, HeaderContent, HeaderDropdown, HeaderDropdownItem, HeadWrapper, IconWrapper, NotificationWrapper, ProfileWrapper, SearchContainer } from './Header.style'
import Input from '../input/Input'
import { IoMdNotificationsOutline } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { FiMenu, FiSearch, FiUsers } from "react-icons/fi";
import {FaEnvelope} from 'react-icons/fa'
import ProfilePicture from '../../images/placeholder_image.png'
import { useNavigate } from 'react-router-dom';
import {UserContext} from '../context/UserContext'
import { SidebarItemLists } from '../../data/SidebarItemList';


export default function HeaderDashboard({ toggleSidebar }) {
const dropdownRef = useRef(null);
const {user} = useContext(UserContext);
console.log('USER DATA: \n', user)
const navigate = useNavigate();
const [toggleDropdown, setToggleDropdown] = useState(false)

  const handleDropdown = (url) => {
    navigate(url);
    setToggleDropdown(false); // Close the dropdown after selecting a sub-item
  };


  useEffect(() => {
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setToggleDropdown(false);
    }
  };

  // Listen for all mousedown events
  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);



return (
<HeadWrapper>
  <HeaderContent>
    <HamburgerWrapperHeader onClick={toggleSidebar}>
      <FiMenu />
    </HamburgerWrapperHeader>
  </HeaderContent>
  
  {/* Icons, notifications, profile, etc. */}
    <HeaderContent wd={'60%'} jc={"flex-end"} mwd={'40%'}>
       {/* user icon */}
       <IconWrapper onClick={()=>navigate('/users')}>
          <FiUsers/>
       </IconWrapper>

         {/* notification icon */}
      {/* <IconWrapper>
          <FaEnvelope/>
          <NotificationWrapper>0</NotificationWrapper>
       </IconWrapper> */}


       {/* notification icon */}
       {/* <IconWrapper>
          <IoMdNotificationsOutline/>
          <NotificationWrapper>0</NotificationWrapper>
       </IconWrapper> */}

       {/* setting icon */}
       <IconWrapper ref={dropdownRef} onClick={()=>setToggleDropdown(!toggleDropdown)}>
          <CiSettings/>
          {
          toggleDropdown &&
            <HeaderDropdown>
                    {
                     SidebarItemLists[11].subMenu?.map((item, i) => (
                        <HeaderDropdownItem key={i} onClick={() => handleDropdown(item.url)}>
                          <span>{item.icon}</span>
                          <span>{item.title}</span>
                        </HeaderDropdownItem>
                      ))
                    }
            </HeaderDropdown>
         }
       </IconWrapper>

      {/* Profile picture */}
       <ProfileWrapper onClick={()=> navigate(`users/${user._id}`)}>
          <img src={user ? `${process.env.REACT_APP_URL}/images/${user.imgUrl}` : ProfilePicture} alt="" srcset="" />
       </ProfileWrapper>
      </HeaderContent>
</HeadWrapper>
);
}











