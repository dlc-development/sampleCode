
import { useState} from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import validateEmail from './helpers/validateEmail';
import PhoneField from './helpers/PhoneField';
import BottomForm from './helpers/BottomForm';
import submitLoanLandingForm from './helpers/submitLoanLandingForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export const LoanBottomForm = (props) => {
    const [validPhone, setValidPhone] = useState(true);
    const [validEmail, setValidEmail] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    let {landingName, title, paragraph, buttonText} = props;
    if(!landingName) landingName = '/student-loans-landing'; 
    if(!title) title = "Begin your student loan search";
    if(!paragraph) paragraph = "Fill out the form to create an account and see potential student loan options you may qualify for."
    if(!buttonText) buttonText = "Find my options"

    return(
        <Container fluid className='signup-form nomad-form pt-0 pb-5' id="mainForm">
                <Row> 
                    <Col md={{offset:3}}>
                        
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
                                <Form.Control  type="email"  id='alEmail' name="email" required  />
                                <Form.Label>Email*</Form.Label>
                                { validEmail ? <></> : <><br /><Form.Label style={{color:'red'}}>Please provide a valid email.</Form.Label></>}
                            </Form.Group>
                            
                            <Form.Group className="mb-3" controlId="phone_number" >
                                <PhoneField />
                                <Form.Label>Phone Number*</Form.Label>
                                { validPhone ? <></> : <><br /><Form.Label style={{color:'red'}}>Please fill phone number completely.</Form.Label></>}
                            </Form.Group>

                            <Button disabled={submitting ? true : false}  variant="primary" size='lg' className='extra-pad' type="submit" >
                                {submitting ? <FontAwesomeIcon icon={faSpinner} spin />  : buttonText}
                            </Button>
                            <BottomForm buttonText={buttonText} />
                        </Form>
                        
                    </Col>
                    <Col className='spacer' md={3} />
                </Row>
            </Container>
    )
}

export default LoanBottomForm;