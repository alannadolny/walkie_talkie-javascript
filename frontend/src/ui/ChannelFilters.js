import { connect } from 'react-redux';
import { getChannelsFromState } from '../ducks/channels/selector';
import {GetChannelList} from '../ducks/channels/operation';
import { useEffect } from 'react';
import * as _ from 'lodash';

function ChannelFilters({channels,GetChannelList}) {
  let prevf = 0;
  let currf = 0;
  let currs = 0;
  let prevs = 0;
  let checkboxlist = [...document.querySelectorAll('input')];
  let getOwnerList = document.getElementById('owner-name-list');
  let ownerList = [];

  useEffect(() => {
    if (_.isEmpty(channels)) GetChannelList();
  }, []);
  
  function SetOwnerList(){
    getOwnerList.style.display = 'flex';

    channels.forEach(element => {
      ownerList.push(element.owner[0].login);
    })
    ownerList = [...new Set(ownerList)];

    ownerList.forEach(element => {
      getOwnerList.innerHTML += `<div id='owner-name'> <input type='checkbox'/> <span> ${element} </span> </div>`;
    })
  } 

  function FiltersSetCheckboxes(){
    prevf=currf;
    for(let i=1; i<4; i++){
      if(checkboxlist[i].checked===true && i!==prevf){
        currf = i;
      }
    }
    for(let j=1; j<4; j++){
      if(j !== currf){
        checkboxlist[j].checked = false;
      }
    }
    if(checkboxlist[2].checked === true){
      SetOwnerList();
    }else{
      getOwnerList.style.display = 'none';
      ownerList = ownerList.shift(0,ownerList.length);
    }
  }

  function SortSetCheckboxes(){
    prevs=currs;
    for(let i=4; i<6; i++){
      if(checkboxlist[i].checked===true && i!==prevs){
        currs = i;
      }
    }
    for(let j=4; j<6; j++){
      if(j !== currs){
        checkboxlist[j].checked = false;
      }
    }
  }

  function SortingChannelList(){
    if(checkboxlist[1].checked === true){
      
    }
  }

  return (
    <div className='channel-filters-container'>
        <label id='channel-filters-container-title'> Find channel: </label>
        <input id='channel-filters-input' name='channel' type='text' placeholder='Write channel name:'/>
        <label id='channel-filters-label'> Filters: </label>
        <div className='filters'>
          <div> <input type='checkbox' onClick={FiltersSetCheckboxes}/> Channel name </div>
          <div> <input type='checkbox' onClick={FiltersSetCheckboxes}/> Owner name </div>
          <div id='owner-name-list'> 
          
          </div>
          <div> <input type='checkbox' onClick={FiltersSetCheckboxes}/> Active user </div>
        </div>
        <label id='channel-filters-label'> Sort: </label> 
        <div className='sort'>
          <div> <input type='checkbox' onClick={SortSetCheckboxes}/> Increasing </div>
          <div> <input type='checkbox' onClick={SortSetCheckboxes}/> Decreasing </div>
        </div>
        <button id='filter-button' type='submit' onClick={SortingChannelList}> Submit </button>
    </div>
  );
}

//export default ChannelFilters;


const mapStateToProps = (state) => {
  return {
    channels: getChannelsFromState(state),
  };
};

const mapDispatchToProps = {
  GetChannelList
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelFilters);