import { getMessagesFromState } from '../ducks/messages/selector';
import { connect } from 'react-redux';
import { GetMessages } from '../ducks/messages/operation';
import * as _ from 'lodash';
import { useEffect, useState } from 'react';
import { SendMessage } from '../ducks/messages/operation';
import { AddNewMessage } from '../ducks/messages/actions';

function ChannelMessages({
  GetMessages,
  messages,
  name,
  SendMessage,
  AddNewMessage,
}) {
  const [message, setMessage] = useState('');

  const newMessage = () => {
    SendMessage(name, message);
    setMessage('');
  };

  useEffect(() => {
    GetMessages(name);
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
