import './App.css';
import Main from './ui/Main';
import Header from './ui/Header';
import UserForm from './ui/UserForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import { GetUser } from './ducks/user/operation';
import { useEffect } from 'react';
import { useState } from 'react';

function App({ GetUser }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    GetUser();
  }, []);

  return (
    <div className='App'>
      <BrowserRouter>
        <Header visible = {visible} setVisible={setVisible}/>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/form/:action' element={<UserForm visible = {visible}/>} />
          <Route path='/form/:action' element={<UserForm visible = {visible}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const mapDispatchToProps = {
  GetUser,
};

export default connect(null, mapDispatchToProps)(App);
