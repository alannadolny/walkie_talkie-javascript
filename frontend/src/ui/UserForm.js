import { Form, Formik, Field, ErrorMessage } from 'formik';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import * as yup from 'yup';
import { SignIn, Register } from '../ducks/user/operation';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserFromState } from '../ducks/user/selector';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function UserForm({ SignIn, Register, user, visible }) {
  const { action } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const schema = yup.object().shape({
    login: yup.string('Login should be a string').required('Login is required'),
    password: yup
      .string('Password should be a string')
      .required('Password is required'),
  });

  const style = {
    opacity: '40%',
  };

  return (
    <div className='main-login' style={visible ? style : {}}>
      <div className='login-form'>
        <div className='login-setting'>
          <h1 id='login-title'>
            {' '}
            {action === 'login' ? 'SIGN IN!' : 'REGISTER!'}{' '}
          </h1>
          <Formik
            validationSchema={schema}
            onSubmit={(values) => {
              if (action === 'login') {
                axios
                  .get(`http://localhost:5000/users/exists/${values.login}`)
                  .then((v) => {
                    if (v.data.exists === true) {
                      axios
                        .post('http://localhost:5000/users/login', {
                          login: values.login,
                          password: values.password,
                        })
                        .then((v2) => {
                          SignIn(values.login, values.password);
                          navigate('/channels');
                        })
                        .catch(() => {
                          setError(`Password doesn't match`);
                        });
                    } else {
                      setError('Invalid login');
                    }
                  });
              } else {
                axios
                  .get(`http://localhost:5000/users/exists/${values.login}`)
                  .then((v) => {
                    if (v.data.exists === false) {
                      Register(values.login, values.password);
                      navigate('/channels');
                    } else {
                      setError('This login is already taken');
                    }
                  });
              }
            }}
            enableReinitialize={true}
            initialValues={{
              login: '',
              password: '',
            }}
          >
            <Form className='login-formik'>
              <label id='login-label'>Login: </label>
              <ErrorMessage id='error' name='login' component='div' />
              <Field name='login' />
              <label id='login-label'>Password: </label>
              <ErrorMessage id='error' name='password' component='div' />
              <Field name='password' type='password' />
              <div id='button-container'>
                <button type='submit'> SUBMIT </button>
              </div>
            </Form>
          </Formik>
          {error}
          <Link id='help' to='/contact'>
            {' '}
            Do you need help? Contact us!{' '}
          </Link>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: getUserFromState(state),
  };
};

const mapDispatchToProps = {
  SignIn,
  Register,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
