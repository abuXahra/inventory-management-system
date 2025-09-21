
import React, { useState } from 'react'
import { HamburgerWrapperHeader, HamburgerWrapperHeaderi, HeaderContent, HeadWrapper, IconWrapper, NotificationWrapper, ProfileWrapper, SearchContainer } from './Header.style'
import Input from '../input/Input'
import { IoMdNotificationsOutline } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { FiMenu, FiSearch, FiUsers } from "react-icons/fi";
import {FaEnvelope} from 'react-icons/fa'
import ProfilePicture from '../../images/professional_passport.png'
import { HamburgerWrapper } from '../sidebar/Siderbar.style';
import { MdOutlineMenuOpen } from 'react-icons/md';

export default function HeaderDashboard({ toggleSidebar }) {
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
       <IconWrapper>
          <FiUsers/>
       </IconWrapper>

         {/* notification icon */}
      <IconWrapper>
          <FaEnvelope/>
          <NotificationWrapper>0</NotificationWrapper>
       </IconWrapper>


       {/* notification icon */}
       <IconWrapper>
          <IoMdNotificationsOutline/>
          <NotificationWrapper>0</NotificationWrapper>
       </IconWrapper>

       {/* setting icon */}
       <IconWrapper>
          <CiSettings/>
       </IconWrapper>

      {/* Profile picture */}
       <ProfileWrapper>
          <img src={ProfilePicture} alt="" srcset="" />
       </ProfileWrapper>
      </HeaderContent>
</HeadWrapper>
);
}

// export default function HeaderDashboard({showSidebar, showHbg, shoDesktopSidebar}) {

//   const [searchValue, setSearchValue] =  useState('');
//   const handleSearchChange = (e) =>{
//       setSearchValue(e.target.value)
//   }



//   return (
//     <HeadWrapper>
//       <HeaderContent mwd='60%'>
//         <HamburgerWrapperHeaderi onClick={shoDesktopSidebar} showHbg={showHbg} ><MdOutlineMenuOpen /></HamburgerWrapperHeaderi>
//         <HamburgerWrapperHeader onClick={showSidebar} ><FiMenu /></HamburgerWrapperHeader>
//         {/* <Input
//           title
//           placeholder={'Search'}
//           value={searchValue}
//           error={false}
//           onChange={handleSearchChange}
//           requiredSymbol=""
//           InputWidth="100%"
//           type={'text'}
//           txtColor={'grey'}
//           inputPadding=" 6px 10px"
//           Icon={<FiSearch/>}
//           // bdColor="#555555ac"
//         /> */}
//       </HeaderContent>
      // <HeaderContent wd={'60%'} jc={"flex-end"} mwd={'40%'}>
      //  {/* user icon */}
      //  <IconWrapper>
      //     <FiUsers/>
      //  </IconWrapper>

      //    {/* notification icon */}
      // <IconWrapper>
      //     <FaEnvelope/>
      //     <NotificationWrapper>0</NotificationWrapper>
      //  </IconWrapper>


      //  {/* notification icon */}
      //  <IconWrapper>
      //     <IoMdNotificationsOutline/>
      //     <NotificationWrapper>0</NotificationWrapper>
      //  </IconWrapper>

      //  {/* setting icon */}
      //  <IconWrapper>
      //     <CiSettings/>
      //  </IconWrapper>

      // {/* Profile picture */}
      //  <ProfileWrapper>
      //     <img src={ProfilePicture} alt="" srcset="" />
      //  </ProfileWrapper>
      // </HeaderContent>

     
//     </HeadWrapper>
//   )
// }




















// import styled from "styled-components";

// export const HeadWrapper = styled.div`
//   width: 100%;
//   display: flex;
//   position: sticky;
//   top: 0;
//   z-index: 100;  // Higher value to ensure the header stays above other content
//   background-color: #80808048; // Adjust the transparency as needed
//   padding-right: 5px;
//   box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; // Optional for a shadow effect

//   /* Optional: add some padding to create space between the header and content */
//   padding: 10px;
// `;




// export const MainContent = styled.div`
//   width: ${({mainContentWidth}) => mainContentWidth};
//   height: 100vh; /* Makes sure the main content takes up full height */
//   overflow-y: auto; /* Makes the content scrollable */
//   padding-top: 20px; /* Optional, adjust top padding to account for sticky header */
// `;



// export const Content = styled.div`
//   display: flex;
//   /* Make sure Content doesn't restrict scrolling of MainContent */
//   flex-direction: column;
// `;



// function App() {
//   const [displayShowSidebar, setDisplayShowSidebar] = useState("none");
//   const [mainContentWidth, setMainContentWidth] = useState("83%");
//   const [showHbg, setShowHbg] = useState("none");
//   const [deskDisplaySidebar, setDeskDisplaySidebar] = useState("flex");

//   const { user, setUser } = useContext(UserContext);
//   const location = useLocation();

//   useEffect(() => {
//     if (location.pathname === "/") {
//       setMainContentWidth("100%");
//     } else {
//       setMainContentWidth("83%");
//     }
//   }, [location.pathname]);

//   const showSidebar = () => {
//     setDisplayShowSidebar("flex");
//   };

//   const shoDesktopSidebar = () => {
//     setDeskDisplaySidebar("flex");
//     setMainContentWidth("83%");
//     setShowHbg("none");
//   };

//   return (
//     <ScrollToTop>
//       <Content>
//         {/* Sidebar */}
//         <HideSidebar>
//           <Siderbar
//             displayShowSidebar={displayShowSidebar}
//             setDisplayShowSidebar={setDisplayShowSidebar}
//             setMainContentWidth={setMainContentWidth}
//             setShowHbg={setShowHbg}
//             deskDisplaySidebar={deskDisplaySidebar}
//             setDeskDisplaySidebar={setDeskDisplaySidebar}
//           />
//         </HideSidebar>

//         <MainContent mainContentWidth={mainContentWidth}>
//           {/* Header */}
//           <HiderHeader>
//             <HeaderDashboard
//               showSidebar={showSidebar}
//               showHbg={showHbg}
//               shoDesktopSidebar={shoDesktopSidebar}
//             />
//           </HiderHeader>

//           {/* Routes */}
//           <Routes>
//             <Route path="/" element={<DashboardHome />} />
//             <Route path="/dashboard" element={<DashboardHome />} />
//             <Route path="/category" element={<Category />} />
//             <Route path="/category/:categoryId" element={<CategoryDetail />} />
//             <Route path="/products" element={<Products />} />
//             <Route path="/product/:productId" element={<ProductDetail />} />
//           </Routes>
//         </MainContent>
//       </Content>
//     </ScrollToTop>
//   );
// }
