import './App.css';
import Main from './ui/Main';
import Header from './ui/Header';
import UserForm from './ui/UserForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/form/:action' element={<UserForm />} />
          <Route path='/form/:action' element={<UserForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
