import { connect } from 'react-redux';
import { getChannelsFromState } from '../ducks/channels/selector';
import {
  GetChannelList,
  JoinChannel,
  DeleteChannel,
} from '../ducks/channels/operation';
import { useEffect, useRef, useState } from 'react';
import * as _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import { getUserFromState } from '../ducks/user/selector';
import cross from '../images/cross.png';
import UserProfile from './UserProfile';
import ChannelFilters from './ChannelFilters';
import { io } from 'socket.io-client';

import {
  JoinChannelAction,
  LeaveChannelAction,
} from '../ducks/channels/actions';

function ChannelsList({
  channels,
  GetChannelList,
  JoinChannel,
  user,
  DeleteChannel,
  JoinChannelAction,
  LeaveChannelAction,
}) {
  const navigate = useNavigate();

  const [filteredChannels, setFilteredChannels] = useState(channels);
  const socket = useRef(null);

  useEffect(() => {
    if (_.isEmpty(channels)) {
      GetChannelList();
    }
  }, []);

  useEffect(() => {
    socket.current = io(`http://${window.location.hostname}:5000`);

    socket.current.on('joinChannel', (mess) => {
      JoinChannelAction({ name: mess.name, login: mess.user });
    });

    socket.current.on('leaveChannel', (mess) => {
      LeaveChannelAction({ name: mess.name, login: mess.user });
    });

    return () => socket.current.emit('end');
  });

  useEffect(() => {
    setFilteredChannels(channels);
  }, [channels]);

  return (
    <div className='channels-main'>
      <ChannelFilters
        filteredChannels={filteredChannels}
        setFilteredChannels={setFilteredChannels}
      />
      <div className='channels-left-container'>
        <div id='channels-left-container-header'>
          <h1> Channel List: </h1>

          <button
            id='new-channel-button'
            onClick={() => navigate('/channel/form')}
          >
            Create new channel
          </button>
        </div>

        <div id='channels-container'>
          {channels &&
            filteredChannels.map((el) => {
              return (
                <div id='channel-container' key={el._id}>
                  <div id='channel-container-header'>
                    <strong> Name: {el.name}</strong> <br />
                    {user.login === el.owner[0].login && (
                      <button
                        id='delete-channel-button'
                        onClick={() => DeleteChannel(el.name)}
                      >
                        <img src={cross} alt='error'></img>
                      </button>
                    )}
                  </div>

                  <div id='channel-container-status'>
                    <strong>Owner: {el.owner[0].login}</strong>
                    <button
                      id='join-channel-button'
                      onClick={() => {
                        JoinChannel(el.name);
                        navigate(`/channel/details/${el._id}`);
                        socket.current.emit('joinChannel', {
                          name: el.name,
                          user: user.login,
                        });
                      }}
                    >
                      Join channel
                    </button>
                    <span>
                      {' '}
                      <strong>
                        {' '}
                        Active users: {el.activeUsers.length}{' '}
                      </strong>{' '}
                    </span>
                  </div>

                  {!_.isEmpty(el.activeUsers) ? (
                    <div
                      id='channel-container-activeusers'
                      key={el.activeUsers}
                    >
                      <strong> Users: </strong>
                      {el.activeUsers.map((active, index) => {
                        if (index === el.activeUsers.length - 1) {
                          return <span key={active}> {active.login} </span>;
                        } else {
                          return <span key={active}> {active.login}, </span>;
                        }
                      })}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              );
            })}
        </div>
      </div>

      <UserProfile />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    channels: getChannelsFromState(state),
    user: getUserFromState(state),
  };
};

const mapDispatchToProps = {
  GetChannelList,
  JoinChannel,
  DeleteChannel,
  JoinChannelAction,
  LeaveChannelAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelsList);
