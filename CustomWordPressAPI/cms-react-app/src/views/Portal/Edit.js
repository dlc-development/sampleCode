import { Container, Row, Col} from 'react-bootstrap';
import { EditApplicationForm } from '../../components/Forms';
import React, { useState, useEffect } from 'react';
import Spinner from '../../components/Spinner';
import signupFormData from "../../components/signupOptions.json";
import { useFeatureFlagVariantKey } from 'posthog-js/react';
// import canonicalHelper from '../../helpers/canonicalHelper';

const Edit = (props) => {
    const {edit2} = props;
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id")
    const user_id = searchParams.get("user_id")

    const studentLoanVariant = useFeatureFlagVariantKey('loan_search_202404')
    // const admissionsVariant = useFeatureFlagVariantKey('admissions_search_form')
    // if(studentLoanVariant) console.log('student_loans_search_form variant:', studentLoanVariant)
    // if(admissionsVariant) console.log('admissions_search_form variant:', admissionsVariant)

    const [type, setType] = useState('student_loan')
    const [application, setApplication] = useState(false);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState(false);
    const [firstName, setFirstName] = useState(false);
    const [lastName, setLastName] = useState(false);
    const [phone, setPhone] = useState(false);
    const [phoneCountryCode, setPhoneCountryCode] = useState(false);
    const [theseUniversities, setTheseUniversities] = useState(null);

    function sessionStorageHasUtms() {
        return sessionStorage.getItem('utm_source') !== null
            || sessionStorage.getItem('utm_medium') !== null
            || sessionStorage.getItem('utm_campaign') !== null
            || sessionStorage.getItem('utm_term') !== null
            || sessionStorage.getItem('utm_content') !== null;
    }

    useEffect(() => {
        
        let universities = signupFormData.universities.map(x => { 
            return {value: x, label:x}
        });
        setTheseUniversities(universities);

        fetch(`/nomadapi.php?order_id=/api/v1/universities`)
            .then(response => response.json())
            .then(response => {
                response = response.data;
                let theseUnis = response.map(x => {
                    return{value:x.name, label:x.name}
                });
                let universities = []
                
                universities = universities.concat(theseUnis)
                setTheseUniversities(universities)
            })
            .catch(error => {
                console.log('error', ""+error);
            });
        
        let utmParams = {
            utm_source: sessionStorage.getItem('utm_source'),
            utm_medium: sessionStorage.getItem('utm_medium'),
            utm_campaign: sessionStorage.getItem('utm_campaign'),
            utm_term: sessionStorage.getItem('utm_term'),
            utm_content: sessionStorage.getItem('utm_content'),
            path: sessionStorage.getItem('path_for_utm'),
        }

        const formBody = Object.keys(utmParams).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(utmParams[key])).join('&');
        if (sessionStorageHasUtms()) {
            fetch(`/nomadapi.php?order_id=/api/v1/utms&user_id=${user_id}&${formBody}`,
                {
                    // credentials: "include",
                    method: "POST",
                    // body: JSON.stringify({
                    //     utm_source: sessionStorage.getItem('utm_source'),
                    //     utm_medium: sessionStorage.getItem('utm_medium'),
                    //     utm_campaign: sessionStorage.getItem('utm_campaign'),
                    //     utm_term: sessionStorage.getItem('utm_term'),
                    //     utm_content: sessionStorage.getItem('utm_content'),
                    //     path: sessionStorage.getItem('path_for_utm'),
                    // }),
                    // headers: {
                    //     'Accept': 'application/json',
                    //     'Content-Type': 'application/json'
                    // }
                })
                .then(response => console.log('utms',response.json()))
                .catch(error => console.log(error));
            sessionStorage.removeItem('utm_source');
            sessionStorage.removeItem('utm_medium');
            sessionStorage.removeItem('utm_campaign');
            sessionStorage.removeItem('utm_term');
            sessionStorage.removeItem('utm_content');
            sessionStorage.removeItem('path_for_utm');
        }

        //NEW API
        ///api/v1/users/wordpress
        fetch(`/nomadapi.php?order_id=/api/v1/users/&user_id=${user_id}`)
            .then(response => response.json())
            .then(response => {
                
                if(response && response.data){
                    response = response.data;
                    setEmail(response.email);
                    setFirstName(response.first_name);
                    setLastName(response.last_name);
                }
                
                
                //
                fetch(`/getApplication.php?app_id=${id}`) //
                .then(response => response.json())
                .then(response => {
                    response = response.data;

                    setPhone(response.phone_number);
                    if (typeof response.phone_country_code === "string") {
                        setPhoneCountryCode(response.phone_country_code.toUpperCase());
                    }
                    setType(response.application_type)
                    setApplication(response);
                    setLoading(false);

                    
                    
                })
                .catch(error => {
                    console.log('error', ""+error);
                });
            })
            .catch(error => {
                console.log('error', ""+error);
            });
    }, []);
        

    //type should be student_loan or admissions, defaults to student_loan
    if(loading) return(<Spinner />)
    if(!id) return(<p>No Application ID Found</p>);
    if(!user_id) return(<p>Something whent wrong.</p>);

    return(
        <>
        {/* <Helmet>
            <link rel="canonical" href={canonicalHelper(props.location.href)} />
        </Helmet> */}
            <Container>
                <Row>
                    <Col lg={{offset:3, span:6}} style={{paddingBottom:'200px'}}>
                        <EditApplicationForm phoneCountryCode={phoneCountryCode} email={email} firstName={firstName} lastName={lastName} phone={phone} type={type} application={application} universities={theseUniversities} user_id={user_id} edit2={edit2} studentLoanVariant={studentLoanVariant}  />
                        {/* studentLoanVariant={studentLoanVariant} admissionsVariant={admissionsVariant} */}
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default Edit