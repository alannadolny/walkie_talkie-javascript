import { connect } from 'react-redux';
import { getChannelsFromState } from '../ducks/channels/selector';
import {
  GetChannelList,
  JoinChannel,
  DeleteChannel,
} from '../ducks/channels/operation';
import { useEffect } from 'react';
import * as _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import { getUserFromState } from '../ducks/user/selector';
import cross from '../images/cross.png';
import UserProfile from './UserProfile';
import ChannelFilters from './ChannelFilters';
import mqtt from 'mqtt/dist/mqtt';
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

  useEffect(() => {
    const client = mqtt.connect('mqtt://localhost:8000/mqtt');
    client.subscribe(`channel/join`, () => {
      client.on('message', (_, message) => {
        JoinChannelAction(JSON.parse(message.toString()));
      });
    });
    return () => {
      client.end();
    };
  });

  useEffect(() => {
    const client = mqtt.connect('mqtt://localhost:8000/mqtt');
    client.subscribe(`channel/leave`, () => {
      client.on('message', (_, message) => {
        LeaveChannelAction(JSON.parse(message.toString()));
      });
    });
    return () => {
      client.end();
    };
  });

  useEffect(() => {
    if (_.isEmpty(channels)) GetChannelList();
  }, []);

  return (
    <div className='channels-main'>
      <ChannelFilters />
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
            channels.map((el) => {
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
                      }}
                    >
                      Join channel
                    </button>
                    <span>
                      {' '}
                      <strong>
                        {' '}
                        Active user: {el.activeUsers.length}{' '}
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
                          return (
<<<<<<< HEAD
                              <span key={active}> {active.login} </span>
                          );
                        } else {
                          return (
                              <span key={active}> {active.login}, </span>
=======
                            <div key={index}>
                              <span key={index}> &nbsp; {active.login} </span>
                            </div>
                          );
                        } else {
                          return (
                            <div key={index}>
                              <span key={index}> &nbsp; {active.login}, </span>
                            </div>
>>>>>>> 7b2ff3f451f5314fe0321979ce7c4dbd75375eff
                          );
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
