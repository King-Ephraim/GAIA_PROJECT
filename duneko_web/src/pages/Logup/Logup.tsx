import React from "react";
import SignUpForm from "../../components/Form/LogupForm";
import styled from "styled-components";

const LogupPage = () => {
    return (
        <StyledBody>
            <SignUpForm />
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

export default LogupPage;