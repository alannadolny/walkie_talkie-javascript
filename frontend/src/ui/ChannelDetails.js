import { useSelector, connect } from 'react-redux';
import { getChannelDetails } from '../ducks/channels/selector';
import { GetChannelList, LeftChannel } from '../ducks/channels/operation';
import { useEffect, useRef } from 'react';
import * as _ from 'lodash';
import { useNavigate, useParams } from 'react-router-dom';
import ChannelMessages from './ChannelMessages';
import { getUserFromState } from '../ducks/user/selector';
import ChannelMedia from './ChannelMedia';
import { io } from 'socket.io-client';

import {
  LeaveChannelAction,
  JoinChannelAction,
} from '../ducks/channels/actions';

function ChannelDetails({ GetChannelList, LeftChannel, user }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const channel = useSelector((state) => getChannelDetails(state, id));
  const socket = useRef(null);

  useEffect(() => {
    GetChannelList();
  }, []);

  useEffect(() => {
    socket.current = io(`http://${window.location.hostname}:5000`);
    socket.current.on('leaveChannel', (mess) => {
      LeaveChannelAction({ name: mess.name, login: mess.user });
    });
    socket.current.on('joinChannel', (mess) => {
      if (mess.user !== user.login)
        JoinChannelAction({ name: mess.name, login: mess.user });
    });
    return () => socket.current.emit('end');
  }, []);

  return (
    <div>
      {channel && (
        <div>
          <div>
            <div>
              <h1>{channel.name}</h1>
            </div>
            <div>owner: {channel.owner[0].login}</div>
            <div>
              active users:{' '}
              {channel.activeUsers.map((el) => {
                return (
                  <div key={el.login}>
                    <strong>{el.login}</strong>
                  </div>
                );
              })}
            </div>
            <button
              onClick={() => {
                LeftChannel(channel.name);
                socket.current.emit('leaveChannel', {
                  name: channel.name,
                  user: user.login,
                });
                navigate('/channels');
              }}
            >
              Left this channel
            </button>
          </div>
          <ChannelMedia channel={channel} user={user} />
          <ChannelMessages
            name={channel.name}
            socket={socket}
            user={user}
            id={id}
          />
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: getUserFromState(state),
  };
};

const mapDispatchToProps = {
  GetChannelList,
  LeftChannel,
  LeaveChannelAction,
  JoinChannelAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelDetails);
