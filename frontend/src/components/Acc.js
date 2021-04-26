/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable radix */
import React, { useState } from 'react';
import { Button, Accordion, Card, Form } from 'react-bootstrap';
import styled from 'styled-components';
import Additem from './Additem';

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
  const [arrow, setArrow] = useState({});
  const [delt, setDelt] = useState(false); // to show the delete pop up box
  const [dmsg, setDmsg] = useState(); // to save index to be delted on clicking delete icon

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
      tempo[0].msg = btn;
      tempo[0].info = msgg;
      return tempm;
    });
    setOpen(false);
  };

  const handleDelete = (d) => {
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
            <Card style={{ backgroundColor: '#F9F9F9' }}>
              <Card.Header
                style={{
                  backgroundColor: '#F9F9F9',
                  padding: '0',
                  borderBottom: '2px solid rgba(0,0,0,0.125)',
                }}
              >
                <Accordion.Toggle
                  as={StyledBtn}
                  variant="link"
                  eventKey="1"
                  onClick={() => {
                    setArrow((a) => {
                      const tempa = { ...a };
                      if (tempa[`${dispmsg.index}`]) {
                        tempa[`${dispmsg.index}`] = false;
                      } else {
                        tempa[`${dispmsg.index}`] = true;
                      }
                      return tempa;
                    });
                  }}
                >
                  <span style={{ fontWeight: '100' }}>
                    {dispmsg.msg}&nbsp;&nbsp;&nbsp;
                    {arrow[`${dispmsg.index}`] ? (
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
                    backgroundColor: '#F9F9F9',
                    paddingRight: '0px',
                    paddingLeft: '1rem',
                  }}
                >
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
                      position: 'absolute',
                      right: '10px',
                      color: '#929293',
                    }}
                  >
                    <i className="fas fa-edit" />
                  </span>
                  <span
                    onClick={() => {
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
                  handleDelete(dmsg);
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

export default Acc;

const StyledButton = styled(Button)`
  float: right;
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

const StyledButtn = styled(Button)`
  border-radius: 4px;
  margin-top: 12px;
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
`;
