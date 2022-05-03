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
      GetChannelList();
    });
    socket.current.on('joinChannel', (mess) => {
      GetChannelList();
    });
    return () => socket.current.emit('end');
  }, []);

  return (
    <div>
      {channel && (
        <div className='channel-details-main'> 
            <div id='channel-details-title'>
              <h1>{channel.name}</h1>
            </div>

            <div className='channel-details-container'>
              
              <div className='channel-details-left'>

                <div id='channel-details-left-owner'>
                  <div id='name'> <strong> Owner: </strong> </div>
                  <div> {channel.owner[0].login} </div>
                </div>

                <div id='channel-details-left-users'>
                  <div id='name'> <strong> Active users: </strong> </div>
                    <div id='channel-details-left-users-list'>
                      {channel.activeUsers.map((el) => {
                        return (
                          <div id='active-user' key={el.login}>
                            <div id='point'> </div>
                            <span> {el.login} </span>
                          </div>
                      );})}
                    </div>
                </div>

                <button id='leave-channel-button'
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
