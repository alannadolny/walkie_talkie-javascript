import { connect } from 'react-redux';
import { getChannelsFromState } from '../ducks/channels/selector';
import { GetChannelList } from '../ducks/channels/operation';
import { useEffect, useState } from 'react';
import * as _ from 'lodash';

function ChannelFilters({ channels, GetChannelList }) {
  const [filters, setFilters] = useState({
    channelName: [],
    ownerName: [],
    activeUser: [],
    sort: 0, // powiedzmy ze 0 to increase, a 1 to decrease
  }); //to bedzie obiekt zawierajacy tablice, w ktorych beda elementy po ktorych chcemy filtrowac
  // jesli tablice beda puste to nie filtrujemy po danym elemencie
  const [showFilters, setShowFilters] = useState({
    channelName: false,
    ownerName: false,
    activeUser: false,
  });

  return (
    <div className='channel-filters-container'>
      {console.log(filters)}
      <label id='channel-filters-container-title'> Find channel: </label>
      <input
        id='channel-filters-input'
        name='channel'
        type='text'
        placeholder='Write channel name:'
      />
      <label id='channel-filters-label'> Filters: </label>
      <div className='filters'>
        <div>
          <input
            type='checkbox'
            onClick={() =>
              setShowFilters({
                ...showFilters,
                channelName: !showFilters.channelName,
              })
            }
          />
          Channel name
          {showFilters.channelName && (
            <div>
              {channels.map((el) => {
                return (
                  <div style={{ marginLeft: '5px' }}>
                    <input
                      type='checkbox'
                      onClick={() =>
                        !filters.channelName.includes(el.name)
                          ? setFilters({
                              ...filters,
                              channelName: [...filters.channelName, el.name],
                            })
                          : setFilters({
                              ...filters,
                              channelName: [
                                ...filters.channelName.filter(
                                  (el2) => el2 !== el.name
                                ),
                              ],
                            })
                      }
                    />
                    {el.name}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div>
          <input
            type='checkbox'
            onClick={() => setShowFilters({ ...showFilters, ownerName: true })}
          />
          Owner name
        </div>
        <div id='owner-name-list'> </div>
        <div>
          <input
            type='checkbox'
            onClick={() => setShowFilters({ ...showFilters, activeUser: true })}
          />
          Active user
        </div>
      </div>
      <div className='sort'>
        <label id='channel-filters-label'> Sort: </label>
        {/* <div> <input type='checkbox' onClick={SortSetCheckboxes} /> Increasing </div>
          <div> <input type='checkbox' onClick={SortSetCheckboxes} /> Decreasing </div> */}
      </div>
      {/* <button id='filter-button' type='submit' onClick={SortingChannelList}> Submit </button> */}
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
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelFilters);
