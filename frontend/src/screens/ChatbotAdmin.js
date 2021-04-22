/* eslint-disable array-callback-return */
/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable radix */
import React, { useEffect, useState } from 'react';
import {
  Button,
  InputGroup,
  FormControl,
  Container,
  Accordion,
  Card,
  Form,
} from 'react-bootstrap';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getChat, updateChat } from '../actions/chatbotAction';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Additem from '../components/Additem';
import Acc from '../components/Acc';

const ChatbotAdmin = () => {
  const [arrow, setArrow] = useState({});
  const [name, setName] = useState('');
  const [ind, setInd] = useState('');
  const [open, setOpen] = useState(false);
  const [msgg, setMsgg] = useState('');
  const [btn, setBtn] = useState('');
  const [messages, setMessages] = useState([]);
  const [delt, setDelt] = useState(false); // to show the delete pop up box
  const [di, setDi] = useState(); // to save index on clicking delete icon
  const [dmsg, setDmsg] = useState(); // to save index to be delted on clicking delete icon
  const [tmessages, setTmessages] = useState([]);
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    if (messages.length !== 0 && flag) {
      setFlag(false);
      setTmessages(messages.slice());
    }
  }, [messages]);

  const { loading, data, error } = useSelector(
    (state) => state.chatbot,
  );
  const { Loading, Data, Error } = useSelector(
    (state) => state.updateChatbot,
  );
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
      const n = levl1[levl1.length - 1].index;
      const N = parseInt(n);
      let i = 1;
      const msgs = [];
      while (i <= N) {
        const I = i.toString();
        const message = data.filter((value) => {
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

  const handleClick = (e, index) => {
    e.preventDefault();
    setMessages((m) => {
      const tempm = m.slice();
      const tempa = tempm[index];
      const tempo = tempa.filter((a) => {
        if (a.index.localeCompare(name) === 0) {
          return a;
        }
        return null;
      });
      tempo[0].msg = btn;
      tempo[0].info = msgg;
      return tempm;
    });
    setOpen(false);
  };

  const handleDelete = (d, index) => {
    setMessages((m) => {
      const tempm = m.slice();
      const tempa = tempm[index];
      const tempa1 = tempa.filter((a) => {
        if (a.index.substring(0, d.length).localeCompare(d) === 0) {
          return null;
        }
        return a;
      });
      tempm[index] = tempa1;
      return tempm;
    });
  };

  const handleSave = () => {
    const details = [];
    messages.map((m) => {
      m.map((m1) => {
        details.push(
          `{level:"${m1.level}",index:"${m1.index}",msg:"${m1.msg}",info:"${m1.info}"}`,
        );
      });
    });
    dispatch(updateChat(details));
  };

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
                  {messages.map((msg, index) => {
                    if (msg.length === 0) {
                      return null;
                    }
                    let spacemax = msg[msg.length - 1].index;
                    spacemax = spacemax.split(' ').length - 1;
                    return (
                      <Accordion
                        defaultActiveKey="0"
                        key={msg[0].index}
                      >
                        <Card style={{ backgroundColor: 'white' }}>
                          <Card.Header
                            style={{
                              backgroundColor: 'white',
                              padding: '0',
                              borderBottom:
                                '2px solid rgba(0,0,0,0.125)',
                            }}
                          >
                            <Accordion.Toggle
                              as={StyledBtn}
                              variant="link"
                              eventKey="1"
                              onClick={() => {
                                setArrow((a) => {
                                  const tempa = { ...a };
                                  if (tempa[`${index}`]) {
                                    tempa[`${index}`] = false;
                                  } else {
                                    tempa[`${index}`] = true;
                                  }
                                  return tempa;
                                });
                              }}
                            >
                              <span style={{ fontWeight: '100' }}>
                                {msg[0].msg}&nbsp;&nbsp;&nbsp;
                                {arrow[`${index}`] ? (
                                  <i
                                    style={{ color: '#222831' }}
                                    className="fas fa-chevron-up"
                                  />
                                ) : (
                                  <i
                                    style={{ color: '#222831' }}
                                    className="fas fa-chevron-down"
                                  />
                                )}
                              </span>
                            </Accordion.Toggle>
                          </Card.Header>
                          <Accordion.Collapse eventKey="1">
                            <Card.Body
                              style={{
                                backgroundColor: 'white',
                                position: 'relative',
                                paddingRight: '0px',
                                paddingLeft: '1rem',
                                paddingBottom: '0px',
                              }}
                            >
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              <span>{msg[0].info}</span>
                              <span
                                onClick={() => {
                                  setOpen(true);
                                  setInd(index);
                                  setName(msg[0].index);
                                  setBtn(msg[0].msg);
                                  setMsgg(msg[0].info);
                                }}
                                style={{
                                  cursor: 'pointer',
                                  position: 'absolute',
                                  right: '10px',
                                  color: '#929293',
                                }}
                              >
                                <i className="fas fa-edit" />
                              </span>
                              <span
                                onClick={() => {
                                  setDi(index);
                                  setDmsg(msg[0].index);
                                  setDelt(true);
                                }}
                                style={{
                                  cursor: 'pointer',
                                  position: 'absolute',
                                  right: '50px',
                                  color: '#929293',
                                }}
                              >
                                <i className="fas fa-trash-alt" />
                              </span>
                              <Additem
                                msg={msg}
                                setMessages={setMessages}
                                index={index}
                                filt={msg[0].index}
                                messages={messages}
                              />
                              <br />
                              <Acc
                                msg={msg}
                                spacemax={spacemax}
                                spaces={1}
                                filt={msg[0].index}
                                messages={messages}
                                setMessages={setMessages}
                                index={index}
                              />
                            </Card.Body>
                          </Accordion.Collapse>
                        </Card>
                      </Accordion>
                    );
                  })}
                  <Additem
                    msg={null}
                    setMessages={setMessages}
                    index={null}
                    filt={null}
                    messages={messages}
                  />
                </StyledBox>
              </StyledRowFlex>
              <Stylediv>
                <StyledButtn
                  variant="danger"
                  onClick={() => {
                    setMessages(tmessages);
                  }}
                >
                  Undo Changes
                </StyledButtn>
                <StyledButtn
                  variant="danger"
                  onClick={() => {
                    handleSave();
                    setTmessages(messages);
                  }}
                >
                  Save Changes
                </StyledButtn>
              </Stylediv>
              {Loading && (
                <>
                  <div style={{ marginTop: '100px' }}>
                    <Loader />
                  </div>
                </>
              )}
              {Error && (
                <>
                  <div style={{ marginTop: '100px' }}>
                    <Message>{Error}</Message>
                  </div>
                </>
              )}
              {Data === 'success' && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    marginTop: '100px',
                  }}
                >
                  <span className="text-success">
                    Your changes have been saved
                  </span>
                </div>
              )}
            </Container>
          </div>
        </>
      )}
      {open && (
        <>
          <div
            style={{
              position: 'fixed',
              top: '0',
              left: '0',
              right: '0',
              bottom: '0',
              backgroundColor: 'rgba(0,0,0,.7)',
              zIndex: '1000',
            }}
            onClick={() => {
              setOpen(false);
            }}
          />
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: '#FFF',
              padding: '50px',
              zIndex: 1000,
              borderRadius: '20px',
            }}
          >
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Msg</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Msg"
                  name={name}
                  value={msgg}
                  onChange={(e) => {
                    setMsgg(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Option Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Option Name"
                  name={name}
                  value={btn}
                  onChange={(e) => {
                    setBtn(e.target.value);
                  }}
                />
              </Form.Group>
              <StyledButton
                variant="danger"
                type="submit"
                name={name}
                onClick={(e) => {
                  handleClick(e, ind);
                }}
              >
                Done
              </StyledButton>
            </Form>
          </div>
        </>
      )}
      {delt && (
        <>
          <div
            style={{
              position: 'fixed',
              top: '0',
              left: '0',
              right: '0',
              bottom: '0',
              backgroundColor: 'rgba(0,0,0,.7)',
              zIndex: '1000',
            }}
            onClick={() => {
              setDelt(false);
            }}
          />
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: '#FFF',
              padding: '50px',
              zIndex: 1000,
              borderRadius: '20px',
            }}
          >
            Are you sure you want to delete this?
            <StyledDiv>
              <StyledButtn
                variant="danger"
                onClick={() => {
                  handleDelete(dmsg, di);
                  setDelt(false);
                }}
              >
                Yes
              </StyledButtn>
              <StyledButtn
                variant="danger"
                onClick={() => {
                  setDelt(false);
                }}
              >
                No
              </StyledButtn>
            </StyledDiv>
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
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledBox = styled.div`
  flex: 1;
  border-radius: 6px;
  vertical-align: middle !important;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 768px) {
    width: 100%;
  }
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

const StyledButtn = styled(Button)`
  border-radius: 4px;
  margin-top: 12px;
`;

const StyledBtn = styled(Button)`
  text-transform: none;
  font-size: 1rem;
  &:hover {
    text-decoration: none;
    border-right: 0px;
  }
  &:focus {
    text-decoration: none;
    border-right: none;
    border-right-color: transparent;
    border-right: 0px;
  }
`;

// const Saccordion = styled(Accordion)`
//   background-color: white;
// `;

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
`;

const Stylediv = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;
