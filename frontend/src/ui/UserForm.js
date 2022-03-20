import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

function UserForm() {
  const schema = yup.object().shape({
    login: yup.string('Login should be a string').required('Login is required'),
    password: yup
      .string('Password should be a string')
      .required('Password is required'),
  });

  return (
    <div>
      <Formik
        validationSchema={schema}
        onSubmit={(values) => {
          console.log(values);
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
          <strong>password: </strong>
          <Field name='password' />
          <button type='submit'>zaloguj</button>
        </Form>
      </Formik>
    </div>
  );
}

export default UserForm;
