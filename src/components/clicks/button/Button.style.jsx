import { styled } from "styled-components";


export const ButtonWrapper = styled.button`
    display: ${({btnDisplay}) => btnDisplay || 'flex'};
    gap: 5px;
    padding: ${({ btnPd }) => btnPd || "10px"} ;
    background-color: ${({ btnColor }) => btnColor || "red"};
    color: ${({ btnTxtClr }) => btnTxtClr || "white"};
    border: ${({ btnBorder }) => btnBorder || "none"};
    border-radius: ${({btnBdRd})=> btnBdRd || "10px"};
    cursor: pointer;
    font-size: ${({btnFontSize}) => btnFontSize || ''};
    justify-content: center;

    @media (max-width: 768px) {
    display: flex;
    flex-direction: row;
    font-size: 9px;
    border: ${({ btnMobileBorder }) => btnMobileBorder || "none"};
  }
`