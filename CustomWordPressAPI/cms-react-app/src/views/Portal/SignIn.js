import { Container, Row, Col} from 'react-bootstrap';
import { SignInForm } from '../../components/Forms';

const SignIn = (props) => {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    let message = urlParams.get('message');
    if(message && message === 'email_exists') message = 'That email already exists, please log in.'

    return(
        <>
            <Container>
                {email ? <h3 style={{textAlign:'center', marginTop:'20px'}}>A user with that email is already registered, please sign in.</h3> : ''}
                <Row className={message ? 'mt-5' : 'hidden'}>
                    <Col lg={{offset:3, span:6}}>
                        <h2 className='text-center'>{message ? message : ''}</h2>
                    </Col>
                </Row>
                <Row>
                    <Col lg={{offset:3, span:6}}>
                        <SignInForm email={email} />
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default SignIn