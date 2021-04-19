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
import { getChat } from '../actions/chatbotAction';
import Message from '../components/Message';
import Loader from '../components/Loader';

const Additem = ({ msg, setMessages, index, filt, messages }) => {
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const [msgg, setMsgg] = useState('');
  const [btn, setBtn] = useState('');
  useEffect(() => {
    const dispmsgs = msg.filter((dispmsg) => {
      const l = filt.length;
      if (
        dispmsg.index
          .substring(0, l + 1)
          .localeCompare(`${filt} `) === 0 &&
        dispmsg.index.length === l + 2
      ) {
        return dispmsg;
      }
      return null;
    });
    console.log(dispmsgs);
    if (dispmsgs.length !== 0) {
      const len = dispmsgs.length;
      let last = dispmsgs[len - 1];
      last = last.index;
      let lastchar = last[last.length - 1];
      lastchar = parseInt(lastchar);
      lastchar += 1;
      const nameTemp = last.substring(0, last.length - 1) + lastchar;
      console.log('nametemp=', nameTemp);
      setName(nameTemp);
    } else if (dispmsgs.length === 0) {
      const nameTemp = `${filt} 1`;
      console.log('nametemp=', nameTemp);
      setName(nameTemp);
    }
  }, []);

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  const handleClick = (e) => {
    e.preventDefault();
    const n = e.target.name;
    const level = (
      e.target.name.length -
      (n.split(' ').length - 1)
    ).toString();
    const temp = {
      level,
      index: e.target.name,
      msg: msgg,
      info: btn,
    };
    console.log(temp);
    console.log(msg);
    const tempmsg = msg.slice();
    tempmsg.push(temp);
    console.log(msg);
    setMessages((m) => {
      console.log(m);
      console.log(m[index]);
      const tempm = m.slice();
      console.log(index);
      tempm[index] = tempmsg;
      // m[index] = msg;
      console.log(m);
      return tempm;
    });
    console.log(messages);
  };

  return (
    <div>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <span
        style={{ cursor: 'pointer' }}
        onClick={() => {
          setOpen(true);
        }}
      >
        Add item
      </span>
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
                <Form.Label>Button Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Button Name"
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
                  handleClick(e);
                }}
              >
                Done
              </StyledButton>
            </Form>
          </div>
        </>
      )}
    </div>
  );
};

const Acc = ({
  msg,
  spacemax,
  spaces,
  filt,
  messages,
  setMessages,
  index,
}) => {
  const l = filt.length;
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const [msgg, setMsgg] = useState('');
  const [btn, setBtn] = useState('');

  const handleClick = (e) => {
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
      console.log(tempo);
      tempo[0].msg = btn;
      tempo[0].info = msgg;
      console.log(tempm);
      return tempm;
    });
    console.log('msgg=', msgg);
    console.log('btn=', btn);
    console.log('name=', name);
  };

  const handleDelete = (d) => {
    setMessages((m) => {
      const tempm = m.slice();
      const tempa = tempm[index];
      const tempa1 = tempa.filter((a) => {
        if (a.index.substring(0, d.length).localeCompare(d) === 0) {
          console.log(d);
          console.log(a.index);
          console.log(a.index.substring(0, d.length));
          return null;
        }
        return a;
      });
      tempm[index] = tempa1;
      console.log(tempm);
      console.log(tempa);
      return tempm;
    });
  };

  const dispmsgs = msg.filter((dispmsg) => {
    if (
      dispmsg.index.substring(0, l + 1).localeCompare(`${filt} `) ===
        0 &&
      dispmsg.index.length === l + 2
    ) {
      return dispmsg;
    }
    return null;
  });
  if (spaces === spacemax + 1 || dispmsgs.length === 0) {
    return null;
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
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{dispmsg.info}
                  <span
                    onClick={() => {
                      setOpen(true);
                      setName(dispmsg.index);
                      setBtn(dispmsg.msg);
                      setMsgg(dispmsg.info);
                    }}
                    style={{
                      cursor: 'pointer',
                    }}
                  >
                    Edit
                  </span>
                  <span
                    onClick={() => {
                      handleDelete(dispmsg.index);
                    }}
                    style={{
                      cursor: 'pointer',
                    }}
                  >
                    delete
                  </span>
                  <Additem
                    msg={msg}
                    setMessages={setMessages}
                    index={index}
                    filt={dispmsg.index}
                    messages={messages}
                  />
                  <br />
                  <Acc
                    msg={msg}
                    spacemax={spacemax}
                    spaces={spaces + 1}
                    filt={dispmsg.index}
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
                <Form.Label>Button Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Button Name"
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
                  handleClick(e);
                }}
              >
                Done
              </StyledButton>
            </Form>
          </div>
        </>
      )}
    </>
  );
};

const ChatbotAdmin = () => {
  const [name, setName] = useState('');
  const [ind, setInd] = useState('');
  const [open, setOpen] = useState(false);
  const [msgg, setMsgg] = useState('');
  const [btn, setBtn] = useState('');
  const [messages, setMessages] = useState([]);
  const { loading, data, error } = useSelector(
    (state) => state.chatbot,
  );
  // const [level1, setLevel1] = useState([]);
  const dispatch = useDispatch();
  // const [edit, setEdit] = useState({});

  const query = `query{
    questions{
      level
      index
      msg
      info
    }
  }`;

  useEffect(() => {
    console.log('rerender');
  });

  useEffect(() => {
    console.log(messages);
  }, [messages]);

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

  const handleClick = (e, index) => {
    e.preventDefault();
    setMessages((m) => {
      console.log(name);
      console.log(index);
      const tempm = m.slice();
      console.log(tempm);
      const tempa = tempm[index];
      console.log(tempa);
      const tempo = tempa.filter((a) => {
        if (a.index.localeCompare(name) === 0) {
          return a;
        }
        return null;
      });
      console.log(tempo);
      tempo[0].msg = btn;
      tempo[0].info = msgg;
      console.log(tempm);
      return tempm;
    });
    console.log('msgg=', msgg);
    console.log('btn=', btn);
    console.log('name=', name);
  };

  const handleDelete = (d, index) => {
    setMessages((m) => {
      console.log(index);
      const tempm = m.slice();
      const tempa = tempm[index];
      const tempa1 = tempa.filter((a) => {
        if (a.index.substring(0, d.length).localeCompare(d) === 0) {
          console.log(d);
          console.log(a.index);
          console.log(a.index.substring(0, d.length));
          return null;
        }
        return a;
      });
      tempm[index] = tempa1;
      console.log(tempm);
      console.log(tempa);
      return tempm;
    });
  };

  useEffect(() => {
    console.log(typeof name);
  }, [name]);

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
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              {msg[0].info}
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
                                }}
                              >
                                Edit
                              </span>
                              <span
                                onClick={() => {
                                  handleDelete(msg[0].index, index);
                                }}
                                style={{
                                  cursor: 'pointer',
                                }}
                              >
                                delete
                              </span>
                              <br />
                              <Acc
                                msg={msg}
                                spacemax={spacemax}
                                spaces={1}
                                filt={msg[0].index}
                                messages={messages}
                                setMessages={setMessages}
                                index={index}
                                // edit={edit}
                                // setEdit={setEdit}
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
                <Form.Label>Button Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Button Name"
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
