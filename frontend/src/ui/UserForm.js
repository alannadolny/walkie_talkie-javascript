import { Form, Formik, Field, ErrorMessage } from 'formik';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import * as yup from 'yup';
import { SignIn, Register } from '../ducks/user/operation';

function UserForm({ SignIn, Register }) {
  const { action } = useParams();
  const schema = yup.object().shape({
    login: yup.string('Login should be a string').required('Login is required'),
    password: yup
      .string('Password should be a string')
      .required('Password is required'),
  });

  return (
    <div>
      <div className='main-login'>
        <div className='login-form'>
          <div className='login-setting'>
            <h1 id='login-title'>
              {' '}
              {action === 'login' ? 'SIGN IN!' : 'REGISTER!'}{' '}
            </h1>
            <Formik
              validationSchema={schema}
              onSubmit={(values) => {
                action === 'login'
                  ? SignIn(values.login, values.password)
                  : Register(values.login, values.password);
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
            <a id='help' href=''>
              {' '}
              Do you need help? Contact us!{' '}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  SignIn,
  Register,
};

export default connect(null, mapDispatchToProps)(UserForm);
