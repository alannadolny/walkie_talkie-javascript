import { Form, Formik, Field, ErrorMessage } from 'formik';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import * as yup from 'yup';
import { SignIn } from '../ducks/user/operation';

function UserForm({ SignIn }) {
  const { action } = useParams();

  const schema = yup.object().shape({
    login: yup.string('Login should be a string').required('Login is required'),
    password: yup
      .string('Password should be a string')
      .required('Password is required'),
  });

  return (
    <div>
      {action === 'login' ? 'sign in' : 'register'}
      {/* sign in i register wpakuj w cos jak chcesz, tak zeby pasowalo ci do stylowania */}
      <Formik
        validationSchema={schema}
        onSubmit={(values, { resetForm }) => {
          SignIn(values.login, values.password);
          resetForm();
        }}
        enableReinitialize={true}
        initialValues={{
          login: '',
          password: '',
        }}
      >
        <Form>
          <div id='errors'>
            <ErrorMessage name='login' component='div' />
            <ErrorMessage name='password' component='div' />
          </div>
          <strong>Login </strong>
          <Field name='login' />
          <strong>Password: </strong>
          <Field name='password' type='password' />
          <button type='submit'>zaloguj</button>
        </Form>
      </Formik>
    </div>
  );
}

const mapDispatchToProps = {
  SignIn,
};

export default connect(null, mapDispatchToProps)(UserForm);
