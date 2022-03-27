import { Form, Formik, Field, ErrorMessage } from 'formik';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import * as yup from 'yup';
import { SignIn, Register } from '../ducks/user/operation';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { getUserFromState } from '../ducks/user/selector';
import { useNavigate } from 'react-router-dom';

function UserForm({ SignIn, Register, user, visible }) {
  const { action } = useParams();
  const navigate = useNavigate();

  const schema = yup.object().shape({
    login: yup.string('Login should be a string').required('Login is required'),
    password: yup
      .string('Password should be a string')
      .required('Password is required'),
  });

  const style = {
    opacity: '70%',
  };

  return (
    <div>
      <div className='main-login' style={visible ? style : {}}>
        <div className='login-form' style={visible ? style : {}}>
          <div className='login-setting' style={visible ? style : {}}>
            <h1 id='login-title' style={visible ? style : {}}>
              {' '}
              {action === 'login' ? 'SIGN IN!' : 'REGISTER!'}{' '}
            </h1>
            <Formik
              validationSchema={schema}
              onSubmit={(values) => {
                action === 'login'
                  ? SignIn(values.login, values.password)
                  : Register(values.login, values.password);
                navigate('/channels');
              }}
              enableReinitialize={true}
              initialValues={{
                login: '',
                password: '',
              }}
            >
              <Form>
                <label>Login: </label>
                <ErrorMessage id='error' name='login' component='div' />
                <Field name='login' />
                <label>Password: </label>
                <ErrorMessage id='error' name='password' component='div' />
                <Field name='password' type='password' />
                <div id='button-container'>
                  <button type='submit'> SUBMIT </button>
                </div>
              </Form>
            </Formik>
            <Link id='help' to='/'>
              {' '}
              Do you need help? Contact us!{' '}
            </Link>
          </div>
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
