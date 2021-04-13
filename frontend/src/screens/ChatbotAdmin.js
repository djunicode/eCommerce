/* eslint-disable radix */
import React, { useEffect, useState } from 'react';
import {
  Button,
  InputGroup,
  FormControl,
  Container,
  Accordion,
  Card,
} from 'react-bootstrap';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getChat } from '../actions/chatbotAction';
import Message from '../components/Message';
import Loader from '../components/Loader';

const Acc = ({ msg, spacemax, spaces, filt }) => {
  const l = filt.length;
  const dispmsgs = msg.filter((dispmsg) => {
    console.log();
    if (
      dispmsg.index.substring(0, l + 1).localeCompare(`${filt} `) ===
        0 &&
      dispmsg.index.length === l + 2
    ) {
      console.log(dispmsg);
      return dispmsg;
    }
    return null;
  });
  if (spaces === spacemax + 1 || dispmsgs.length === 0) {
    return <>working</>;
  }
  return (
    <>
      {dispmsgs.map((dispmsg) => {
        return (
          <Accordion defaultActiveKey="0" key={dispmsg.index}>
            <Card style={{ backgroundColor: 'white' }}>
              <Card.Header
                style={{
                  backgroundColor: 'white',
                  padding: '0',
                }}
              >
                <Accordion.Toggle
                  as={Button}
                  variant="link"
                  eventKey="1"
                >
                  {dispmsg.msg}
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body style={{ backgroundColor: 'white' }}>
                  <Acc
                    msg={msg}
                    spacemax={spacemax}
                    spaces={spaces + 1}
                    filt={dispmsg.index}
                  />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        );
      })}
    </>
  );
};

const ChatbotAdmin = () => {
  const [messages, setMessages] = useState([]);
  const { loading, data, error } = useSelector(
    (state) => state.chatbot,
  );
  // const [level1, setLevel1] = useState([]);
  const dispatch = useDispatch();

  const query = `query{
    questions{
      level
      index
      msg
      info
    }
  }`;

  useEffect(() => {
    dispatch(getChat(query));
  }, []);

  useEffect(() => {
    if (data[0]) {
      const levl1 = data.filter((value) => {
        if (value.level === '1') {
          return value;
        }
        return null;
      });
      // setLevel1(levl1);
      const n = levl1[levl1.length - 1].index;
      const N = parseInt(n);
      let i = 1;
      const msgs = [];
      while (i <= N) {
        const I = i.toString();
        const message = data.filter((value) => {
          // console.log(value.index.substring(0, 1));
          if (
            value.index.substring(0, 1).localeCompare(`${I}`) === 0
          ) {
            return value;
          }
          return null;
        });
        msgs.push(message);
        i += 1;
      }
      setMessages([...messages, ...msgs]);
    }
  }, [data]);

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <>
          <div>
            <Container>
              <h3>CHATBOT</h3>
              <StyledRowFlex>
                <StyledSubHeader>
                  <StyledSubHeaderText>MESSAGE</StyledSubHeaderText>
                </StyledSubHeader>
                <StyledBox>
                  <InputGroup className="m-2">
                    <FormControl
                      placeholder="Message"
                      aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                      <InputGroup.Text id="basic-addon2">
                        <i className="fas fa-edit" />
                      </InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </StyledBox>
              </StyledRowFlex>
              <StyledRowFlex>
                <StyledSubHeader>
                  <StyledSubHeaderText>ANSWERS</StyledSubHeaderText>
                </StyledSubHeader>
                <StyledBox>
                  {messages.map((msg) => {
                    let spacemax = msg[msg.length - 1].index;
                    spacemax = spacemax.split(' ').length - 1;
                    console.log(spacemax);
                    return (
                      <Accordion
                        defaultActiveKey="0"
                        key={msg[0].info}
                      >
                        <Card style={{ backgroundColor: 'white' }}>
                          <Card.Header
                            style={{
                              backgroundColor: 'white',
                              padding: '0',
                            }}
                          >
                            <Accordion.Toggle
                              as={Button}
                              variant="link"
                              eventKey="1"
                            >
                              {msg[0].msg}
                            </Accordion.Toggle>
                          </Card.Header>
                          <Accordion.Collapse eventKey="1">
                            <Card.Body
                              style={{ backgroundColor: 'white' }}
                            >
                              <Acc
                                msg={msg}
                                spacemax={spacemax}
                                spaces={1}
                                filt={msg[0].index}
                              />
                            </Card.Body>
                          </Accordion.Collapse>
                        </Card>
                      </Accordion>
                    );
                  })}
                </StyledBox>
              </StyledRowFlex>
              <StyledButton variant="danger">
                Save Changes
              </StyledButton>
            </Container>
          </div>
        </>
      )}
    </>
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
  margin-top: 14px;
`;

const StyledSubHeaderText = styled.p`
  text-transform: uppercase;
  font-size: 20px;
`;

const StyledBox = styled.div`
  flex: 1;
  border-radius: 6px;
  vertical-align: middle !important;
  margin: auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

// const StyledBoxText = styled.p`
//   margin: 0 !important;
//   text-align: left;
//   padding: 6px;
//   font-size: 20px;
// `;

const StyledButton = styled(Button)`
  float: right;
  border-radius: 4px;
  margin-top: 12px;
`;

// const Saccordion = styled(Accordion)`
//   background-color: white;
// `;
