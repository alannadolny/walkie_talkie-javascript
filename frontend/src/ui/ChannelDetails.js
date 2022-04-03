import { useSelector, connect } from 'react-redux';
import { getChannelDetails } from '../ducks/channels/selector';
import { GetChannelList, LeftChannel } from '../ducks/channels/operation';
import { useEffect } from 'react';
import * as _ from 'lodash';
import { useNavigate, useParams } from 'react-router-dom';
import ChannelMessages from './ChannelMessages';

function ChannelDetails({ GetChannelList, LeftChannel }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const channel = useSelector((state) => getChannelDetails(state, id));

  useEffect(() => {
    if (!channel) GetChannelList();
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
                  <div key={el}>
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
          <ChannelMessages name={channel.name} />
        </div>
      )}
    </div>
  );
}

const mapDispatchToProps = {
  GetChannelList,
  LeftChannel,
};

export default connect(null, mapDispatchToProps)(ChannelDetails);
