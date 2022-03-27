import './App.css';
import Main from './ui/Main';
import Header from './ui/Header';
import UserForm from './ui/UserForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import { GetUser } from './ducks/user/operation';
import { useEffect } from 'react';
import { useState } from 'react';
import ChannelsList from './ui/ChannelsList';
import { getUserFromState } from './ducks/user/selector';
import Warning from './ui/Warning';
import ChannelForm from './ui/ChannelForm';

function App({ GetUser, user }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    GetUser();
  }, []);

  return (
    <div className='App'>
      {console.log(user)}
      <BrowserRouter>
        <Header visible={visible} setVisible={setVisible} />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route
            path='/form/:action'
            element={<UserForm visible={visible} />}
          />
          <Route
            path='/form/:action'
            element={<UserForm visible={visible} />}
          />
          <Route
            path='/channels'
            element={user.login ? <ChannelsList /> : <Warning />}
          />
          <Route
            path='/channel/form'
            element={user.login ? <ChannelForm /> : <Warning />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: getUserFromState(state),
  };
};

const mapDispatchToProps = {
  GetUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
