
// import React, { useState } from 'react'
// import { ArrowDropdownStyled, SidebarDropdown, SidebarDropdownItem, SidebarItemContainer } from './SidebarItem.style'
// import { useNavigate } from 'react-router-dom';
// import { FaArrowRight } from 'react-icons/fa';
// import { MdOutlineKeyboardArrowRight } from 'react-icons/md';


// export default function SidebarItem({bg, icon, title, subMenu, handleClick}) {

//   const navigate = useNavigate()

//   const [showSubMenu, setShowSubMenu]= useState(false);

//   const handleDropdown = (url) =>{
//     navigate(url)
//     setShowSubMenu(false);
//   }


//   return (
//           <SidebarItemContainer bg={bg} onClick={()=>setShowSubMenu(!showSubMenu)}>
//               <span onClick={handleClick}>{icon}</span> 
//               <span onClick={handleClick}>{title}</span>


//                {/* SHOW right arrow if the menu contain sub-menu */}
//              {subMenu && 
//              <ArrowDropdownStyled><MdOutlineKeyboardArrowRight /></ArrowDropdownStyled>}
             
//              {/* SHOW submenu */}
//              {showSubMenu &&
//              subMenu &&
//                 <SidebarDropdown>
//                   {
//                     subMenu.map((item, i)=>(
//                       <SidebarDropdownItem key={i} onClick={()=>handleDropdown(item.url)}>
//                           <span>{item.icon}</span> 
//                           <span>{item.title}</span>
//                       </SidebarDropdownItem>
//                     ))
//                 }
//                 </SidebarDropdown>
//               }



//           </SidebarItemContainer>
//   )
// }








import React from 'react';
import { ArrowDropdownStyled, SidebarDropdown, SidebarDropdownItem, SidebarItemContainer } from './SidebarItem.style';
import { useNavigate } from 'react-router-dom';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

export default function SidebarItem({ bg, icon, title, subMenu, handleClick, isActive, onToggleDropdown, setDisplayShowSidebar }) {
  const navigate = useNavigate();

  const handleDropdown = (url) => {
    navigate(url);
    onToggleDropdown(); // Close the dropdown after selecting a sub-item
    setDisplayShowSidebar("none");
  };

  return (
    <SidebarItemContainer bg={bg} onClick={onToggleDropdown}>
      <span onClick={handleClick}>{icon}</span>
      <span onClick={handleClick}>{title}</span>

      {/* Show right arrow if the menu contains a sub-menu */}
      {subMenu && <ArrowDropdownStyled><MdOutlineKeyboardArrowRight /></ArrowDropdownStyled>}

      {/* Show submenu if active */}
      {isActive && subMenu &&
        <SidebarDropdown>
          {
            subMenu.map((item, i) => (
              <SidebarDropdownItem key={i} onClick={() => handleDropdown(item.url)}>
                <span>{item.icon}</span>
                <span>{item.title}</span>
              </SidebarDropdownItem>
            ))
          }
        </SidebarDropdown>
      }
    </SidebarItemContainer>
  );
}
