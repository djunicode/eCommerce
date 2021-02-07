import styled from 'styled-components';

export const StyledContainerDiv = styled.div`
  box-shadow: 0 12px 30px -10px rgba(150, 170, 180, 0.5);
  padding: 10px;
  margin: 20px auto;
  background-color: #fff;
  borderradius: 5px;
  width: 50% !important;

  @media (max-width: 1000px) {
    width: 60% !important;
  }
  @media (max-width: 768px) {
    width: 90% !important;
  }
`;

export const StyledContainerDiv2 = styled.div`
  display: 'flex';
  align-self: 'center';
  margin: 10px 20px;
  flex-direction: 'column';
`;

export const StyledHeader = styled.p`
  text-align: center;
  letter-spacing: 6px;
  font-size: 40px;
`;
