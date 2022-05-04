import './App.css';
import Main from './ui/Main';
import Header from './ui/Header';
import UserForm from './ui/UserForm';
import About from './ui/About';
import Contact from './ui/Contact';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import { GetUser } from './ducks/user/operation';
import { useEffect } from 'react';
import { useState } from 'react';
import ChannelsList from './ui/ChannelsList';
import { getUserError, getUserFromState } from './ducks/user/selector';
import Warning from './ui/Warning';
import ChannelForm from './ui/ChannelForm';
import ChannelDetails from './ui/ChannelDetails';
import LoadingPage from './ui/LoadingPage';

function App({ GetUser, user, error }) {
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
          <Route
            path='/'
            element={
              !user.login ? (
                <Main visible={visible} setVisible={setVisible} />
              ) : (
                <ChannelsList visible={visible} setVisible={setVisible} />
              )
            }
          />
          <Route
            path='/about'
            element={<About visible={visible} setVisible={setVisible} />}
          />
          <Route
            path='/contact'
            element={<Contact visible={visible} setVisible={setVisible} />}
          />
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
            element={
              user.login ? (
                <ChannelsList visible={visible} setVisible={setVisible} />
              ) : error === true ? (
                <Warning />
              ) : (
                <LoadingPage />
              )
            }
          />
          <Route
            path='/channel/form'
            element={
              user.login ? (
                <ChannelForm visible={visible} setVisible={setVisible} />
              ) : error === true ? (
                <Warning />
              ) : (
                <LoadingPage />
              )
            }
          />
          <Route
            path='/channel/details/:id'
            element={
              user.login ? (
                <ChannelDetails />
              ) : error === true ? (
                <Warning />
              ) : (
                <LoadingPage />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: getUserFromState(state),
    error: getUserError(state),
  };
};

const mapDispatchToProps = {
  GetUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
