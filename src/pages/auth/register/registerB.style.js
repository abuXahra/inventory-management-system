import styled from "styled-components";

export const RegisterWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: white;
  padding: 50px;
`;

export const RegisterContent = styled.div`
  width: 100%;
  display: flex;
  background-color: #0037eb16;
  margin: 20px;
  border-radius: 100px 0px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border: 1px solid #00032af7;

  @media (max-width: 768px) {
    width: 100%;
    height: 100vh;
    border-radius: 0px;
    margin: 0px;
    justify-content: center;
    align-items: center;
  }
`;

export const RegisterContentLeft = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    height: 400px;
  }

  @media (max-width: 768px) {
    width: 100%;
    display: none;
  }
`;

export const FormWrapper = styled.div`
  width: 50%;
  color: white;
  background-color: #00032af7;
  display: flex;
  flex-direction: column;
  padding-left: 100px;
  padding-right: 100px;
  gap: 20px;
  justify-content: center;
  align-items: center;
  border-radius: 100px 0px;
  position: relative;
  display: flex;
  p {
    font-size: 13px;
  }
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    // padding: 0px 40px;
    gap: 10px;
  }

  img {
    height: 50px;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 100vh;
    font-size: 13px;
    padding-left: 50px;
    padding-right: 50px;
    border-radius: 0px;
  }
`;
