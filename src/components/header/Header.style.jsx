import styled from "styled-components";


export const  HeadWrapper = styled.div`
 width: 100%;
 display: flex;
 position: sticky;
 top: 0; 
 z-index: 100;
 background-color: #80808048;
 /* box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; */
 padding-right: 5px;
 border-bottom: 1px solid #00032a;
`


export const HeaderContent = styled.div`
     width: ${({wd})=> wd || '40%'};
     display: flex;
     align-items: center;
     gap: 15px;
     color: #151515;
     justify-content: ${({jc})=>jc || 'flex-start'};

     @media (max-width: 786px) {
          width: ${({mwd})=> mwd || '40%'};
     }
`


export const IconWrapper = styled.div`
     display: flex;
     align-items: center;
     justify-content: center;
     position: relative;
     cursor: pointer;
     font-size: 18px;
`

export const NotificationWrapper = styled.span`
     width: 15px;
     height: 15px;
     border-radius: 100%;
     font-size: 8px;
     display: flex;
     align-items: center;
     justify-content: center;
     background-color: red;
     color: white;
     position: absolute;
     top: -10px;
     right: -7px;
`

export const ProfileWrapper = styled.div`
     width: 40px;
     height: 40px;
     border-radius: 100%;
     display: flex;
     background-color: white;
     align-items: center;
     justify-content: center;
     cursor: pointer;

     img{
          width: 40px;
     height: 40px;
     border-radius: 100%;  
     }
`


export const HamburgerWrapperHeader = styled.span`
    font-size: 25px;
    cursor: pointer;  
    display: none;
    
    @media (max-width: 768px) {
        display: flex;
    }
`

export const HamburgerWrapperHeaderi = styled.span`
    rotate: 180deg;
    font-size: 25px;
    cursor: pointer;
    display: ${({showHbg})=> showHbg || 'none'};
    
    
    @media (max-width: 768px) {
        display: none;
    }
`