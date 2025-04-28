
// import React, { useContext, useState } from 'react'
// import { HamburgerWrapper, HamburgerWrapperi, SidebarBody, SidebarContent, SidebarHeader, SidebarItemsWrapper, SidebarWrapper, SignOutWrapper } from './Siderbar.style'
// import logo from '../../images/logoz.png'
// import { FiHome, FiMenu } from 'react-icons/fi'
// import { IoMdClose } from 'react-icons/io'
// import SidebarItem from './sidebar_items/SidebarItem'
// import { useLocation, useNavigate } from 'react-router-dom'
// import { SidebarItemLists } from '../../data/SidebarItemList'
// import logout from '../../images/icons/logout.svg'
// import { FaHamburger } from 'react-icons/fa'
// import { MdOutlineMenuOpen } from 'react-icons/md'
// import axios from 'axios'
// import { UserContext } from '../context/UserContext'


// export default function Siderbar({
//     displayShowSidebar, 
//     setDisplayShowSidebar, 
//     setMainContentWidth, 
//     setShowHbg,
//     deskDisplaySidebar,
//     setDeskDisplaySidebar,
//     sidebarWidth
// }) {

//     const location = useLocation();
//     const navigate = useNavigate()
//     const { user, setUser } = useContext(UserContext);
    

  

//     const hideSidebar = (url) => {
//         setDisplayShowSidebar("none");
//         navigate(url);
//       };
 
// const handDesHbOnclick = () => {
//     setDeskDisplaySidebar("none")
//     setMainContentWidth('100%')
//     setShowHbg('flex')
// }






//     // Logout function
//     const handleLogout = async () => {
//         try {
//             const res = await axios.get(process.env.REACT_APP_URL + '/api/auth/logout', { withCredentials: true })
//             setUser(null)
//             navigate('/');
//         } catch (err) {
//             console.log(err)
//         }
//     }


//   return (
//     <SidebarWrapper displaySidebar={displayShowSidebar} deskDisplaySidebar={deskDisplaySidebar} sidebarWidth={sidebarWidth}>
//         <SidebarHeader>
//             <h2>INVENTORY</h2>
//             {/* <img onClick={()=>navigate('/dashboard')} src={logo} alt="" srcset="" /> */}
//             <HamburgerWrapperi onClick={handDesHbOnclick}><MdOutlineMenuOpen /></HamburgerWrapperi>  
//             <HamburgerWrapper onClick={()=> setDisplayShowSidebar("none")}><IoMdClose /></HamburgerWrapper>  
//         </SidebarHeader>
//         <SidebarBody>
//             <SidebarContent>
//                 <SidebarItemsWrapper>
//                     {
//                     SidebarItemLists && SidebarItemLists.map((item, i)=>(
//                             <SidebarItem
//                                 key={i}
//                                 bg={location.pathname === item.url &&  '#0058fc' } 
//                                 icon={item.icon}
//                                 title={item.tile} 
//                                 subMenu={item.subMenu}
//                                 handleClick={()=>hideSidebar(item.url)}
//                         />
//                     ))}
//                 </SidebarItemsWrapper>

//             </SidebarContent>
//             <SignOutWrapper>
//                 <span><img src={logout} alt="" srcset="" /></span>
//                 <span onClick={handleLogout}>Sign Out</span>
//             </SignOutWrapper>
//         </SidebarBody>
//     </SidebarWrapper>
//   )
// }





import React, { useContext, useState } from 'react';
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
  displayShowSidebar,
  setDisplayShowSidebar,
  setMainContentWidth,
  setShowHbg,
  deskDisplaySidebar,
  setDeskDisplaySidebar,
  sidebarWidth
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

    // Track which dropdown is active
  const [activeDropdown, setActiveDropdown] = useState(null); // Track the active dropdown index
  

  const handDesHbOnclick = () => {
    setDeskDisplaySidebar("none")
    setMainContentWidth('100%')
    setShowHbg('flex')
    setActiveDropdown(null); 
}

const handMobilHbOnclick = () => {
    setDisplayShowSidebar("none")
    setActiveDropdown(null); 
}

  const hideSidebar = (url) => {
    setDisplayShowSidebar("none");
    navigate(url);
  };

  const handleDropdownToggle = (index) => {
    // If the clicked dropdown is already open, close it
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const handleLogout = async () => {
    
    try {
      const res = await axios.get(process.env.REACT_APP_URL + '/api/auth/logout', { withCredentials: true });
      setUser(null);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SidebarWrapper displaySidebar={displayShowSidebar} deskDisplaySidebar={deskDisplaySidebar} sidebarWidth={sidebarWidth}>
      <SidebarHeader>
        <h2>INVENTORY</h2>
        <HamburgerWrapperi onClick={handDesHbOnclick}><MdOutlineMenuOpen /></HamburgerWrapperi>
        <HamburgerWrapper onClick={handMobilHbOnclick}><IoMdClose /></HamburgerWrapper>
      </SidebarHeader>
      <SidebarBody>
        <SidebarContent>
          <SidebarItemsWrapper>
            {
              SidebarItemLists && SidebarItemLists.map((item, i) => (
                <SidebarItem
                  key={i}
                  bg={location.pathname === item.url && '#0058fc'}
                  icon={item.icon}
                  title={item.tile}
                  subMenu={item.subMenu}
                  isActive={activeDropdown === i}  // Pass active state to the SidebarItem
                  handleClick={() => hideSidebar(item.url)}
                  onToggleDropdown={() => handleDropdownToggle(i)}  // Pass the function to toggle dropdown visibility
                  setDisplayShowSidebar={setDisplayShowSidebar}
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
