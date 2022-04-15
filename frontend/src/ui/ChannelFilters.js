
function ChannelFilters() {
  let prevf = 0;
  let currf = 0;
  let currs = 0;
  let prevs = 0;
  let checkboxlist = [...document.querySelectorAll('input')];



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

  function SortChannelList(){
    
  }

  return (
    <div className='channel-filters-container'>
        <label id='channel-filters-container-title'> Find channel: </label>
        <input id='channel-filters-input' name='channel' type='text' placeholder='Write channel name:'/>
        <label id='channel-filters-label'> Filters: </label>
        <div className='filters'>
          <div> <input type='checkbox' onClick={FiltersSetCheckboxes}/> Channel name </div>
          <div> <input type='checkbox' onClick={FiltersSetCheckboxes}/> Owner name </div>
          <div> <input type='checkbox' onClick={FiltersSetCheckboxes}/> Active user </div>
        </div>
        <label id='channel-filters-label'> Sort: </label> 
        <div className='sort'>
          <div> <input type='checkbox' onClick={SortSetCheckboxes}/> Increasing </div>
          <div> <input type='checkbox' onClick={SortSetCheckboxes}/> Decreasing </div>
        </div>
        <button id='filter-button' type='submit' onClick={SortChannelList}> Submit </button>
    </div>
  );
}

export default ChannelFilters;
