function ChannelFilters({ filteredChannels, setFilteredChannels }) {
  //zamiast robic let, const to używaj tej konstrukcji const [nazwa, setNazwa] = useState(wartosc poczatkowa)
  //https://stackoverflow.com/questions/58252454/react-hooks-using-usestate-vs-just-variables <- nizej ktos napisal czemu sie tego nie uzywa
  //filteredChannels zawiera listę kanałów (wszystkich)
  //setFilteredChannels jest funkcją do zmiany kanałów, jeśli chcesz przefiltrwać kanały musisz napisać setFilteredChannels(przefiltrowane kanały)
  //do filtrowania kanałów, używaj .filter() z jsa, do sortowania możesz .sort(), ale lepiej używać z lodasha bo jest łatwiejsza
  //w sortowaniu jsowym trzeba definiować jeszcze w jaki sposób chcemy sortować, więc dobrze by było użyć tej z lodasha xd
  //żeby używać lodasha musisz napisać import * as _ from 'lodash' i potem możesz używać _.filter(...) tak jak w dokumentacji
  //https://lodash.com/docs/4.17.15#filter <- tutaj masz np docsy do filtrowania
  //jak zrobisz input fielda (w sumie to chyba każdy) to one mają swoje value (np każda opcja w dropdownie ma inną)
  // w sensie piszesz na elemencie value={jakas wartosc} i wtedy robisz funkcje która jako arugment ma (event)
  // i w ciele funkcji piszesz event.target.value <- to przechowuje wartość którą przypisałeś w value
  // dzieki temu bedziesz wiedzial np po czym sortujesz
  // mozesz zrobic sobie consta sort np
  //i moze on wygladac jak json
  // np. {name: false, channelName: false} i na kliknieciu przechowasz wartosc channelName
  //to pozniej w ciele funkcji zamienisz channelName z jsona na true
  //tutaj pomocny bedzie ten spread operator (...) zeby nie przepisywac calego jsona
  // jesli napiszesz {...jakas_nazwa_pooprzedniego_json, channelName: true} to wszystkie wartości które miał tamten json
  // zostaną wrzucone do tego nowego obiektu, a channelName zostanie nadpisany na true
  //a no i nie uzywaj querySelectorów, na każdym polu mozesz dodać jakiś atrybut, który go obsłuży, jesli bys nie wiedzial jak cos zrobic
  // to tego jest pelno w necie
  let prevf = 0;
  let currf = 0;
  let currs = 0;
  let prevs = 0;
  let checkboxlist = [...document.querySelectorAll('input')];

  function FiltersSetCheckboxes() {
    prevf = currf;
    for (let i = 1; i < 4; i++) {
      if (checkboxlist[i].checked === true && i !== prevf) {
        currf = i;
      }
    }
    for (let j = 1; j < 4; j++) {
      if (j !== currf) {
        checkboxlist[j].checked = false;
      }
    }
  }

  function SortSetCheckboxes() {
    prevs = currs;
    for (let i = 4; i < 6; i++) {
      if (checkboxlist[i].checked === true && i !== prevs) {
        currs = i;
      }
    }
    for (let j = 4; j < 6; j++) {
      if (j !== currs) {
        checkboxlist[j].checked = false;
      }
    }
  }

  function SortChannelList() {}

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
          <input type='checkbox' onClick={FiltersSetCheckboxes} /> Channel name{' '}
        </div>
        <div>
          {' '}
          <input type='checkbox' onClick={FiltersSetCheckboxes} /> Owner name{' '}
        </div>
        <div>
          {' '}
          <input type='checkbox' onClick={FiltersSetCheckboxes} /> Active user{' '}
        </div>
      </div>
      <label id='channel-filters-label'> Sort: </label>
      <div className='sort'>
        <div>
          {' '}
          <input type='checkbox' onClick={SortSetCheckboxes} /> Increasing{' '}
        </div>
        <div>
          {' '}
          <input type='checkbox' onClick={SortSetCheckboxes} /> Decreasing{' '}
        </div>
      </div>
      <button id='filter-button' type='submit' onClick={SortChannelList}>
        {' '}
        Submit{' '}
      </button>
    </div>
  );
}

export default ChannelFilters;
