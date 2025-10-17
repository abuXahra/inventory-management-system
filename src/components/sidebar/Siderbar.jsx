


import React, { useContext, useEffect, useRef, useState } from 'react';
import { HamburgerWrapper, HamburgerWrapperi, SidebarBody, SidebarContent, SidebarHeader, SidebarItemsWrapper, SidebarWrapper, SignOutWrapper } from './Siderbar.style';
import logo from '../../images/logoz.png';
import { FiHome, FiMenu } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import SidebarItem from './sidebar_items/SidebarItem';
import { useLocation, useNavigate } from 'react-router-dom';
import { SidebarItemLists } from '../../data/SidebarItemList';
import logout from '../../images/icons/logout.svg';
import { FaHamburger } from 'react-icons/fa';
import { MdOutlineMenuOpen } from 'react-icons/md';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

export default function Siderbar({
  isOpen, 
  onClose
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const {setUser } = useContext(UserContext);

//     // Track which dropdown is active
  const [activeDropdown, setActiveDropdown] = useState(null); // Track the active dropdown index
  
  // 🔍 Track sidebar DOM element
  const sidebarRef = useRef();

  // ✅ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setActiveDropdown(null); // Close dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const handleLogout = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_URL + '/api/auth/logout', { withCredentials: true });
      setUser(null);
      localStorage.removeItem("user"); // ✅ Clear storage
      localStorage.removeItem("token"); // Clear token
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (

      <SidebarWrapper isOpen={isOpen}>
      <SidebarHeader>
        <h2>INVENTORY</h2>
        <HamburgerWrapperi onClick={onClose}>
          <IoMdClose />
        </HamburgerWrapperi>
 
      </SidebarHeader>
      <SidebarBody>
        <SidebarContent>
          <SidebarItemsWrapper ref={sidebarRef}>
            {
              SidebarItemLists && SidebarItemLists.map((item, i) => (
                <SidebarItem
                  key={i}
                  bg={location.pathname === item.url && '#0058fc'}
                  icon={item.icon}
                  title={item.tile}
                  subMenu={item.subMenu}
                  isActive={activeDropdown === i}  // Pass active state to the SidebarItem
                  handleClick={() => navigate(item.url)}
                  onToggleDropdown={() => setActiveDropdown(activeDropdown === i ? null : i)}  // Pass the function to toggle dropdown visibility
                  setDisplayShowSidebar={()=>setActiveDropdown(null)}
                />
              ))
            }
          </SidebarItemsWrapper>
        </SidebarContent>
        <SignOutWrapper>
          <span><img src={logout} alt="" /></span>
          <span onClick={handleLogout}>Sign Out</span>
        </SignOutWrapper>
      </SidebarBody>
    </SidebarWrapper>
  );
}
