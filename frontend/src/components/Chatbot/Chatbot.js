/* eslint-disable no-else-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect, useRef } from 'react';
import { Card, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Buttons from './components/Buttons';
import Message from './components/Message';
import Robot from './components/Robot';
import { getChat } from '../../actions/chatbotAction';

export default function Chatbot() {
  const [click, setClick] = useState(false);
  const [chats, setChats] = useState([
    { type: 'robot', message: 'Welcome to chatbot' },
  ]);
  const [options, setOptions] = useState([]);

  const dispatch = useDispatch();
  const chatbot = useSelector((state) => state.chatbot);

  const bottomRef = useRef();

  const handleClick = (option) => {
    setChats((c) => {
      return [...c, { type: 'message', message: `${option.msg}` }];
    });
    setChats((c) => {
      return [...c, { type: 'robot', message: `${option.info}` }];
    });
    console.log(
      chatbot.data.filter((value) => {
        const len = option.index.length;
        if (
          value.index
            .substring(0, len + 1)
            .localeCompare(`${option.index} `) === 0
        ) {
          return value;
        }
        return null;
      }),
    );
    setOptions(
      chatbot.data.filter((value) => {
        const len = option.index.length;
        if (
          value.index
            .substring(0, len + 1)
            .localeCompare(`${option.index} `) === 0 &&
          value.index.length === len + 2
        ) {
          return value;
        }
        return null;
      }),
    );
  };

  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView({
      behaviour: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  };

  const query = `query{
    questions{
      level
      index
      msg
      info
    }
  }`;

  useEffect(() => {
    if (chatbot.data) {
      setOptions(
        chatbot.data.filter((value) => {
          return value.level === '1';
        }),
      );
      const filtered = chatbot.data.filter((value) => {
        return value.level === '1';
      });
      console.log(filtered);
    }
  }, [chatbot.data]);

  useEffect(() => {
    if (click) dispatch(getChat(query));
  }, [click]);

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  return (
    <>
      <MODAL_STYLES2>
        <CARD_STYLES
          style={{
            display: `${click ? 'block' : 'none'}`,
          }}
        >
          <div
            className="mt-1"
            style={{ textAlign: 'end', cursor: 'pointer' }}
            onClick={() => setClick((cli) => !cli)}
          >
            <i
              className="far fa-times-circle"
              style={{ fontSize: '25px' }}
            />
          </div>
          <Container
            className="mt-2"
            style={{ height: '78%', overflowY: 'auto' }}
          >
            {chatbot.loading
              ? 'Loading'
              : chats.map((chat, index) => {
                  if (chat.type === 'message') {
                    if (index === chats.length - 1)
                      return (
                        <Message
                          message={chat.message}
                          key={index}
                          bottom={bottomRef}
                        />
                      );
                    else
                      return (
                        <Message
                          message={chat.message}
                          key={index}
                          bottom={false}
                        />
                      );
                  } else if (chat.type === 'robot') {
                    if (index === chats.length - 1)
                      return (
                        <Robot
                          message={chat.message}
                          key={index}
                          bottom={bottomRef}
                        />
                      );
                    else
                      return (
                        <Robot
                          message={chat.message}
                          key={index}
                          bottom={false}
                        />
                      );
                  }

                  return <></>;
                })}
            {}
          </Container>
          <FOOTER_STYLES className="ml-2 mb-2">
            <small className="ml-2">
              {options.length === 0
                ? ''
                : 'Choose from one of the replies below'}
            </small>
            <br />
            <div
              style={{
                whiteSpace: 'nowrap',
                overflowX: 'auto',
                width: '90%',
              }}
            >
              {options.map((option) => {
                return (
                  <Buttons
                    key={option.index}
                    option={option}
                    handleClick={handleClick}
                  />
                );
              })}
            </div>
          </FOOTER_STYLES>
        </CARD_STYLES>
      </MODAL_STYLES2>

      <MODAL_STYLES1>
        <i
          className="fas fa-caret-down"
          style={{
            fontSize: '50px',
            margin: '0px',
            display: `${click ? 'block' : 'none'}`,
            color: 'rgb(236, 226, 226)',
          }}
        />
      </MODAL_STYLES1>

      <MODAL_STYLES>
        <div>
          <MESSAGE_ICON
            onClick={() => {
              setClick((cli) => !cli);
            }}
          >
            <i
              className="far fa-comment-dots fa-2x"
              style={{ color: '#FFDFC3' }}
            />
          </MESSAGE_ICON>
        </div>
      </MODAL_STYLES>
    </>
  );
}

const MODAL_STYLES = styled.div`
  position: fixed;
  bottom: 4%;
  right: 5%;
  transform: translate(5%, 4%);
  background-color: transparent;
  padding: 0px;
  z-index: 1000;
`;

const MESSAGE_ICON = styled.div`
  background-color: #30475e;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  padding: 0px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0px;
  z-index: 1000;
`;

const CARD_STYLES = styled(Card)`
  background-color: #e9eff5;
  margin: 0px;
  height: 497px;
  width: 348px;
  box-shadow: 5px 5px 5px;
  position: relative;
`;

const MODAL_STYLES1 = styled.div`
  position: fixed;
  bottom: 8.5%;
  right: 5.7%;
  transform: translate(5.7%, -8.5%);
  background-color: transparent;
  padding: 0px;
`;

const MODAL_STYLES2 = styled.div`
  position: fixed;
  bottom: 8.6%;
  right: 6.5%;
  transform: translate(6.5%, -8.6%);
  background-color: transparent;
  padding: 0px;
`;

const FOOTER_STYLES = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
`;
