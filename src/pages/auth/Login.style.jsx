import styled from "styled-components";


export const LoginWrapper = styled.div`
   width:100% ;
   height: 100vh;
   display: flex;
`

export const LoginContentLeft = styled.div`
 width: 55%;
 display: flex;
 justify-content: center;
 align-items: center;
 background-color: white;

img{
     height: 600px;
  }

@media (max-width: 768px) {
    width: 100%;
    display: none;
  }
`

export const FormWrapper = styled.div`
    width: 45%;
    color: #08002fd9;
    background-color: #007ffe17;
    display:flex;
    flex-direction: column;
    padding-left:50px;
    padding-right: 50px;
    gap: 20px;
    justify-content: center;
    align-items: center;
    /* background-image: url('https://img.freepik.com/free-photo/abstract-digital-grid-black-background_53876-97647.jpg?size=626&ext=jpg');
    background-size:cover;
    background-repeat: no-repeat; */
    position: relative;
    height: 100vh;
    display: flex;
    p{font-size: 13px;}
    form{
        width: 100%;
        display: flex;
        flex-direction: column;
        // padding: 0px 40px;
        gap: 20px;
    }
    
        img{
            height: 50px;
        }

        
    @media (max-width: 768px) {
    width: 100%;
    height: 100vh;
    font-size: 13px;

  }
  `

