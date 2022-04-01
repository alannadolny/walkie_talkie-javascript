import { Form, Formik, Field, ErrorMessage } from 'formik';

function Contact({visible}){
    const style = {
        opacity: '40%',
      };

    return <div className="contact-main" style={visible ? style : {}}>
        <div className="contact-container">
            <div id="contact-title">
                <h1> Lets contact us! </h1>
            </div>
            <Formik>
                <Form className='contact-formik'>
                    <label id='contact-label' for='contact-email'> Your e-mail: </label>
                    <ErrorMessage id='error' name='contact-email' component='div' /> 
                    <Field id="contact-email" name='contact-email' type='email' placeholder="E-mail:"/>

                    <label id='contact-label' for='contact-message'> Your message: </label>
                    <textarea id='contact-message' name='contact-message' type='text' placeholder="Write message: "/>
                    <div id="contact-button">
                        <button type='submit'> SEND! </button>
                    </div>
                </Form>
            </Formik>
        </div>
    </div>
}

export default Contact;