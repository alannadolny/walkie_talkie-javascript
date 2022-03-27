import { connect } from 'react-redux';
import { getChannelsFromState } from '../ducks/channels/selector';
import { GetChannelList, JoinChannel } from '../ducks/channels/operation';
import { useEffect } from 'react';
import * as _ from 'lodash';
import { useNavigate } from 'react-router-dom';

function ChannelsList({ channels, GetChannelList, JoinChannel }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (_.isEmpty(channels)) GetChannelList();
  }, []);

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <h1>Channel List</h1>
        <button
          style={{ width: '200px', marginLeft: '10px' }}
          onClick={() => navigate('/channel/form')}
        >
          Create new channel
        </button>
      </div>
      <div>
        {channels &&
          channels.map((el) => {
            return (
              <div
                key={el._id}
                style={{
                  border: '1px solid black',
                  margin: '10px',
                  padding: '10px',
                }}
              >
                <strong>name: {el.name}</strong> <br />
                <button
                  onClick={() => {
                    JoinChannel(el.name);
                    navigate(`/channel/details/${el._id}`);
                  }}
                  style={{ margin: '10px' }}
                >
                  {' '}
                  Join this channel
                </button>
                <strong>owner: {el.owner[0].login}</strong>
                {!_.isEmpty(el.activeUsers) ? (
                  <div
                    key={el.activeUsers}
                    style={{
                      border: '1px solid black',
                      padding: '10px',
                      width: '100px',
                    }}
                  >
                    <strong>active users: </strong>
                    {el.activeUsers.map((active) => {
                      return (
                        <div key={active}>
                          <strong key={active}>{active.login}</strong>
                        </div>
                      );
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
  );
}

const mapStateToProps = (state) => {
  return {
    channels: getChannelsFromState(state),
  };
};

const mapDispatchToProps = {
  GetChannelList,
  JoinChannel,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelsList);
