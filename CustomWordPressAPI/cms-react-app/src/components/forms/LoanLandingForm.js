import { useState } from 'react';
import { Button, Form} from 'react-bootstrap';
import '../../css/components/forms.scss';
import 'react-phone-number-input/style.css';
import validateEmail from './helpers/validateEmail';
import PhoneField from './helpers/PhoneField';
import BottomForm from './helpers/BottomForm';
import submitLoanLandingForm from './helpers/submitLoanLandingForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';


export const LoanLandingForm = (props) => {
    const [validPhone, setValidPhone] = useState(true);
    const [validEmail, setValidEmail] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    let {landingName, title, paragraph, buttonText} = props;
    if(!landingName) landingName = '/student-loans-landing'; 
    if(!title) title = "Begin your student loan search"
    if(!paragraph) paragraph = "Fill out the form to create an account and see potential student loan options you may qualify for.";
    if(!buttonText) buttonText = "Find my options";

    return(
        <div className='landing-form nomad-form' id="secondaryForm">
            <Form onSubmit={e => {
                e.preventDefault();
                setSubmitting(true);
                const formData = new FormData(e.target),
                details = Object.fromEntries(formData.entries())
                if (details.phone_number && details.phone_number.replace(/ /g,'').length < 10) {
                    setValidPhone(false);
                    setSubmitting(false);
                } else {
                    setValidPhone(true);
                    if (details.email) {
                        if (!validateEmail(details.email)) {
                            setValidEmail(false);
                            setSubmitting(false);
                        } else {
                            setValidEmail(true);
                            submitLoanLandingForm(e, landingName);
                        }
                    } else {
                        setValidEmail(false);
                        setSubmitting(false);
                    }
                }
            }}>
                <div className='top-form'>
                    <p className='text-center form-header'>{title}</p>
                    <p>{paragraph}</p>
                </div>
                <Form.Group className="mb-3">
                    <Form.Control type="text"  id='alFName' name="first_name" required  />
                    <Form.Label>First Name*</Form.Label>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Control type="text" id='alLName'  name="last_name" required />
                    <Form.Label>Last Name*</Form.Label>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="email" id='alEmail' name="email" required  />
                    <Form.Label>Email*</Form.Label>
                    { validEmail ? <></> : <><br /><Form.Label style={{color:'red'}}>Please provide a valid email.</Form.Label></>}
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="phone_number" >
                    <PhoneField />
                    <Form.Label>Phone Number*</Form.Label>
                    { validPhone ? <></> : <><br /><Form.Label style={{color:'red'}}>Please fill phone number completely.</Form.Label></>}
                </Form.Group>

                <Button disabled={submitting ? true : false} variant="primary" size='lg' className='extra-pad' type="submit" >
                    {submitting ? <FontAwesomeIcon icon={faSpinner} spin />  : buttonText} 
                </Button>
            </Form>
            <BottomForm buttonText={buttonText} />
        </div>
    )
}

export const LoanLandingFormTest = (props) => {
    const [validPhone, setValidPhone] = useState(true);
    const [validEmail, setValidEmail] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    let {landingName, title, paragraph, buttonText} = props;
    if(!landingName) landingName = '/student-loans-landing'; 
    if(!title) title = "Begin your student loan search"
    if(!paragraph) paragraph = "Fill out the form to create an account and see potential student loan options you may qualify for.";
    if(!buttonText) buttonText = "Find my options";

    return(
        <div className='landing-form nomad-form test-form' id="secondaryForm">
            <Form onSubmit={e => {
                e.preventDefault();
                setSubmitting(true);
                const formData = new FormData(e.target),
                details = Object.fromEntries(formData.entries())
                if (details.phone_number && details.phone_number.replace(/ /g,'').length < 10) {
                    setValidPhone(false);
                    setSubmitting(false);
                } else {
                    setValidPhone(true);
                    if (details.email) {
                        if (!validateEmail(details.email)) {
                            setValidEmail(false);
                            setSubmitting(false);
                        } else {
                            setValidEmail(true);
                            submitLoanLandingForm(e, landingName);
                        }
                    } else {
                        setValidEmail(false);
                        setSubmitting(false);
                    }
                }
            }}>
                <div className='top-form'>
                    <p className='text-center form-header'>{title}</p>
                    <p>{paragraph}</p>
                </div>
                <Form.Group className="mb-3">
                    <Form.Label>First Name*</Form.Label>
                    <Form.Control type="text"  id='alFName' name="first_name" required  />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Last Name*</Form.Label>
                    <Form.Control type="text" id='alLName'  name="last_name" required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email*</Form.Label>
                    <Form.Control type="email" id='alEmail' name="email" required  />
                    { validEmail ? <></> : <><br /><Form.Label style={{color:'red'}}>Please provide a valid email.</Form.Label></>}
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="phone_number" >
                    <Form.Label>Phone Number*</Form.Label>
                    <PhoneField />
                    { validPhone ? <></> : <><br /><Form.Label style={{color:'red'}}>Please fill phone number completely.</Form.Label></>}
                </Form.Group>

                <Button disabled={submitting ? true : false} variant="primary" size='lg' className='extra-pad' type="submit" >
                    {submitting ? <FontAwesomeIcon icon={faSpinner} spin />  : buttonText} 
                </Button>
            </Form>
            <BottomForm buttonText={buttonText} />
        </div>
    )
}
