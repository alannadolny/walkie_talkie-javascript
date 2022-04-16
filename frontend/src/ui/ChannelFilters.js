import { connect } from 'react-redux';
import { getChannelsFromState } from '../ducks/channels/selector';
import { GetChannelList } from '../ducks/channels/operation';
import { useEffect, useState } from 'react';
import * as _ from 'lodash';
import { filter } from 'lodash';

function ChannelFilters({ channels, activeUsers, GetChannelList }) {
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

  let ownerList = [];
  let activeUserList = [];
  channels.forEach((element) => {
    ownerList.push(element.owner[0].login);
    element.activeUsers.forEach((element2) => {
      activeUserList.push(element2.login);
    });
  });
  ownerList = [...new Set(ownerList)];
  activeUserList = [...new Set(activeUserList)];

  return (
    <div className='channel-filters-container'>
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
          {' '}
          {/* <input type='checkbox' />
          Channel name{' '} */}
        </div>

        <div>
          {' '}
          <input
            type='checkbox'
            onClick={() =>
              setShowFilters({
                ...showFilters,
                ownerName: !showFilters.ownerName,
              })
            }
          />
          Owner name
          {showFilters.ownerName && (
            <div className='filter-list'>
              {ownerList.map((element) => {
                return (
                  <div id='filter-list-container'>
                    <input
                      type='checkbox'
                      onClick={() =>
                        !filters.ownerName.includes(element)
                          ? setFilters({
                              ...filters,
                              ownerName: [...filters.ownerName, element],
                            })
                          : setFilters({
                              ...filters,
                              ownerName: [
                                ...filters.ownerName.filter(
                                  (el) => el !== element
                                ),
                              ],
                            })
                      }
                    />
                    {element}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div>
          {' '}
          <input
            type='checkbox'
            onClick={() =>
              setShowFilters({
                ...showFilters,
                activeUser: !showFilters.activeUser,
              })
            }
          />
          Active user
          {showFilters.activeUser && (
            <div className='filter-list'>
              {activeUserList.map((element) => {
                return (
                  <div id='filter-list-container'>
                    <input
                      type='checkbox'
                      onClick={() =>
                        !filters.activeUser.includes(element)
                          ? setFilters({
                              ...filters,
                              activeUser: [...filters.activeUser, element],
                            })
                          : setFilters({
                              ...filters,
                              activeUser: [
                                ...filters.activeUser.filter(
                                  (el) => el !== element
                                ),
                              ],
                            })
                      }
                    />
                    {element}
                  </div>
                );
              })}
            </div>
          )}
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
