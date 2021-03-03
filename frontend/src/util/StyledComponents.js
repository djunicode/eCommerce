import styled from 'styled-components';
import {
  DARK_BLUE_2,
  LIGHT_BLUE,
} from './colors';
import { Dropdown } from 'react-bootstrap';

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

// Search, Category Screen Common Styles
export const StyledBadgeSortDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 330px;
  margin-right: 12px;

  @media (max-width: 900px) {
    margin-left: 12px;
    justify-content: flex-end;
  }
`;

export const StyledBadge = styled.p`
  font-size: 20px;
  border-radius: 8px;
  background-color: ${LIGHT_BLUE} !important;
  color: ${DARK_BLUE_2} !important;
  border: 2px ${DARK_BLUE_2} solid;
  padding: 7px;
  margin: 0 8px;
`;

export const StyledDropdownToggle = styled(Dropdown.Toggle)`
  background-color: ${DARK_BLUE_2} !important;
  color: ${LIGHT_BLUE} !important;
  border-radius: 8px;
  padding: 10px !important;
  font-size: 16px;
  margin: 0 8px;
`;

export const StyledDropdownItem = styled(Dropdown.Item)`
  background-color: ${DARK_BLUE_2};
  color: ${LIGHT_BLUE};
  font-size: 16px;
  border: none !important;

  &:hover {
    background-color: ${LIGHT_BLUE};
    color: ${DARK_BLUE_2};
  }
`;

export const StyledGridDiv = styled.div`
  /*display: flex;
  flex-direction: row;
  justify-content: space-between !important;
  align-items: flex-start;
  align-self: center !important;
  flex-wrap: wrap;*/
  display:grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  overflow-y: auto !important;
  z-index: 1000 !important;
  background-color: ${LIGHT_BLUE};
  text-align: left !important;
  margin: auto 12px auto 330px;

  @media (max-width: 900px) {
    margin: auto 12px auto 12px;
    justify-content: space-around !important;
  }
`;

export const StyledSimilarProdsH1 = styled.h1`
  margin-left: 330px;
  padding: 0;
  margin-top: 8px;

  @media (max-width: 900px) {
    margin-left: 12px;
  }
`;