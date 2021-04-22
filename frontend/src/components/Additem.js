/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable radix */
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import styled from 'styled-components';

const Additem = ({ msg, setMessages, index, filt, messages }) => {
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const [msgg, setMsgg] = useState('');
  const [btn, setBtn] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  useEffect(() => {
    if (msg) {
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
      if (dispmsgs.length !== 0) {
        const len = dispmsgs.length;
        let last = dispmsgs[len - 1];
        last = last.index;
        let lastchar = last[last.length - 1];
        lastchar = parseInt(lastchar);
        lastchar += 1;
        const nameTemp =
          last.substring(0, last.length - 1) + lastchar;
        setName(nameTemp);
      } else if (dispmsgs.length === 0) {
        const nameTemp = `${filt} 1`;
        setName(nameTemp);
      }
    }
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    if (msg) {
      if (msgg === '' || btn === '') {
        setError(true);
        return;
      }
      if (msgg && btn) {
        setError(false);
      }
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
      const tempmsg = msg.slice();
      tempmsg.push(temp);
      setMessages((m) => {
        const tempm = m.slice();
        tempm[index] = tempmsg;
        return tempm;
      });
      setOpen(false);
      setBtn('');
      setMsgg('');
    } else {
      setMessages((m) => {
        const tempm = m.slice();
        const tempa = [
          {
            level: '1',
            index: `${m.length + 1}`,
            msg: msgg,
            info: btn,
          },
        ];
        tempm.push(tempa);
        setOpen(false);
        setBtn('');
        setMsgg('');
        return tempm;
      });
    }
  };

  return (
    <div>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <span
        style={{
          cursor: 'pointer',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          color: 'green',
        }}
        onClick={() => {
          setOpen(true);
        }}
      >
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <i className="fas fa-plus-circle" />
        &nbsp; Add Button
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
                  value={btn}
                  onChange={(e) => {
                    setBtn(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Button Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Button Name"
                  name={name}
                  value={msgg}
                  onChange={(e) => {
                    setMsgg(e.target.value);
                  }}
                />
              </Form.Group>
              <small
                className="text-danger"
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                &nbsp;{error && `Info and Message are required`}
              </small>
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

export default Additem;

const StyledButton = styled(Button)`
  float: right;
  border-radius: 4px;
  margin-top: 12px;
`;
