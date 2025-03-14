

import styled from "styled-components";


export const SelectInputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: ${({InputWidth})=> InputWidth || "100%"};
    gap: 5px;
`

export const SelectInputLabel = styled.label`
    color: #171717;;
    font-size: 10px;
    font-weight: bold;
`

export const SelectInputStyle = styled.select`
    border: 1px solid #0d398420; 
    border-radius: 2px;
    padding: 5px;
    width: 100%;
    color: grey;
    font-size: 10px;

    option{
        font-size: 10px;
    }
    
    &:focus {
    outline: none;

  }
`

export const SelectInputOption= styled.option`
    font-size: 13px;
    color: grey;
`

export const SelectInputError = styled.span`
    color: red;
    font-size: 10px;
`