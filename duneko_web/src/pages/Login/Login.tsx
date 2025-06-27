import React from "react";
import LoginForm from "../../components/Form/LoginForm";
import styled from "styled-components";

const LoginPage = () => {
  return (
    <StyledBody>
      <LoginForm />
    </StyledBody>
  );
};

const StyledBody = styled.div`
    display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1c, #163f25, #268826);
  padding: 20px;
  font-family: 'Roboto', sans-serif;
`;

export default LoginPage;