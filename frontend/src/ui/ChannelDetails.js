import { useSelector, connect } from 'react-redux';
import { getChannelDetails } from '../ducks/channels/selector';
import { GetChannelList, LeftChannel } from '../ducks/channels/operation';
import { useEffect } from 'react';
import * as _ from 'lodash';
import { useNavigate, useParams } from 'react-router-dom';
import ChannelMessages from './ChannelMessages';
import { useBeforeunload } from 'react-beforeunload';
import mqtt from 'mqtt/dist/mqtt';
import { getUserFromState } from '../ducks/user/selector';
import ChannelMedia from './ChannelMedia';

function ChannelDetails({ GetChannelList, LeftChannel, user }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const channel = useSelector((state) => getChannelDetails(state, id));

  useEffect(() => {
    if (!channel) GetChannelList();
  }, []);

  useBeforeunload((e) => {
    navigate('/channels');
    LeftChannel(channel.name);
    const client = mqtt.connect('mqtt://localhost:8000/mqtt');
    client.publish(
      '/disconnect',
      JSON.stringify({
        channel: channel.name,
        user: user.login,
      })
    );
    return 'Are you sure you want to disconnect?';
  });

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
                navigate('/channels');
              }}
            >
              Left this channel
            </button>
          </div>
          <ChannelMedia channel={channel} user={user} />
          <ChannelMessages name={channel.name} />
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
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelDetails);
