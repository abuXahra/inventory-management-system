import styled from "styled-components";

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: ${({ InputWidth }) => InputWidth || "100%"};
  gap: 5px;
  position: relative;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const InputLabel = styled.label`
  color: #171717;
  font-size: 10px;
  display: flex;
  align-items: center;
`;

export const InputStyle = styled.textarea`
  border: 1px solid ${({ bdColor }) => bdColor || "#0d398420"};
  border-radius: 2px;
  padding: ${({ inputPadding }) => inputPadding || "6px"};
  background-color: transparent;
  color: ${({ txtColor }) => txtColor || "grey"};
  font-size: 10px;

  width: 100%;

  &:focus {
    outline: none;
  }
`;

export const InputError = styled.span`
  color: red;
  font-size: 10px;
`;

export const InputIcon = styled.div`
  position: absolute;
  color: ${({ iconColor }) => iconColor || "white"};
  top: 35%;
  right: 8px;

  &:hover {
    scale: 1.2;
  }
`;
