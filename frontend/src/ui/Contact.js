import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useState } from 'react';

function Contact({ visible }) {
  const style = {
    opacity: '40%',
  };

  const [send, setSend] = useState(null);

  const schema = yup.object().shape({
    sender: yup
      .string('Email should be a string')
      .email('Not appropriate email address')
      .required('Email is required'),
    message: yup
      .string('Message should be a string')
      .required('Message is required')
      .min(5, 'Message should be longer than 5 characters'),
  });

  return (
    <div className='contact-main' style={visible ? style : {}}>
      <div className='contact-container'>
        <div id='contact-title'>
          <h1> Lets contact us! </h1>
        </div>
        <Formik
          validationSchema={schema}
          onSubmit={(values) => {
            axios
              .post('http://localhost:5000/mail', values)
              .then((_) => {
                setSend(true);
              })
              .catch((_) => {
                setSend(false);
              });
          }}
          enableReinitialize={true}
          initialValues={{
            sender: '',
            message: '',
          }}
        >
          <Form className='contact-formik'>
            <label id='contact-label'> Your e-mail: </label>
            <ErrorMessage id='error' name='sender' component='div' />
            <Field
              id='contact-email'
              name='sender'
              type='email'
              placeholder='E-mail:'
            />

            <label id='contact-label'> Your message: </label>
            <ErrorMessage id='error' name='message' component='div' />
            <Field
              id='contact-message'
              name='message'
              type='text'
              placeholder='Write message: '
            />
            <div id='contact-button'>
              <button type='submit'> SEND! </button>
            </div>
            {send !== null && (
              <div style={{ textAlign: 'center' }}>
                {send ? (
                  <p style={{ color: 'white' }}>Message was sent</p>
                ) : (
                  <p style={{ color: 'red' }}>
                    Error occured during sending message
                  </p>
                )}
              </div>
            )}
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Contact;
