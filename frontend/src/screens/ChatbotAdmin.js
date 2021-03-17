import React from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

const ChatbotAdmin = () => {
  return (
    <div>
      <h3>CHATBOT</h3>
      <StyledRowFlex>
        <StyledSubHeader>
          <StyledSubHeaderText>MESSAGE</StyledSubHeaderText>
        </StyledSubHeader>
        <StyledBox>
          <StyledBoxText>Hi how may I Help you?</StyledBoxText>
        </StyledBox>
      </StyledRowFlex>
      <StyledRowFlex>
        <StyledSubHeader>
          <StyledSubHeaderText>ANSWERS</StyledSubHeaderText>
        </StyledSubHeader>
        <StyledBox>
          <StyledBoxText>i. Product Related Query</StyledBoxText>
          <StyledBoxText>ii. Order Related Query</StyledBoxText>
        </StyledBox>
      </StyledRowFlex>
      <StyledButton variant="danger">Save Changes</StyledButton>
    </div>
  );
};

export default ChatbotAdmin;

const StyledRowFlex = styled.div`
  display: flex !important;
  flex-direction: row !important;
  gap: 12px;
  vertical-align: middle;
  margin: 12px auto;
  padding: auto;
`;

const StyledSubHeader = styled.div`
  margin-top: 12px;
`;

const StyledSubHeaderText = styled.p`
  text-tranform: uppercase;
  font-size: 20px;
`;

const StyledBox = styled.div`
  background-color: #eee;
  flex: 1;
  border-radius: 6px;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledBoxText = styled.p`
  margin: 0 !important;
  text-align: left;
  padding: 6px;
  font-size: 20px;
`;

const StyledButton = styled(Button)`
  float: right;
  border-radius: 4px;
  margin-top: 12px;
`;
