import React, {useEffect, useState} from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import { SignUpForm } from '../../components/Forms';
import signupFormData from "../../components/signupOptions.json";

const SignIn = (props) => {

    const [theseUniversities, setTheseUniversities] = useState([]);

    useEffect(() => {

        fetch(`/whoami.php`)
                .then(response => response.json())
                .then(response => {
                    console.log('whoami', response)
                    //if(!response.logged_in) window.location.href = '/index'
                    if(response.logged_in) window.location.href = '/app?dashboard=true';
                })
                .catch(error => {
                    console.log('error', ""+error);
                });

        let universities = signupFormData.universities.map(x => { 
            return {value: x, label:x}
        });
        setTheseUniversities(universities);

        fetch(`/api/v1/universities`)
            .then(response => response.json())
            .then(response => {
                let theseUnis = response.map(x => {
                    return{value:x.name, label:x.name}
                });
                let universities = signupFormData.universities.map(x => { 
                    return {value: x, label:x}
                })
                universities = universities.concat(theseUnis)
                setTheseUniversities(universities)
            })
            .catch(error => {
                console.log('error', ""+error);
            });
    }, []);

    return(
        <>
            <Container>
                <Row>
                    <Col lg={{offset:3, span:6}}>
                        <SignUpForm universities={theseUniversities} />
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default SignIn