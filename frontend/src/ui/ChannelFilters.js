import { connect } from 'react-redux';
import { getChannelsFromState } from '../ducks/channels/selector';
import { GetChannelList } from '../ducks/channels/operation';
import { useEffect, useState } from 'react';
import * as _ from 'lodash';
import { filter, forEach, set } from 'lodash';

function ChannelFilters({ channels, activeUsers, GetChannelList,findChannel, setFindChannel }) {
  const [filters, setFilters] = useState({
    ownerName: [],
    activeUser: []
  });

  useEffect(() =>{
    setFilters({ownerName: [], activeUser: []})
  },[findChannel])
  
  const [showFilters, setShowFilters] = useState({
    ownerName: false,
    activeUser: false,
  });


  const [sort, setSort] = useState('');

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
        onChange = {(e) => {
          setFindChannel([])
          channels.filter((element) => {
            if(element.name.toLowerCase().includes(e.target.value)){
              setFindChannel(prev => [...prev,element])
            }
          })
          if(e.target.value === ''){
            setFindChannel(channels)
          }
        }}
      />
      <label id='channel-filters-label'> Filters: </label>
      <div className='filters'>
        <div>
          {' '}
          <input
            id='checkbox'
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
                    <span> {element} </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div>
          {' '}
          <input
            id='checkbox'
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
                    <span> {element} </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className='sort'>
        <label id='channel-filters-label'> Sort: </label>
        <select onChange={(e) => {setSort(e.target.value)}}>
          <option value='channel asc'> A-Z channel </option>
          <option value='channel desc'> Z-A channel </option>
          <option value='owner asc'> A-Z owner </option>
          <option value='owner desc'> Z-A owner </option>
          <option value='users asc'> A-Z users </option>
          <option value='users desc'> Z-A users </option>
        </select>
      </div>
      <button id='filter-button' type='submit' onClick={() => {
        if(filters.ownerName.length !== 0 && filters.activeUser.length !== 0){
          setFindChannel(channels.filter((e) => _.includes(filters.ownerName,e.owner[0].login)))
          findChannel.filter((e) => {e.activeUsers.forEach((el) => {
            if(filters.activeUser.includes(el.login)){
              return true;
            }else{
              return false;
            }
          })})
        }else if(filters.ownerName.length !== 0 && filters.activeUser.length === 0){
          setFindChannel(channels.filter((e) => _.includes(filters.ownerName,e.owner[0].login)))
        }else if(filters.ownerName.length === 0 && filters.activeUser.length !== 0){
          setFindChannel(channels.filter((e) => e.activeUsers.forEach((el) => {
            if(filters.activeUser.includes(el.login)){
              return true;
            }else{
              return false;
            }
          })))
        }else{
          setFindChannel(channels)
        }
        setShowFilters({ownerName: false, activeUser: false})
        let checkboxes = [...document.querySelectorAll("#checkbox")];
        checkboxes.forEach((e) => {
          e.checked = false;
        })
      }}> Submit </button>
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
