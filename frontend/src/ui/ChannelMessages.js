import { getMessagesFromState } from '../ducks/messages/selector';
import { connect } from 'react-redux';
import { GetMessages } from '../ducks/messages/operation';
import * as _ from 'lodash';
import { useEffect, useState } from 'react';
import { SendMessage } from '../ducks/messages/operation';
import { AddNewMessage } from '../ducks/messages/actions';
import { io } from 'socket.io-client';
import { channelsReducer } from '../ducks/channels/reducer';

function ChannelMessages({
  GetMessages,
  messages,
  name,
  SendMessage,
  AddNewMessage,
  socket,
  user,
  id,
}) {
  const [message, setMessage] = useState('');

  const newMessage = () => {
    SendMessage(name, message);
    socket.current.emit('message', {
      to: name,
      id: id,
      from: user.login,
      message: message,
    });
    setMessage('');
  };

  useEffect(() => {
    GetMessages(name);
  }, []);

  useEffect(() => {
    socket.current = io(`http://${window.location.hostname}:5000`);

    socket.current.on('newMessage', (mess) => {
      if (mess.to === name && mess.from !== user.login)
        AddNewMessage({
          sender: [{ login: mess.from }],
          channel: mess.id,
          text: mess.message,
        });
    });

    return () => socket.current.emit('end');
  }, []);

  return (
    <div style={{ border: '1px solid black' }}>
      <div>
        <h3>Messages:</h3>
        {!_.isEmpty(messages) &&
          messages.map((el) => {
            return (
              <div key={el._id}>
                <strong>{el.sender[0].login}:</strong> {el.text}
              </div>
            );
          })}
      </div>
      <input
        type='text'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        onClick={() => {
          newMessage();
        }}
      >
        send
      </button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    messages: getMessagesFromState(state),
  };
};

const mapDispatchToProps = {
  GetMessages,
  SendMessage,
  AddNewMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelMessages);
