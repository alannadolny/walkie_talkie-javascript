import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { CreateNewChannel } from '../ducks/channels/operation';

function ChannelForm({ CreateNewChannel }) {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    name: yup
      .string('Channel name should be a string')
      .required('channel name is required'),
  });

  return (
    <div>
      <div className='main-login'>
        <div className='login-form'>
          <div className='login-setting'>
            <h1 id='login-title'>Create new channel</h1>
            <Formik
              validationSchema={schema}
              onSubmit={(values) => {
                CreateNewChannel(values.name);
                navigate(-1);
              }}
              enableReinitialize={true}
              initialValues={{
                name: '',
              }}
            >
              <Form>
                <label>channel name: </label>
                <ErrorMessage id='error' name='name' component='div' />
                <Field name='name' />
                <div id='button-container'>
                  <button type='submit'> SUBMIT </button>
                  <button onClick={() => navigate(-1)}> UNDO </button>
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

const mapDispatchToProps = {
  CreateNewChannel,
};

export default connect(null, mapDispatchToProps)(ChannelForm);
