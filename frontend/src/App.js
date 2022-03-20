import walkieTalkie from './walkie-talkie.png';
import './App.css';
import UserForm from './ui/UserForm';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={walkieTalkie} className='App-logo' alt='logo' />
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
        <UserForm />
      </header>
    </div>
  );
}

export default App;
