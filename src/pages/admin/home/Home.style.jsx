import styled from "styled-components";


export const Content = styled.div`
    width: 100%;
    display: flex;
    height: auto;
    position: relative;
`

export const ContentSidebar = styled.div`
    position: fixed;
`

export const MainContent = styled.div`
    width: ${({mainContentWidth})=> mainContentWidth || '83%'};
    height: auto;
    position: absolute;
    top: 0px;
    right: 0px;
    

    @media (max-width: 768px) {
        width:  100%;
    }
`



export const HomeWrapper = styled.div`
   height: auto;
   width: 100%;
   /* background-color: #80808018; */
   padding: 20px;
   display: flex;
   flex-direction: column;
   gap: 20px;
`

export const GreetingWrapper = styled.div`
width: 100%;
display: flex;
justify-content: space-between;
align-items: center;
/* box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px; */
/* border-radius: 20px; */
/* padding: 20px; */
`

export const GreetingCard = styled.div`
    display: flex;
    flex-direction: column;
`


export const DateTimeWrapper = styled.div`
    display: flex;
    gap: 10px;
    font-size: 12px;
`


export const TopCardContent = styled.div`
    width: 100%;
    display: flex;
    gap: 40px;
    justify-content: space-between;
`

// export const TotalPostContainer = styled.div`
//     display: flex;
//     gap: 20px;
//     font-size: 12px;

//     span{
//         display: flex;
//         gap: 5px;
//         align-items: flex-end;
//     }

//     p{
//         font-weight: bold;
//         font-size: 20px;
//     }
// `

export const ProfileDp = styled.div`
    position: absolute;
    top:-80px;
    right: -105px;

    img{
        height: 200px;
    }
`

export const TopCardContentWrapper= styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 20px;


    @media (max-width: 768px) {
        flex-direction: column;
    }
`

export const TopCard = styled.div`
    width: 23.4%;
    height: 100px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px; 
    border-radius: 10px;
    background-color:${({bg})=>bg};
    color: white;
    padding: 20px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    @media (max-width: 768px) {
       width: 100%;
    }

`


export const TopCardIcon = styled.div`
        position: absolute;
        top:10px;
        right: 20px;
        font-size: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 5px;
        /* background-color: #00032a; */
        /* height: 45px;
        width: 45px; */
        color: #ffffff5d;
        border-radius: 5px;
        img{
            height: 30px;
    }
`

export const Container = styled.div`
    width: 100%;
    display: flex;
    gap: 10px;

    
    @media (max-width: 768px) {
        flex-direction: column;
    }

`

export const ChartContent = styled.div`
    width: 50%;
    display: flex;
    border-radius: 10px;
    background-color: white;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px; 
   
    @media (max-width: 768px) {
        width: 100%;
    }
`


export const ProductContainer  = styled.div`
    width: ${({wd}) => wd || "70%"};
    display: flex;
    border-radius: 10px;
    background-color: white;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px; 
    @media (max-width: 768px) {
        width: 100%;
    }
`

export const CustomerListWrapper  = styled.div`
    width: 30%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    border-radius: 10px;
    background-color: white;
    padding: 20px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px; 
    @media (max-width: 768px) {
        width: 100%;
    }
`


export const SpaceBtnContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const CustomerListContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`
