import { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Form} from 'react-bootstrap';
import PhoneInput, {getCountryCallingCode} from 'react-phone-number-input';
import signupFormData from "./signupOptions.json";
//import Select from 'react-select';
import '../css/components/forms.scss';
import 'react-phone-number-input/style.css';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faSpinner, faQuestionCircle,faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Select from "react-select";
import { usePostHog } from 'posthog-js/react';


const submitContactMessage = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target),
        details = Object.fromEntries(formData.entries())
    const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');

    fetch(`/contact_messages_newsite`,
        {
            method: "POST",
            credentials: "include",
            body: formBody,
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(response =>
            {
                console.log(response);
                // TODO: Show a message saying thank you, we will be in touch.
            }
        )
        .catch((error) => console.log(error));
};

const submitSignInForm = (e, stateSetter, setSpinner) => {
    e.preventDefault();

    const formData = new FormData(e.target),
        details = Object.fromEntries(formData.entries())
        details.email = details['user[email]']
        details.password = details['user[password]']
    const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');
    fetch(`/signin.php?${formBody}`,{
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
    .then(response => response.json())
    .then(response => {
        if(response && response.logged_in){
            console.log('response', response)
            window.location.href = '/dashboard?dashboard=true'
        } else {
            console.log('response', response)
            if(stateSetter) stateSetter('Username or Password is Incorrect')
        }
    })
    // fetch(`https://staging.nomadcredit.com/users/sign_in`,
    //     {
    //         method: "POST",
    //         redentials: "include",
    //         body: formBody,
    //         headers: {
    //             'Content-Type': 'application/x-www-form-urlencoded'
    //         }
    //     })
    //     .then(response =>
    //         {
    //             console.log('signin response', response)

    //             fetch(`https://staging.nomadcredit.com/api/v1/users/applications/types`)
    //             .then(response => {
    //                 console.log('dashboard', response)
    //             })
    //             .catch(error => {
    //                 console.log('error', ""+error);
    //             });

    //             fetch(`https://staging.nomadcredit.com/api/v1/whoami`)
    //                 .then(response => response.json())
    //                 .then(response => {
    //                     console.log('response', response)
    //                     // if(response.logged_in) window.location.href = '/dashboard';
    //                     // else{
    //                     //     if(setSpinner) setSpinner(false)
    //                     //     if(stateSetter) stateSetter('Username or Password is Incorrect')
    //                     // }
    //                 })
    //                 .catch(error => {
    //                     console.error('error', ""+error);
    //                 });

    //             //window.location.href = '/dashboard';
    //             // if (response.url.indexOf("/applications/student_loan/new") !== -1 || response.url.indexOf("/dashboard") !== -1) {
    //             //     // success
    //             //     // TODO: Handle sending to /applications/student_loan/new
    //             //     window.location.href = '/dashboard';
    //             // } else {
    //             //     // password is bad, have them try again
    //             //     console.log('response', response)
    //             // }
    //             // TODO: Log UTMs if present in session storage (see _footer.haml's - if user_signed_in? block
    //         }
    //     )
    //     .catch((error) => console.log(error));
}

const submitSignUpForm = (e, part, detailsFromSignUpWithPassword) => {

    e.preventDefault();

    const formData = new FormData(e.target),
        details = Object.fromEntries(formData.entries());

    if (detailsFromSignUpWithPassword !== undefined && details !== null) {
        details.email = detailsFromSignUpWithPassword.email;
        details.first_name = detailsFromSignUpWithPassword.firstName;
        details.last_name = detailsFromSignUpWithPassword.lastName;
        details.phone_number = detailsFromSignUpWithPassword.phone;
        details.password = detailsFromSignUpWithPassword.password;
        if(detailsFromSignUpWithPassword.phone_numberCountry) details['phone_country_code'] = getCountryCallingCode(detailsFromSignUpWithPassword.phone_numberCountry);
        details.phone_numberCountry = detailsFromSignUpWithPassword.phone_numberCountry;
        details.interested = detailsFromSignUpWithPassword.interested
    }

    // const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');

    if (part === 3) {
        if (details.interested === 'student_loan') {
            details['landing_page_name'] = 'loans-website-sign-up';
        } else {
            details['landing_page_name'] = 'admissions-website-sign-up';
        }

        const api_route = details['landing_page_name'].indexOf('admissions') > -1 ? 'admissions' : 'loans'

        try {
            const _hsq = window._hsq = window._hsq || [];
            _hsq.push(["identify",{
                email: details.email
            }]);
            _hsq.push(['trackPageView']);
        } catch (error) {
            console.error(error);
        }

        fetch(`/api/v2/leads/from-landing-pages/${api_route}`,
            {
                method: "POST",
                credentials: "include",
                body: JSON.stringify(details),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response =>
                response.json()
            )
            .then(response => {
                    if(response.hasOwnProperty('show_thank_you') && response.show_thank_you === true){
                        // TODO: Handle better - this is where the email address already exists, we need to tell them to log in instead
                         window.location.href = '/sign-in?email_exists&email='+details.email
                        //console.log("oops");
                    }
                    else if (response.hasOwnProperty('success') && response.success === true && response.hasOwnProperty('location')) {
                        window.location.href = window.location.origin + response.location + `${(response.location.indexOf('?') === -1) ? '?' : '&'}application_type=${api_route === 'loans' ? 'student_loan' : 'admissions'}&none=${!response.has_offers}&seen_offers_before=${response.seen_offers_before}&intake_path=${response.intake_path}&program_path=${response.program_path}&home_country_path=${response.home_country_path}&school_country_path=${response.school_country_path}&cosigner_path=${response.cosigner_path}`;
                    }
                }
            ).catch((error) => console.log(error));
    }
}

const editAdmissionsForm = (e, detailsFromEditLoansForm, posthog) => {
    e.preventDefault();
    console.log('editAdmissionsForm', detailsFromEditLoansForm)
    const formData = new FormData(e.target),
        details = Object.fromEntries(formData.entries());

    if (detailsFromEditLoansForm !== undefined && details !== null) {
        details.email = detailsFromEditLoansForm.email;
        details.user_id = detailsFromEditLoansForm.user_id;
        details.first_name = detailsFromEditLoansForm.firstName;
        details.last_name = detailsFromEditLoansForm.lastName;
        details.phone_number = detailsFromEditLoansForm.phone;
        if(detailsFromEditLoansForm.phone_numberCountry) details['phone_country_code'] = getCountryCallingCode(detailsFromEditLoansForm.phone_numberCountry);
        details.phone_numberCountry = detailsFromEditLoansForm.phone_numberCountry;
    }
    
    const searchParams = new URLSearchParams(window.location.search);
    const fromPopup = searchParams.get("fromPopup")

    posthog?.capture(`${fromPopup?"Popup":"Main"}  Signup - Step 2`, { "Application Home Country":  details['application[home_country]'] });
    posthog?.capture(`${fromPopup?"Popup":"Main"}  Signup - Step 2`, { "Application School Country":  details['application[school_country]'] });
    posthog?.capture(`${fromPopup?"Popup":"Main"}  Signup - Step 2`, { "Application Degree Type":  details['application[degree_type]'] });
    posthog?.capture(`${fromPopup?"Popup":"Main"}  Signup - Step 2`, { "Application Program":  details['application[program]'] });
    posthog?.capture(`${fromPopup?"Popup":"Main"}  Signup - Step 2`, { "Application School Start Date ":  details['application[school_start_date]'] });




    const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');
    fetch(`/nomadapi.php?order_id=/api/v1/applications/${detailsFromEditLoansForm.application_id}/edit/admissions&${formBody}`,
        {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(details),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response =>
            response.json()
        )
        .then(response => {
                console.log('response', response)
                response = response.data;
                // TODO: Go to offers page without re-routing
                window.location.href =  `/offers?offers=true&id=${detailsFromEditLoansForm.application_id}&application_type=admissions&none=${!response.has_offers}&seen_offers_before=${response.seen_offers_before}&intake_path=${response.intake_path}&program_path=${response.program_path}&home_country_path=${response.home_country_path}&school_country_path=${response.school_country_path}&user_id=${details.user_id}`;

            }
        ).catch((error) => console.log(error));
}

const editLoansForm = (e, detailsFromEditLoansForm, featureFlag,posthog) => {
    e.preventDefault();

    const formData = new FormData(e.target),
        details = Object.fromEntries(formData.entries());
    

    if(featureFlag){
        if(details && details['application[school]']){
            if(details['application[school]'] === 'Still Deciding' || details['application[school]'] === 'School Not Listed'){
                let country = details['application[school_country]'];
                if(country){
                    details['application[school]'] = details['application[school]'] + " - " + country
                }
            }
        }
    }

    if (detailsFromEditLoansForm !== undefined && details !== null) {
        details.email = detailsFromEditLoansForm.email;
        details.user_id = detailsFromEditLoansForm.user_id;
        details.first_name = detailsFromEditLoansForm.firstName;
        details.last_name = detailsFromEditLoansForm.lastName;
        details.phone_number = detailsFromEditLoansForm.phone;
        if(detailsFromEditLoansForm.phone_numberCountry) details['phone_country_code'] = getCountryCallingCode(detailsFromEditLoansForm.phone_numberCountry);
        details.phone_numberCountry = detailsFromEditLoansForm.phone_numberCountry;
    }

    const searchParams = new URLSearchParams(window.location.search);
    const fromPopup = searchParams.get("fromPopup")

    posthog?.capture(`${fromPopup?"Popup":"Main"}  Signup - Step 2`, { "Application Home Country":  details['application[home_country]'] });
    posthog?.capture(`${fromPopup?"Popup":"Main"}  Signup - Step 2`, { "Application School Country":  details['application[school_country]'] });
    posthog?.capture(`${fromPopup?"Popup":"Main"}  Signup - Step 2`, { "Application Degree Type":  details['application[degree_type]'] });
    posthog?.capture(`${fromPopup?"Popup":"Main"}  Signup - Step 2`, { "Application Has Cosigner":  details['application[has_cosigner]'] });
    posthog?.capture(`${fromPopup?"Popup":"Main"}  Signup - Step 2`, { "Application School":  details['application[school]'] });



    const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');
    fetch(`/nomadapi.php?order_id=/api/v1/applications/${detailsFromEditLoansForm.application_id}/edit/loans&${formBody}`,
        {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        //.then(respons => console.log('edit loan', respons))
        .then(response =>
            response.json()
        )
        .then(response => {
            console.log("edit loans response");
            console.log(response);
            response = response.data;
            
            window.location.href = `/offers?offers=true&application_type=student_loan&none=${!response.has_offers}&seen_offers_before=${response.seen_offers_before}&intake_path=${response.intake_path}&program_path=${response.program_path}&home_country_path=${response.home_country_path}&school_country_path=${response.school_country_path}&cosigner_path=${response.cosigner_path}&id=${detailsFromEditLoansForm.application_id}&user_id=${details.user_id}`;
            }
        ).catch((error) => console.log(error));
}

const submitLoanLandingForm = (e, landingPageName) => {

    e.preventDefault();

    const formData = new FormData(e.target),
        details = Object.fromEntries(formData.entries())

    details['landing_page_name'] = landingPageName;
    if(details['phone_numberCountry']) details['phone_country_code'] = getCountryCallingCode(details['phone_numberCountry']);

    let api_route =  details['landing_page_name'].indexOf('admissions') > -1 || details['landing_page_name'].indexOf('admission') > -1 ? 'admissions' : 'loans';

    if(details['landing_page_name'].includes('admit-predictor') || details['landing_page_name'].includes('visa-made-easy') || details['landing_page_name'].includes('college-finder')){
        api_route = 'admissions' 
    }
    

    try {
        const _hsq = window._hsq = window._hsq || [];
        _hsq.push(["identify",{
            email: details.email
        }]);
        _hsq.push(['trackPageView']);
    } catch (error) {
        console.error(error);
    }

    fetch(`/api/v2/leads/from-landing-pages/${api_route}`,
        {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(details),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response =>
            response.json()
        )
        .then(response => {
            if(response.hasOwnProperty('show_thank_you') && response.show_thank_you === true){
                // TODO: Handle better - this is where the email address already exists, we need to tell them to log in instead
                //window.location.href = window.location.pathname + '/?thankYou=true'
                window.location.href = '/sign-in/email_exists?email=' + details['email'];
            }
            if (response.hasOwnProperty('success') && response.success === true && response.hasOwnProperty('location')) {
                // window.location.href = window.location.origin + response.location;
                window.location.href = window.location.origin + `/edit/${response.id}?fromLanding=true`
            }
            }
        ).catch((error) => console.log(error));
}

const passwordResetForm = (e) => {

    e.preventDefault();

    const formData = new FormData(e.target),
        details = Object.fromEntries(formData.entries())
    const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');

    fetch(`/users/password`,
        {
            method: "POST",
            credentials: "include",
            body: formBody,
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(response =>
            {
                console.log(response);
                // TODO: Show a message saying thank you, you should receive an email with instructions on how to reset your password if your account exists.
            }
        )
        .catch((error) => console.log(error));
}


const BottomForm = (props) => {
    let {buttonText} = props;
    if(!buttonText) buttonText = "Find my options";
    return(
        <div className='bottom-form'>
            <p>
                By clicking "{buttonText}", I confirm I've read and agree to Nomad Credit's <a href='/terms'>Terms of Use</a> and <a href='/privacy'>Privacy Policy</a>
            </p>
            <p className='have-account'>Already have an account? <a href='/sign-in'>Sign In</a></p>
        </div>
    )
}

const ThankYou = (props) => {

    let text = `We'll get back to you ASAP.`
    if(props.text) text = props.text;
    let thisClass = '';
    if(props.small) thisClass = 'small';

    let ThankYouContent = (props) => {
        return(
            <div className={`thank-you ${thisClass}`}>
                <div>
                    <h1>Thank You!</h1>
                    <p>{text}</p>
                </div>
            </div>
        )
    }

    if(props.block){
        return(
            <Container fluid className='signup-form pt-0 pb-5'>
                <Row> 
                    <Col md={{offset:3}}>
                        <ThankYouContent />
                    </Col>
                    <Col className='spacer' md={3} />
                </Row>
            </Container>
        )
    }

    return(
        <ThankYouContent  />
    )
}

const PhoneField = (props) => {
    let defaultValue = props.defaultValue
    if(!defaultValue) defaultValue = null;
    const [value, setValue] = useState(defaultValue)
    let name = props.name;
    if(!name) name = "phone_number"
    return(
        <PhoneInput
            className='phone-field'
            name={name}
            defaultCountry="IN"
            value={value}
            required
            onChange={setValue} />
    )
}

export const RightSignUpForm = (props) => {
    const [submitted, setSubmitted] = useState(false);
    const [validPhone, setValidPhone] = useState(true);
    const [validEmail, setValidEmail] = useState(true);
    const [validPassword, setValidPassword] = useState(true);
    let {description, checkAdmissionsOption, checkLoanOption} = props;
    if(!description) {
        description = `Fill out the form to create an account and tell us about yourself and what you're searching for. We'll show you potential lending partner loan options or put you in touch with one of our admissions counselors.`;
    }

    if(submitted) return <ThankYou />

    return(
        <div className='landing-form nomad-form'>
            <Form onSubmit={e => {
                e.preventDefault();
                const formData = new FormData(e.target),
                    details = Object.fromEntries(formData.entries())
                if (!validatePhone(details.phone_number)) {
                    setValidPhone(false);
                } else {
                    setValidPhone(true);
                    if (details.email) {
                        if (!validateEmail(details.email)) {
                            setValidEmail(false);
                        } else {
                            setValidEmail(true);
                            if (!validatePassword(details.password)) {
                                setValidPassword(false);
                            } else {
                                setValidPassword(true);
                                if (details.interested === 'Loan Options') {
                                    submitLoanLandingForm(e, 'loans-website-sign-up');
                                } else {
                                    submitLoanLandingForm(e, 'admissions-website-sign-up');
                                }

                            }
                        }
                    } else {
                        setValidEmail(false);
                    }
                }

            }}>
            <div className='top-form'>
                <h2>Sign up to get started</h2>
                <p>{description}</p>
            </div>
            
            <Form.Group className="mb-3">
                <Form.Control type="text" required  id='bfFName'  name='first_name' />
                <Form.Label>First Name*</Form.Label>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control type="text" required id='bfLName'  name='last_name' />
                <Form.Label>Last Name*</Form.Label>
            </Form.Group>
            <Form.Group className="mb-3">
                <PhoneField />
                <Form.Label>Phone Number*</Form.Label>
                { validPhone ? <></> : <><br /><Form.Label style={{color:'red'}}>Please provide a valid phone number.</Form.Label></>}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control type="email" required id='bfEmail' name="email" />
                <Form.Label>Email*</Form.Label>
                { validEmail ? <></> : <><br /><Form.Label style={{color:'red'}}>Please provide a valid email.</Form.Label></>}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control type="password" required name='password' id='bfPassword' />
                <Form.Label>Password*</Form.Label>
                { validPassword ? <></> : <><br /><Form.Label style={{color:'red'}}>Please provide a password that is at least six characters long.</Form.Label></>}
            </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>I'm Interested In:*</Form.Label>
                    <div key={`inline-radio`}>
                        <Form.Check
                            inline
                            label="Loan Options"
                            name="interested"
                            required
                            type='radio'
                            id={`inline-radio-1`}
                            value='Loan Options'
                            defaultChecked={checkLoanOption}
                        />
                        <Form.Check
                            inline
                            label="Admissions Consultation"
                            name="interested"
                            required
                            type='radio'
                            id={`inline-radio-2`}
                            value='Admissions Consultation'
                            defaultChecked={checkAdmissionsOption}
                        />
                    </div>
                </Form.Group>
            <Button variant="primary" size='lg' className='extra-pad' type="submit">
                Sign Up
            </Button>
        </Form>
            <BottomForm />
        </div>
    )
}

const validateEmail = (address) =>
{
    const tlds = ['com', 'net', 'org', 'edu', 'aaa', 'aarp', 'abb', 'abbott', 'abbvie', 'abc', 'able', 'abogado', 'abudhabi', 'ac', 'academy', 'accenture', 'accountant', 'accountants', 'aco', 'actor', 'ad', 'ads', 'adult', 'ae', 'aeg', 'aero', 'aetna', 'af', 'afl', 'africa', 'ag', 'agakhan', 'agency', 'ai', 'aig', 'airbus', 'airforce', 'airtel', 'akdn', 'al', 'alibaba', 'alipay', 'allfinanz', 'allstate', 'ally', 'alsace', 'alstom', 'am', 'amazon', 'americanexpress', 'americanfamily', 'amex', 'amfam', 'amica', 'amsterdam', 'analytics', 'android', 'anquan', 'anz', 'ao', 'aol', 'apartments', 'app', 'apple', 'aq', 'aquarelle', 'ar', 'arab', 'aramco', 'archi', 'army', 'arpa', 'art', 'arte', 'as', 'asda', 'asia', 'associates', 'at', 'athleta', 'attorney', 'au', 'auction', 'audi', 'audible', 'audio', 'auspost', 'author', 'auto', 'autos', 'avianca', 'aw', 'aws', 'ax', 'axa', 'az', 'azure', 'ba', 'baby', 'baidu', 'banamex', 'bananarepublic', 'band', 'bank', 'bar', 'barcelona', 'barclaycard', 'barclays', 'barefoot', 'bargains', 'baseball', 'basketball', 'bauhaus', 'bayern', 'bb', 'bbc', 'bbt', 'bbva', 'bcg', 'bcn', 'bd', 'be', 'beats', 'beauty', 'beer', 'bentley', 'berlin', 'best', 'bestbuy', 'bet', 'bf', 'bg', 'bh', 'bharti', 'bi', 'bible', 'bid', 'bike', 'bing', 'bingo', 'bio', 'biz', 'bj', 'black', 'blackfriday', 'blockbuster', 'blog', 'bloomberg', 'blue', 'bm', 'bms', 'bmw', 'bn', 'bnpparibas', 'bo', 'boats', 'boehringer', 'bofa', 'bom', 'bond', 'boo', 'book', 'booking', 'bosch', 'bostik', 'boston', 'bot', 'boutique', 'box', 'br', 'bradesco', 'bridgestone', 'broadway', 'broker', 'brother', 'brussels', 'bs', 'bt', 'build', 'builders', 'business', 'buy', 'buzz', 'bv', 'bw', 'by', 'bz', 'bzh', 'ca', 'cab', 'cafe', 'cal', 'call', 'calvinklein', 'cam', 'camera', 'camp', 'canon', 'capetown', 'capital', 'capitalone', 'car', 'caravan', 'cards', 'care', 'career', 'careers', 'cars', 'casa', 'case', 'cash', 'casino', 'cat', 'catering', 'catholic', 'cba', 'cbn', 'cbre', 'cbs', 'cc', 'cd', 'center', 'ceo', 'cern', 'cf', 'cfa', 'cfd', 'cg', 'ch', 'chanel', 'channel', 'charity', 'chase', 'chat', 'cheap', 'chintai', 'christmas', 'chrome', 'church', 'ci', 'cipriani', 'circle', 'cisco', 'citadel', 'citi', 'citic', 'city', 'cityeats', 'ck', 'cl', 'claims', 'cleaning', 'click', 'clinic', 'clinique', 'clothing', 'cloud', 'club', 'clubmed', 'cm', 'cn', 'co', 'coach', 'codes', 'coffee', 'college', 'cologne', 'com', 'comcast', 'commbank', 'community', 'company', 'compare', 'computer', 'comsec', 'condos', 'construction', 'consulting', 'contact', 'contractors', 'cooking', 'cool', 'coop', 'corsica', 'country', 'coupon', 'coupons', 'courses', 'cpa', 'cr', 'credit', 'creditcard', 'creditunion', 'cricket', 'crown', 'crs', 'cruise', 'cruises', 'cu', 'cuisinella', 'cv', 'cw', 'cx', 'cy', 'cymru', 'cyou', 'cz', 'dabur', 'dad', 'dance', 'data', 'date', 'dating', 'datsun', 'day', 'dclk', 'dds', 'de', 'deal', 'dealer', 'deals', 'degree', 'delivery', 'dell', 'deloitte', 'delta', 'democrat', 'dental', 'dentist', 'desi', 'design', 'dev', 'dhl', 'diamonds', 'diet', 'digital', 'direct', 'directory', 'discount', 'discover', 'dish', 'diy', 'dj', 'dk', 'dm', 'dnp', 'do', 'docs', 'doctor', 'dog', 'domains', 'dot', 'download', 'drive', 'dtv', 'dubai', 'dunlop', 'dupont', 'durban', 'dvag', 'dvr', 'dz', 'earth', 'eat', 'ec', 'eco', 'edeka', 'edu', 'education', 'ee', 'eg', 'email', 'emerck', 'energy', 'engineer', 'engineering', 'enterprises', 'epson', 'equipment', 'er', 'ericsson', 'erni', 'es', 'esq', 'estate', 'et', 'etisalat', 'eu', 'eurovision', 'eus', 'events', 'exchange', 'expert', 'exposed', 'express', 'extraspace', 'fage', 'fail', 'fairwinds', 'faith', 'family', 'fan', 'fans', 'farm', 'farmers', 'fashion', 'fast', 'fedex', 'feedback', 'ferrari', 'ferrero', 'fi', 'fidelity', 'fido', 'film', 'final', 'finance', 'financial', 'fire', 'firestone', 'firmdale', 'fish', 'fishing', 'fit', 'fitness', 'fj', 'fk', 'flickr', 'flights', 'flir', 'florist', 'flowers', 'fly', 'fm', 'fo', 'foo', 'food', 'football', 'ford', 'forex', 'forsale', 'forum', 'foundation', 'fox', 'fr', 'free', 'fresenius', 'frl', 'frogans', 'frontdoor', 'frontier', 'ftr', 'fujitsu', 'fun', 'fund', 'furniture', 'futbol', 'fyi', 'ga', 'gal', 'gallery', 'gallo', 'gallup', 'game', 'games', 'gap', 'garden', 'gay', 'gb', 'gbiz', 'gd', 'gdn', 'ge', 'gea', 'gent', 'genting', 'george', 'gf', 'gg', 'ggee', 'gh', 'gi', 'gift', 'gifts', 'gives', 'giving', 'gl', 'glass', 'gle', 'global', 'globo', 'gm', 'gmail', 'gmbh', 'gmo', 'gmx', 'gn', 'godaddy', 'gold', 'goldpoint', 'golf', 'goo', 'goodyear', 'goog', 'google', 'gop', 'got', 'gov', 'gp', 'gq', 'gr', 'grainger', 'graphics', 'gratis', 'green', 'gripe', 'grocery', 'group', 'gs', 'gt', 'gu', 'guardian', 'gucci', 'guge', 'guide', 'guitars', 'guru', 'gw', 'gy', 'hair', 'hamburg', 'hangout', 'haus', 'hbo', 'hdfc', 'hdfcbank', 'health', 'healthcare', 'help', 'helsinki', 'here', 'hermes', 'hiphop', 'hisamitsu', 'hitachi', 'hiv', 'hk', 'hkt', 'hm', 'hn', 'hockey', 'holdings', 'holiday', 'homedepot', 'homegoods', 'homes', 'homesense', 'honda', 'horse', 'hospital', 'host', 'hosting', 'hot', 'hotels', 'hotmail', 'house', 'how', 'hr', 'hsbc', 'ht', 'hu', 'hughes', 'hyatt', 'hyundai', 'ibm', 'icbc', 'ice', 'icu', 'id', 'ie', 'ieee', 'ifm', 'ikano', 'il', 'im', 'imamat', 'imdb', 'immo', 'immobilien', 'in', 'inc', 'industries', 'infiniti', 'info', 'ing', 'ink', 'institute', 'insurance', 'insure', 'int', 'international', 'intuit', 'investments', 'io', 'ipiranga', 'iq', 'ir', 'irish', 'is', 'ismaili', 'ist', 'istanbul', 'it', 'itau', 'itv', 'jaguar', 'java', 'jcb', 'je', 'jeep', 'jetzt', 'jewelry', 'jio', 'jll', 'jm', 'jmp', 'jnj', 'jo', 'jobs', 'joburg', 'jot', 'joy', 'jp', 'jpmorgan', 'jprs', 'juegos', 'juniper', 'kaufen', 'kddi', 'ke', 'kerryhotels', 'kerrylogistics', 'kerryproperties', 'kfh', 'kg', 'kh', 'ki', 'kia', 'kids', 'kim', 'kinder', 'kindle', 'kitchen', 'kiwi', 'km', 'kn', 'koeln', 'komatsu', 'kosher', 'kp', 'kpmg', 'kpn', 'kr', 'krd', 'kred', 'kuokgroup', 'kw', 'ky', 'kyoto', 'kz', 'la', 'lacaixa', 'lamborghini', 'lamer', 'lancaster', 'land', 'landrover', 'lanxess', 'lasalle', 'lat', 'latino', 'latrobe', 'law', 'lawyer', 'lb', 'lc', 'lds', 'lease', 'leclerc', 'lefrak', 'legal', 'lego', 'lexus', 'lgbt', 'li', 'lidl', 'life', 'lifeinsurance', 'lifestyle', 'lighting', 'like', 'lilly', 'limited', 'limo', 'lincoln', 'link', 'lipsy', 'live', 'living', 'lk', 'llc', 'llp', 'loan', 'loans', 'locker', 'locus', 'lol', 'london', 'lotte', 'lotto', 'love', 'lpl', 'lplfinancial', 'lr', 'ls', 'lt', 'ltd', 'ltda', 'lu', 'lundbeck', 'luxe', 'luxury', 'lv', 'ly', 'ma', 'madrid', 'maif', 'maison', 'makeup', 'man', 'management', 'mango', 'map', 'market', 'marketing', 'markets', 'marriott', 'marshalls', 'mattel', 'mba', 'mc', 'mckinsey', 'md', 'me', 'med', 'media', 'meet', 'melbourne', 'meme', 'memorial', 'men', 'menu', 'merckmsd', 'mg', 'mh', 'miami', 'microsoft', 'mil', 'mini', 'mint', 'mit', 'mitsubishi', 'mk', 'ml', 'mlb', 'mls', 'mm', 'mma', 'mn', 'mo', 'mobi', 'mobile', 'moda', 'moe', 'moi', 'mom', 'monash', 'money', 'monster', 'mormon', 'mortgage', 'moscow', 'moto', 'motorcycles', 'mov', 'movie', 'mp', 'mq', 'mr', 'ms', 'msd', 'mt', 'mtn', 'mtr', 'mu', 'museum', 'music', 'mv', 'mw', 'mx', 'my', 'mz', 'na', 'nab', 'nagoya', 'name', 'natura', 'navy', 'nba', 'nc', 'ne', 'nec', 'net', 'netbank', 'netflix', 'network', 'neustar', 'new', 'news', 'next', 'nextdirect', 'nexus', 'nf', 'nfl', 'ng', 'ngo', 'nhk', 'ni', 'nico', 'nike', 'nikon', 'ninja', 'nissan', 'nissay', 'nl', 'no', 'nokia', 'norton', 'now', 'nowruz', 'nowtv', 'np', 'nr', 'nra', 'nrw', 'ntt', 'nu', 'nyc', 'nz', 'obi', 'observer', 'office', 'okinawa', 'olayan', 'olayangroup', 'oldnavy', 'ollo', 'om', 'omega', 'one', 'ong', 'onl', 'online', 'ooo', 'open', 'oracle', 'orange', 'org', 'organic', 'origins', 'osaka', 'otsuka', 'ott', 'ovh', 'pa', 'page', 'panasonic', 'paris', 'pars', 'partners', 'parts', 'party', 'pay', 'pccw', 'pe', 'pet', 'pf', 'pfizer', 'pg', 'ph', 'pharmacy', 'phd', 'philips', 'phone', 'photo', 'photography', 'photos', 'physio', 'pics', 'pictet', 'pictures', 'pid', 'pin', 'ping', 'pink', 'pioneer', 'pizza', 'pk', 'pl', 'place', 'play', 'playstation', 'plumbing', 'plus', 'pm', 'pn', 'pnc', 'pohl', 'poker', 'politie', 'porn', 'post', 'pr', 'pramerica', 'praxi', 'press', 'prime', 'pro', 'prod', 'productions', 'prof', 'progressive', 'promo', 'properties', 'property', 'protection', 'pru', 'prudential', 'ps', 'pt', 'pub', 'pw', 'pwc', 'py', 'qa', 'qpon', 'quebec', 'quest', 'racing', 'radio', 're', 'read', 'realestate', 'realtor', 'realty', 'recipes', 'red', 'redstone', 'redumbrella', 'rehab', 'reise', 'reisen', 'reit', 'reliance', 'ren', 'rent', 'rentals', 'repair', 'report', 'republican', 'rest', 'restaurant', 'review', 'reviews', 'rexroth', 'rich', 'richardli', 'ricoh', 'ril', 'rio', 'rip', 'ro', 'rocher', 'rocks', 'rodeo', 'rogers', 'room', 'rs', 'rsvp', 'ru', 'rugby', 'ruhr', 'run', 'rw', 'rwe', 'ryukyu', 'sa', 'saarland', 'safe', 'safety', 'sakura', 'sale', 'salon', 'samsclub', 'samsung', 'sandvik', 'sandvikcoromant', 'sanofi', 'sap', 'sarl', 'sas', 'save', 'saxo', 'sb', 'sbi', 'sbs', 'sc', 'sca', 'scb', 'schaeffler', 'schmidt', 'scholarships', 'school', 'schule', 'schwarz', 'science', 'scot', 'sd', 'se', 'search', 'seat', 'secure', 'security', 'seek', 'select', 'sener', 'services', 'seven', 'sew', 'sex', 'sexy', 'sfr', 'sg', 'sh', 'shangrila', 'sharp', 'shaw', 'shell', 'shia', 'shiksha', 'shoes', 'shop', 'shopping', 'shouji', 'show', 'showtime', 'si', 'silk', 'sina', 'singles', 'site', 'sj', 'sk', 'ski', 'skin', 'sky', 'skype', 'sl', 'sling', 'sm', 'smart', 'smile', 'sn', 'sncf', 'so', 'soccer', 'social', 'softbank', 'software', 'sohu', 'solar', 'solutions', 'song', 'sony', 'soy', 'spa', 'space', 'sport', 'spot', 'sr', 'srl', 'ss', 'st', 'stada', 'staples', 'star', 'statebank', 'statefarm', 'stc', 'stcgroup', 'stockholm', 'storage', 'store', 'stream', 'studio', 'study', 'style', 'su', 'sucks', 'supplies', 'supply', 'support', 'surf', 'surgery', 'suzuki', 'sv', 'swatch', 'swiss', 'sx', 'sy', 'sydney', 'systems', 'sz', 'tab', 'taipei', 'talk', 'taobao', 'target', 'tatamotors', 'tatar', 'tattoo', 'tax', 'taxi', 'tc', 'tci', 'td', 'tdk', 'team', 'tech', 'technology', 'tel', 'temasek', 'tennis', 'teva', 'tf', 'tg', 'th', 'thd', 'theater', 'theatre', 'tiaa', 'tickets', 'tienda', 'tips', 'tires', 'tirol', 'tj', 'tjmaxx', 'tjx', 'tk', 'tkmaxx', 'tl', 'tm', 'tmall', 'tn', 'to', 'today', 'tokyo', 'tools', 'top', 'toray', 'toshiba', 'total', 'tours', 'town', 'toyota', 'toys', 'tr', 'trade', 'trading', 'training', 'travel', 'travelers', 'travelersinsurance', 'trust', 'trv', 'tt', 'tube', 'tui', 'tunes', 'tushu', 'tv', 'tvs', 'tw', 'tz', 'ua', 'ubank', 'ubs', 'ug', 'uk', 'unicom', 'university', 'uno', 'uol', 'ups', 'us', 'uy', 'uz', 'va', 'vacations', 'vana', 'vanguard', 'vc', 've', 'vegas', 'ventures', 'verisign', 'versicherung', 'vet', 'vg', 'vi', 'viajes', 'video', 'vig', 'viking', 'villas', 'vin', 'vip', 'virgin', 'visa', 'vision', 'viva', 'vivo', 'vlaanderen', 'vn', 'vodka', 'volkswagen', 'volvo', 'vote', 'voting', 'voto', 'voyage', 'vu', 'wales', 'walmart', 'walter', 'wang', 'wanggou', 'watch', 'watches', 'weather', 'weatherchannel', 'webcam', 'weber', 'website', 'wed', 'wedding', 'weibo', 'weir', 'wf', 'whoswho', 'wien', 'wiki', 'williamhill', 'win', 'windows', 'wine', 'winners', 'wme', 'wolterskluwer', 'woodside', 'work', 'works', 'world', 'wow', 'ws', 'wtc', 'wtf', 'xbox', 'xerox', 'xfinity', 'xihuan', 'xin', 'xn--11b4c3d', 'xn--1ck2e1b', 'xn--1qqw23a', 'xn--2scrj9c', 'xn--30rr7y', 'xn--3bst00m', 'xn--3ds443g', 'xn--3e0b707e', 'xn--3hcrj9c', 'xn--3pxu8k', 'xn--42c2d9a', 'xn--45br5cyl', 'xn--45brj9c', 'xn--45q11c', 'xn--4dbrk0ce', 'xn--4gbrim', 'xn--54b7fta0cc', 'xn--55qw42g', 'xn--55qx5d', 'xn--5su34j936bgsg', 'xn--5tzm5g', 'xn--6frz82g', 'xn--6qq986b3xl', 'xn--80adxhks', 'xn--80ao21a', 'xn--80aqecdr1a', 'xn--80asehdb', 'xn--80aswg', 'xn--8y0a063a', 'xn--90a3ac', 'xn--90ae', 'xn--90ais', 'xn--9dbq2a', 'xn--9et52u', 'xn--9krt00a', 'xn--b4w605ferd', 'xn--bck1b9a5dre4c', 'xn--c1avg', 'xn--c2br7g', 'xn--cck2b3b', 'xn--cckwcxetd', 'xn--cg4bki', 'xn--clchc0ea0b2g2a9gcd', 'xn--czr694b', 'xn--czrs0t', 'xn--czru2d', 'xn--d1acj3b', 'xn--d1alf', 'xn--e1a4c', 'xn--eckvdtc9d', 'xn--efvy88h', 'xn--fct429k', 'xn--fhbei', 'xn--fiq228c5hs', 'xn--fiq64b', 'xn--fiqs8s', 'xn--fiqz9s', 'xn--fjq720a', 'xn--flw351e', 'xn--fpcrj9c3d', 'xn--fzc2c9e2c', 'xn--fzys8d69uvgm', 'xn--g2xx48c', 'xn--gckr3f0f', 'xn--gecrj9c', 'xn--gk3at1e', 'xn--h2breg3eve', 'xn--h2brj9c', 'xn--h2brj9c8c', 'xn--hxt814e', 'xn--i1b6b1a6a2e', 'xn--imr513n', 'xn--io0a7i', 'xn--j1aef', 'xn--j1amh', 'xn--j6w193g', 'xn--jlq480n2rg', 'xn--jvr189m', 'xn--kcrx77d1x4a', 'xn--kprw13d', 'xn--kpry57d', 'xn--kput3i', 'xn--l1acc', 'xn--lgbbat1ad8j', 'xn--mgb9awbf', 'xn--mgba3a3ejt', 'xn--mgba3a4f16a', 'xn--mgba7c0bbn0a', 'xn--mgbaakc7dvf', 'xn--mgbaam7a8h', 'xn--mgbab2bd', 'xn--mgbah1a3hjkrd', 'xn--mgbai9azgqp6j', 'xn--mgbayh7gpa', 'xn--mgbbh1a', 'xn--mgbbh1a71e', 'xn--mgbc0a9azcg', 'xn--mgbca7dzdo', 'xn--mgbcpq6gpa1a', 'xn--mgberp4a5d4ar', 'xn--mgbgu82a', 'xn--mgbi4ecexp', 'xn--mgbpl2fh', 'xn--mgbt3dhd', 'xn--mgbtx2b', 'xn--mgbx4cd0ab', 'xn--mix891f', 'xn--mk1bu44c', 'xn--mxtq1m', 'xn--ngbc5azd', 'xn--ngbe9e0a', 'xn--ngbrx', 'xn--node', 'xn--nqv7f', 'xn--nqv7fs00ema', 'xn--nyqy26a', 'xn--o3cw4h', 'xn--ogbpf8fl', 'xn--otu796d', 'xn--p1acf', 'xn--p1ai', 'xn--pgbs0dh', 'xn--pssy2u', 'xn--q7ce6a', 'xn--q9jyb4c', 'xn--qcka1pmc', 'xn--qxa6a', 'xn--qxam', 'xn--rhqv96g', 'xn--rovu88b', 'xn--rvc1e0am3e', 'xn--s9brj9c', 'xn--ses554g', 'xn--t60b56a', 'xn--tckwe', 'xn--tiq49xqyj', 'xn--unup4y', 'xn--vermgensberater-ctb', 'xn--vermgensberatung-pwb', 'xn--vhquv', 'xn--vuq861b', 'xn--w4r85el8fhu5dnra', 'xn--w4rs40l', 'xn--wgbh1c', 'xn--wgbl6a', 'xn--xhq521b', 'xn--xkc2al3hye2a', 'xn--xkc2dl3a5ee0h', 'xn--y9a3aq', 'xn--yfro4i67o', 'xn--ygbi2ammx', 'xn--zfr164b', 'xxx', 'xyz', 'yachts', 'yahoo', 'yamaxun', 'yandex', 'ye', 'yodobashi', 'yoga', 'yokohama', 'you', 'youtube', 'yt', 'yun', 'za', 'zappos', 'zara', 'zero', 'zip', 'zm', 'zone', 'zuerich', 'zw'];

    if (address === undefined || address === null) {
        return false;
    }

    let good_tld = false;

    for (const indexTld in tlds) {
        if (address.endsWith("." + tlds[indexTld])) {
            good_tld = true;
            break;
        }
    }

    if (!good_tld) {
        return false;
    }

    if (/^\w+([+\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(address)) {
        return true;
    }

    return false;
};

export const LoanLandingForm = (props) => {
    const [validPhone, setValidPhone] = useState(true);
    const [validEmail, setValidEmail] = useState(true);

    let {landingName, title, paragraph, buttonText} = props;
    if(!landingName) landingName = '/student-loans-landing'; 
    if(!title) title = "Begin your student loan search"
    if(!paragraph) paragraph = "Fill out the form to create an account and see potential student loan options you may qualify for.";
    if(!buttonText) buttonText = "Find my options";

    return(
        <div className='landing-form nomad-form' id="secondaryForm">
            <Form onSubmit={e => {
                e.preventDefault();
                const formData = new FormData(e.target),
                details = Object.fromEntries(formData.entries())
                if (details.phone_number && details.phone_number.replace(/ /g,'').length < 10) {
                    setValidPhone(false);
                } else {
                    setValidPhone(true);
                    if (details.email) {
                        if (!validateEmail(details.email)) {
                            setValidEmail(false);
                        } else {
                            setValidEmail(true);
                            submitLoanLandingForm(e, landingName);
                        }
                    } else {
                        setValidEmail(false);
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

                {/*<Form.Group className="mb-3" >*/}
                {/*    <Form.Control type="password"  id='alPassword' name="password" required  />*/}
                {/*    <Form.Label>Password*</Form.Label>*/}
                {/*</Form.Group>*/}

                <Button variant="primary" size='lg' className='extra-pad' type="submit" >
                    {buttonText}
                </Button>
            </Form>
            <BottomForm buttonText={buttonText} />
        </div>
    )
}

export const SignInForm = (props) => {
    const [showSpinner, setShowSpinner] = useState(false);
    const [validation, setValidation] = useState(null);
    let setThisValidation = (message) => {
        setValidation(message)
    }

    const setSpinner = (torf) => {
        setShowSpinner(torf)
    }
    const {email} = props;
    // if(showSpinner) {
    //     return(
    //         <div className='landing-form nomad-form'>
    //             <p style={{textAlign:'center', padding:'50px'}}>
    //                 Please Wait<br />
    //                 <FontAwesomeIcon size="2xl" icon={faSpinner} spin />
    //             </p>
    //         </div>
    //     )
    // }

    
    
    const emailSubdomain = process.env.REACT_APP_EMAIL_SUBDOMAIN;
    return(
        <div className='landing-form nomad-form'>
            <Form onSubmit={e => {
                setShowSpinner(true);
                submitSignInForm(e, setThisValidation, setSpinner);
            }}>
                <div className='top-form'>
                    <h1>Sign In</h1>
                </div>
                
                <Form.Group className="mb-3">
                    <Form.Control  type="email"  id='alEmail' name="user[email]" required defaultValue={email ? email :''}  />
                    <Form.Label>Email*</Form.Label>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Control type="password"  id='alPassword' name="user[password]" required  />
                    <Form.Label>Password*</Form.Label>
                    <br /><a style={{color: '#0072bc'}} href={`https://${emailSubdomain}.nomadcredit.com/users/password/new`} >Forgot your password?</a>
                </Form.Group>
                <Button variant="primary" size='lg' className='extra-pad' type="submit" >
                    Sign In
                </Button>
                <p style={{color:'red'}} className={validation && validation.length ? '' : 'hidden'}>{validation}</p>
                <p className='have-account mt-5'>Don't have an account? <a  style={{color: '#0072bc'}} href='/sign-up?sign_up=true'>Sign Up</a></p>
            </Form>
        </div>
    )
}

const newAdmissionsForm = (e, detailsFromNewLoansForm) => {
    e.preventDefault();

    const formData = new FormData(e.target),
        details = Object.fromEntries(formData.entries());

    if (detailsFromNewLoansForm !== undefined && detailsFromNewLoansForm !== null) {
        details.email = detailsFromNewLoansForm.email;
        details.first_name = detailsFromNewLoansForm.firstName;
        details.last_name = detailsFromNewLoansForm.lastName;
        details.phone_number = detailsFromNewLoansForm.phone;
        if(detailsFromNewLoansForm.phone_numberCountry) details['phone_country_code'] = getCountryCallingCode(detailsFromNewLoansForm.phone_numberCountry);
        details.phone_numberCountry = detailsFromNewLoansForm.phone_numberCountry;
        details.user_id = detailsFromNewLoansForm.user_id;
    }
    const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');

    fetch(`/nomadapi.php?order_id=/api/v1/applications/admissions/new&${formBody}`,
        {
            method: "POST",
            // credentials: "include",
            // body: JSON.stringify(details),
            // headers: {
            //     'Accept': 'application/json',
            //     'Content-Type': 'application/json'
            // }
        })
        .then(response =>
            response.json()
        )
        .then(response => {
            // TODO: Go to offers page without re-routing
            response = response.data;
            window.location.href = `/offers?offers=true&id=${response.id}&application_type=admissions&none=${!response.has_offers}&seen_offers_before=${response.seen_offers_before}&intake_path=${response.intake_path}&program_path=${response.program_path}&home_country_path=${response.home_country_path}&school_country_path=${response.school_country_path}&user_id=${details.user_id}`;
            }
        ).catch((error) => console.log(error));
}

const newLoansForm = (e, detailsFromNewLoansForm) => {
    e.preventDefault();

    const formData = new FormData(e.target),
        details = Object.fromEntries(formData.entries());
    
    
    
    

    

    if (detailsFromNewLoansForm !== undefined && detailsFromNewLoansForm !== null) {
        details.email = detailsFromNewLoansForm.email;
        details.first_name = detailsFromNewLoansForm.firstName;
        details.last_name = detailsFromNewLoansForm.lastName;
        details.phone_number = detailsFromNewLoansForm.phone;
        if(detailsFromNewLoansForm.phone_numberCountry) details['phone_country_code'] = getCountryCallingCode(detailsFromNewLoansForm.phone_numberCountry);
        details.phone_numberCountry = detailsFromNewLoansForm.phone_numberCountry;
        details.user_id = detailsFromNewLoansForm.user_id;
    }
    if(details && details['application[school]']){
        if(details['application[school]'] === 'Still Deciding' || details['application[school]'] === 'School Not Listed'){
            let country = details['application[school_country]'];
            if(country){
                details['application[school]'] = details['application[school]'] + " - " + country
            }
        }
    }
    
    const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');

    fetch(`/nomadapi.php?order_id=/api/v1/applications/student_loan/new&${formBody}`,
        {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(details),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response =>
            response.json()
        )
        .then(response => {
            // TODO: Go to offers page without re-routing
            // console.log("new loans response");
            // console.log(response);
            response = response.data;
            window.location.href = `/offers?offers=true&id=${response.id}&application_type=student_loan&none=${!response.has_offers}&seen_offers_before=${response.seen_offers_before}&intake_path=${response.intake_path}&program_path=${response.program_path}&home_country_path=${response.home_country_path}&school_country_path=${response.school_country_path}&cosigner_path=${response.cosigner_path}&user_id=${details.user_id}`;
            }
        ).catch((error) => console.log(error));
}

export const NewApplicationForm = (props) => {
    let type = props.type;
    if(!type) type = 'student_loan';
    let thisEmail = "";
    const {user_id} = props;


    const [showSpinner, setShowSpinner] = useState(false);
    const [page1Details, setPage1Details] = useState({});
    const [part, setPart] = useState(1);

    let thisFirstName = "", thisLastName = "", thisPhone = "";
    
    if(part === 1){
        if(props.email) thisEmail = props.email;
        if(props.firstName) thisFirstName = props.firstName;
        if(props.lastName) thisLastName = props.lastName;
        if(props.phone) thisPhone = props.phone;
    }

    const submitThisForm = (e) => {
        const details = {}
        details.email = props.email;  // legacy did not allow people to change their email address so we won't either
        details.firstName = page1Details['application[first_name]'];
        details.lastName = page1Details['application[last_name]'];
        details.phone = page1Details['application[phone_number]'];
        details.phone_numberCountry = page1Details['application[phone_number]Country'];
        details.user_id = user_id;


        if (type === 'admissions') {
            newAdmissionsForm(e, details);
        } else {
            newLoansForm(e, details);
        }

        setShowSpinner(true);
    }

    const moveToPart2 = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target),
            details = Object.fromEntries(formData.entries());

        setPage1Details(details);
        setPart(2);
    }

    // if (showSpinner) {
    //     return(
    //         <p style={{textAlign:'center', padding:'50px'}}>
    //             Please Wait<br />
    //             <FontAwesomeIcon size="2xl" icon={faSpinner} spin />
    //         </p>
    //     )
    // }

    if (part === 2){
        if(type == 'admissions'){
            return(
                <AdmissionsSignupPart3C submitThisForm={submitThisForm} />
            )
        } else {
            return(
                <StudentLoanSignupPart3RevertTo0409  submitThisForm={submitThisForm} />
            )
        }
    }
    
    if(type == 'admissions'){
        return(
            <SignupPart2 stage="new_existing_user" type={type} email={thisEmail} firstName={thisFirstName} lastName={thisLastName} phone={thisPhone} submitThisForm={moveToPart2}/>
        )
    } else {
        return(
            <SignupPart2 stage="new_existing_user" type={type} email={thisEmail} firstName={thisFirstName} lastName={thisLastName} phone={thisPhone} submitThisForm={moveToPart2} />
        )
    }
    
}

export const EditApplicationForm = (props) => {
    const [showSpinner, setShowSpinner] = useState(false);
    const [submitting, setSubmitting] = useState(false)
    const setThisSubmitting = (torf) => {
        setSubmitting(torf)
    }
    const posthog = usePostHog()
    // let type = props.type;
    let {studentLoanVariant, admissionsVariant, type, user_id, edit2} = props;

    if(!type) type = 'student_loan';
    let thisApplication = props.application;
    const urlParams = new URLSearchParams(window.location.search);
    const fromLanding = urlParams.get('fromLanding');
    const [part, setPart] = useState(fromLanding === 'true' ? 2 : 1);
    const [page1Details, setPage1Details] = useState({});


    const submitThisForm = (e, featureFlag) => {
        //document.body.scrollTop = document.documentElement.scrollTop = 0; //scroll to top of page
        const details = {}
        details.email = props.email;  // legacy did not allow people to change their email address so we won't either
        if (fromLanding === 'true') {
            details.firstName = props.firstName;
            details.lastName = props.lastName;
            details.phone = props.phone;
            details.phone_numberCountry = props.phoneCountryCode;
        } else {
            details.firstName = page1Details['application[first_name]'];
            details.lastName = page1Details['application[last_name]'];
            details.phone = page1Details['application[phone_number]'];
            details.phone_numberCountry = page1Details['application[phone_number]Country'];
        }

        details.application_id = thisApplication.id;
     
        if (type === 'admissions') {
            details.user_id = user_id;
            editAdmissionsForm(e, details,posthog);
        } else {
            details.user_id = user_id;
            editLoansForm(e, details, featureFlag,posthog);
        }

        setShowSpinner(true);
    }

    const moveToPart2 = (e) => {

        e.preventDefault();

        const formData = new FormData(e.target),
            details = Object.fromEntries(formData.entries());

        setPage1Details(details);
        setPart(2);
    }

    // if (showSpinner) {
    //     return(
    //         <p style={{textAlign:'center', padding:'50px'}}>
    //             Please Wait<br />
    //             <FontAwesomeIcon size="2xl" icon={faSpinner} spin />
    //         </p>
    //     )
    // }
     if (part === 2){
        if (type === 'admissions') {
            return(
                <>
                <AdmissionsSignupPart3C submitThisForm={submitThisForm} application={thisApplication} />
                {/* {admissionsVariant && admissionsVariant === 'test' ? 
                <AdmissionsSignupPart3B submitThisForm={submitThisForm} application={thisApplication} /> 
                : 
                <AdmissionsSignupPart3A submitThisForm={submitThisForm} application={thisApplication} />
                } */}
                </>
            )
        } else {
            return(
                <>
                {edit2 || studentLoanVariant === 'loan_search_20231201' ?
                    <Loan_search_20231201 prependUniversities={true} universities={null} submitThisForm={submitThisForm} application={thisApplication} />
                 : 
                <Loan_search_20240409 prependUniversities={true} universities={null} submitThisForm={submitThisForm} application={thisApplication} />
            }
                </>
            // <>
            //     {studentLoanVariant && studentLoanVariant === 'test' ?
            //      <StudentLoanSignupPart3RevertTo0409 prependUniversities={true} universities={null} submitThisForm={submitThisForm} application={thisApplication} />
            //     : 
            //     <StudentLoanSignupPart3A prependUniversities={true} universities={null} submitThisForm={submitThisForm} application={thisApplication} />}
            // </>
            )
        }
    }

     // Part 1
    if(type == 'admissions'){
        return(
            // SignupPart2 is second part for sign up form, first part for edit form
            <SignupPart2 stage={"edit"} type={type} email={props.email} firstName={props.firstName} lastName={props.lastName} phone={props.phone} submitThisForm={moveToPart2}/>
        )
    } else {
        return(
            // SignupPart2 is second part for sign up form, first part for edit form
            <SignupPart2 stage={"edit"} type={type} email={props.email} firstName={props.firstName} lastName={props.lastName} phone={props.phone} submitThisForm={moveToPart2} />
        )
    }
}

export const SignUpForm = (props) => {
    let type = props.type;
    const [validEmail, setValidEmail] = useState(true);
    const [showSpinner, setShowSpinner] = useState(false);

    //if(!type) type = 'student_loan';

    let stage = "signup-1";
    let thisEmail = props.email;
    if(!thisEmail) thisEmail = '';

    const [part, setPart] = useState(1);

    //Part 1
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [interested, setInterested] = useState("");

    //Part 2
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phone, setPhone] = useState("")
    const [phoneCountry, setPhoneCountry] = useState("");

    //Part 3

    const setThisPart = (phase) => {
        setPart(phase)
    };

    const submitThisForm = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target),
        details = Object.fromEntries(formData.entries());
        if (details['user[email]']) {
            //console.log('details', details)
            let params = {email:details['user[email]']}
            if (!validateEmail(details['user[email]'])) {
                setValidEmail(false);
                return

            
            } else {
                const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');
                await fetch(`/nomadapi.php?order_id=/api/v1/users/email_exists&${formBody}`)
                .then(response =>
                    response.json()
            )
            .then(response => {
                console.log('response', response)
                // if(response && !response.error) window.location.href = '/sign-in?email_exists?email=' + details['user[email]'];
                // else {
                //     setValidEmail(true)
                //     setThisPart(part + 1);
                // };
            })
                
            }

            // TODO: Add validate password here (also add the associated invalid password error message below)
        }
        return;
        //return;

        if(details['interested']){
            type = details['interested']
        }

        if(part === 1){
            setEmail(details['user[email]'])
            setPassword(details['user[password]'])
            setInterested(details['interested'])

            
        } else if (part === 2){
            setFirstName(details['application[first_name]'])
            setLastName(details['application[last_name]'])
            setPhone(details['application[phone_number]'])
            setPhoneCountry(details['application[phone_number]Country'])
            setEmail(details['application[email]'])
            setPassword(details['password'])

            setThisPart(part + 1);
        } else if (part === 3){
            //document.body.scrollTop = document.documentElement.scrollTop = 0; //scroll to top of page
            const detailsFromSignUpWithPassword = {};
            detailsFromSignUpWithPassword.email = email;
            detailsFromSignUpWithPassword.firstName = firstName;
            detailsFromSignUpWithPassword.lastName = lastName;
            detailsFromSignUpWithPassword.phone = phone;
            detailsFromSignUpWithPassword.phone_numberCountry = phoneCountry;
            detailsFromSignUpWithPassword.password = password;
            detailsFromSignUpWithPassword.interested = interested
            submitSignUpForm(e, part, detailsFromSignUpWithPassword);

            setShowSpinner(true)
        }
    }

    let thisMessage = () => {
        if (interested){
            if (interested === "admissions"){
                return(
                    <div className='top-form'>
                        <h1>Create You Account</h1>
                        Begin Your Journey on the Nomad Credit Platform:
                        <ul>
                            <li>Speak with experienced admissions counselors backed by U.S. based knowledge</li>
                            <li>Gain Access to FREE services such as Profile Evaluation, SOP Editing, Loan Option Search</li>
                            <li>Return later to track your progress and schedule consultations</li>
                        </ul>
                    </div>
                )
    
            } else {
                return(
                    <div className='top-form'>
                        <h1>Create Your Account</h1>
                        Begin Your Journey on the Nomad Credit Platform:
                        <ul>
                            <li>Search for multiple low rate potential loan options</li>
                            <li>Speak with our expert admissions counselors</li>
                            <li>Return later to review loan options at a later time</li>
                        </ul>
                    </div>
                )
            }
        } else {
            return(
                <div className='top-form'>
                        <h1>Create Your Account</h1>
                        Begin Your Journey on the Nomad Credit Platform:
                    </div>
            )
        }
    }
    // if(showSpinner) {
    //     return(
    //         <p style={{textAlign:'center', padding:'50px'}}>
    //             Please Wait<br />
    //             <FontAwesomeIcon size="2xl" icon={faSpinner} spin />
    //         </p>
    //     )
    // }
    if(part === 2){
        if(interested === 'admissions'){
            return(
                <SignupPart2 stage={stage} type={interested} email={email} password={password} firstName={firstName} lastName={lastName} phone={phone} submitThisForm={submitThisForm}/>
            )
        } else {
            return(
                <SignupPart2 stage={stage} type={interested} email={email} password={password} firstName={firstName} lastName={lastName} phone={phone} submitThisForm={submitThisForm} />
            )
        }
    } else if (part === 3){
        if(interested === 'admissions'){
            return(
                <AdmissionsSignupPart3C submitThisForm={submitThisForm}/>
            )
        } else {
            return(
                <StudentLoanSignupPart3RevertTo0409  submitThisForm={submitThisForm} universities={props.universities} />
            )
        }
    }
    return(
        <div className='landing-form nomad-form'>
            <Form onSubmit={e => {
                submitThisForm(e);
            }}>
                {thisMessage()}
                
                <Form.Group className="mb-3">
                    <Form.Control  type="email"  id='alEmail' name="user[email]" required defaultValue={email}  />
                    <Form.Label>Email*</Form.Label>
                    {validEmail ? '' : <><br /><Form.Label style={{color:'red'}}>Please provide a valid email.</Form.Label></>}
                </Form.Group>
                
                <Form.Group className="mb-3 hidden">
                    <Form.Control hidden={true} type="text"  id='type' name="type" value={type} readOnly={true}  />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Control type="password"  id='alPassword' name="user[password]" required defaultValue={password} />
                    <Form.Label>Password*</Form.Label>
                </Form.Group>
                {type ? '' : 
                <Form.Group>
                    <Form.Label>I'm Interested In:*</Form.Label>
                    <div key={`inline-radio`}>
                        <Form.Check
                            inline
                            label="Loan Options"
                            name="interested"
                            required
                            type='radio'
                            id={`inline-radio-3`}
                            value='student_loan'
                        />
                        <Form.Check
                            inline
                            label="Admissions Consultation"
                            name="interested"
                            required
                            type='radio'
                            id={`inline-radio-4`}
                            value='admissions'
                        />
                    </div>
                </Form.Group>
                }
                <Button variant="primary" size='lg' className='extra-pad' type="submit" >
                    Continue
                </Button>
                <p className='have-account mt-5'>By clicking "Continue", I confirm I've read and agree to Nomad Credit's <a href='/terms' target="_blank">Terms</a> of Use and <a href='/privacy' target="_blank">Privacy Policy</a></p>
            </Form>
        </div>
    )
}
export const SignupPart2 = (props) => {
    let email = props.email || '';
    let password = props.password || '';
    let first_name = props.firstName
    let last_name = props.lastName
    let phone = props.phone;
    let submitThisForm = props.submitThisForm; 
    let type = props.type;
    let stage = props.stage;
    const [validPhone, setValidPhone] = useState(true);
    const [validEmail, setValidEmail] = useState(true);
    const [validPassword, setValidPassword] = useState(true);

    const Message = () => {
        if(type === 'admissions'){
            return(
                <>
                    <h2>Admissions</h2>
                    <p>Please fill out the information below to allow our expert admissions counselors to better prepare for your free consultation call. Please note the information shared should be about your study abroad plans and not your current ongoing education details.</p>
                </>
            )
        }
        return(
            <>
                <h2>Student Loan</h2>
                <p>Almost done! You're just a few more questions away from viewing potential student loan options that you may qualify for.</p>
            </>
        )
    }

    return(
        <div className='landing-form nomad-form'>
            <Form onSubmit={e => {
                e.preventDefault()
                const formData = new FormData(e.target),
                details = Object.fromEntries(formData.entries());
                if (!validatePhone(details['application[phone_number]'])) {
                    setValidPhone(false);
                    return;
                } else {
                    setValidPhone(true);
                    if (stage !== 'edit' && stage !== 'new_existing_user' && !validateEmail(email)) {
                        setValidEmail(false);
                        return;
                    } else {
                        // we don't allow people to edit their email this way
                        setValidEmail(true);
                        if (stage !== 'edit' && stage !== 'new_existing_user' && !validatePassword(details['password'])) {
                            setValidPassword(false);
                            return;
                        } else {
                            // we don't allow people to edit their password this way
                            setValidPassword(true);
                        }
                    }
                }

                if(submitThisForm){
                    submitThisForm(e)
                } 
            }}>
                <div className='top-form'>
                    <Message />
                </div>
                <Form.Group className="mb-3">
                    <Form.Control type="text"  id='alFName' name="application[first_name]" required defaultValue={first_name}  />
                    <Form.Label>First Name*</Form.Label>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Control type="text" id='alLName'  name="application[last_name]" required defaultValue={last_name} />
                    <Form.Label>Last Name*</Form.Label>
                </Form.Group>

                {stage && (stage === 'edit' || stage === 'new_existing_user') ? '' :
                    <Form.Group className="mb-3">
                    <Form.Control  type="email"  id='alEmail' name="application[email]" required defaultValue={email}  />
                    <Form.Label>Email*</Form.Label>
                    {validEmail ? '' : <><br /><Form.Label style={{color:'red'}}>Please provide a valid email.</Form.Label></>}
                </Form.Group>
                }

                <Form.Group className="mb-3" controlId="phone" >
                    <PhoneField name="application[phone_number]" required defaultValue={phone}/>
                    <Form.Label>Phone Number*</Form.Label>
                    {validPhone ? '' : <><br /><Form.Label style={{color:'red'}}>Please provide a valid phone.</Form.Label></>}
                </Form.Group>

                {stage && (stage === 'edit' || stage === 'new_existing_user') ? '' :
                    <Form.Group className="mb-3" >
                    <Form.Control type="password"  id='alPassword' name="password" required defaultValue={password}  />
                    <Form.Label>Password*</Form.Label>
                    { validPassword ? <></> : <><br /><Form.Label style={{color:'red'}}>Please provide a password that is at least six characters long.</Form.Label></>}
                </Form.Group>
                }
                

                <Button variant="primary" size='lg' className='extra-pad' type="submit" >
                    Submit
                </Button>
            </Form>
            <BottomForm />
        </div>
    )
}

export const StudentLoanSignupPart3 = (props) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [submitting, setSubmitting] = useState(false)
    const [theseUniversities, setTheseUniversities] = useState(null)
    
    let { submitThisForm, application,  universities} = props;
    let thisHomeCountry, thisCurrentCity, thisSchoolCountry, thisNeedsLoan, thisHasCosigner, thisDegreeType, thisProgram, thisIntake, thisSchool;

    const cosignerPopover = (
        <Popover id="popover-basic">
          <Popover.Header as="h3">Cosigner</Popover.Header>
          <Popover.Body>
            <p style={{fontSize:'small', }}>It is important to indicate if you may have a creditworthy cosigner. Having a creditworthy cosigner may either increase your loan options and/or reduce the interest rate on your eligible loan options. A US Cosigner is a creditworthy US Citizen or US Permanent Resident</p>
          </Popover.Body>
        </Popover>
      );

    if(application){
        // student loan
        if (application.home_country || application.data.home_country) {
            thisHomeCountry = application.home_country ? application.home_country : application.data.home_country;
        }

        if (application.home_country || application.data.home_country) {
            thisHomeCountry = application.home_country ? application.home_country : application.data.home_country;
        }

        if (application.has_cosigner || application.data.has_cosigner) {
            thisHasCosigner = application.has_cosigner ? application.has_cosigner : application.data.has_cosigner;
        }

        if (application.degree_type || application.data.degree_type) {
            thisDegreeType = application.degree_type ? application.degree_type : application.data.degree_type;
        }

        if (application.school || application.data.school) {
            thisSchool = application.school ? application.school : application.data.school;
        }
    }

    let contries = signupFormData.countries.map(x => { 
        return {value: x, label:x}
    })
    let degree_types = [
        {label:'Undergraduate', options: signupFormData['degree_types']['Undergraduate'].map(x => {return {value: x, label:x}})},
        {label:'Graduate', options: signupFormData['degree_types']['Graduate'].map(x => {return {value: x, label:x}})},
    ];
    useEffect(() => {
        if(!universities){
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
        } else {
            let prePendUniversities = signupFormData.universities.map(x => { 
                return {value: x, label:x}
            })
            prePendUniversities = prePendUniversities.concat(universities)
            setTheseUniversities(prePendUniversities)
        }
        
    }, []);
    return(
        <div className='landing-form nomad-form'>
            <Form onSubmit={e => {
                if(submitThisForm){
                    setSubmitting(true);

                    if(!theseUniversities) return;

                    submitThisForm(e)
                } 
            }}>
                <div className='top-form'>
                    <h2>Student Loan</h2>
                    <p>Almost done! You're just a few more questions away from viewing potential student loan options that you may qualify for.</p>
                </div>
                <Form.Group className="mb-3">
                    <Form.Label>Home Country*</Form.Label>
                    <Select
                        id="application_home_country"
                        name="application[home_country]"
                        defaultValue={thisHomeCountry ? {label:thisHomeCountry, value:thisHomeCountry} : selectedOption}
                        onChange={setSelectedOption}
                        options={contries}
                        required
                    />
                    
                </Form.Group>
                <hr />
                <Form.Group className="mb-3">
                    <Form.Label>Cosigner* &nbsp; 
                        <OverlayTrigger placement="right" overlay={cosignerPopover}>
                             <FontAwesomeIcon icon={faQuestionCircle} />
                        </OverlayTrigger>
                    </Form.Label>
                    <Form.Check
                        type='radio'
                        defaultChecked={thisHasCosigner == 'domestic'}
                        value={`domestic`}
                        id={`application_has_cosigner_domestic`}
                        label={`Yes, US Cosigner`}
                        name="application[has_cosigner]"
                        required
                    />
                    <Form.Check
                        type='radio'
                        defaultChecked={thisHasCosigner == 'foreign'}
                        value={`foreign`}
                        id={`application_has_cosigner_foreign`}
                        label={`Yes, Cosigner in home country`}
                        name="application[has_cosigner]"
                        required
                    />
                    <Form.Check
                        type='radio'
                        defaultChecked={thisHasCosigner == 'no'}
                        value={'no'}
                        id={`application_has_cosigner_no`}
                        label={`No`}
                        name="application[has_cosigner]"
                        required
                    />
                    
                    
                </Form.Group>
                <hr />
                {theseUniversities ? 
                <Form.Group className="mb-3">
                    <Form.Label>School*</Form.Label>
                    <p style={{fontSize:'small', }}>Please select the actual school that you are searching for loan options to help cover the cost of attendance. If you do not know yet, please select "Still Deciding" and the country you plan to study. If your school is not listed, please select "School Not Listed" and the country it is located in.</p>
                    <Select
                        id="application_school"
                        name="application[school]"
                        defaultValue={thisSchool ? {label:thisSchool, value:thisSchool} : selectedOption}
                        onChange={setSelectedOption}
                        options={theseUniversities}
                        required
                    />
                </Form.Group> 
                : 
                <Form.Group className="mb-3">
                    <Form.Label>School*</Form.Label>
                    <p style={{fontSize:'small', }}> <FontAwesomeIcon icon={faSpinner} spin /> Please wait, school data is loading.</p>
                </Form.Group>
                }
                
                <hr />
                <Form.Group className="mb-3">
                    <Form.Label>Degree Type*</Form.Label>
                    <Select
                        id="application_degree_type"
                        name="application[degree_type]"
                        defaultValue={thisDegreeType ? {label:thisDegreeType, value:thisDegreeType} : selectedOption}
                        onChange={setSelectedOption}
                        options={degree_types}
                        required
                    />
                   
                    {/* <p style={{fontSize:'small', }}>Please select the degree you want loan options to pay for</p> */}

                </Form.Group>
                <hr />

                { theseUniversities ?
                <Button disabled={submitting ? true : false} variant="primary" size='lg' className='extra-pad' type="submit" >
                {submitting ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Submit'}
            </Button> :
            <Button disabled={true} variant="primary" size='lg' className='extra-pad' type="submit" >
            <FontAwesomeIcon icon={faSpinner} spin /> Please wait, school data is loading.  
        </Button>

                }

                {/* <Button disabled={submitting ? true : false} variant="primary" size='lg' className='extra-pad' type="submit" >
                    {submitting ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Submit'}
                </Button> */}
            </Form>
            <p  style={{fontSize:'small', textAlign:'center' }}>*This is not an application for credit.</p>
        </div>
    )
}

export const StudentLoanSignupPart3A = (props) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [submitting, setSubmitting] = useState(false)
    const [theseUniversities, setTheseUniversities] = useState(null)
    
    let { submitThisForm, application,  universities} = props;
    let thisHomeCountry, thisCurrentCity, thisSchoolCountry, thisNeedsLoan, thisHasCosigner, thisDegreeType, thisProgram, thisIntake, thisSchool;

    const cosignerPopover = (
        <Popover id="popover-basic">
          <Popover.Header as="h3">Cosigner</Popover.Header>
          <Popover.Body>
            <p style={{fontSize:'small', }}>It is important to indicate if you may have a creditworthy cosigner. Having a creditworthy cosigner may either increase your loan options and/or reduce the interest rate on your eligible loan options. A US Cosigner is a creditworthy US Citizen or US Permanent Resident</p>
          </Popover.Body>
        </Popover>
      );

    if(application){
        // student loan
        if (application.home_country || application.data.home_country) {
            thisHomeCountry = application.home_country ? application.home_country : application.data.home_country;
        }

        if (application.home_country || application.data.home_country) {
            thisHomeCountry = application.home_country ? application.home_country : application.data.home_country;
        }

        if (application.has_cosigner || application.data.has_cosigner) {
            thisHasCosigner = application.has_cosigner ? application.has_cosigner : application.data.has_cosigner;
        }

        if (application.degree_type || application.data.degree_type) {
            thisDegreeType = application.degree_type ? application.degree_type : application.data.degree_type;
        }

        if (application.school || application.data.school) {
            thisSchool = application.school ? application.school : application.data.school;
        }
    }

    let contries = signupFormData.countries.map(x => { 
        return {value: x, label:x}
    })
    let degree_types = [
        {label:'Undergraduate', options: signupFormData['degree_types']['Undergraduate'].map(x => {return {value: x, label:x}})},
        {label:'Graduate', options: signupFormData['degree_types']['Graduate'].map(x => {return {value: x, label:x}})},
    ];
    useEffect(() => {
        //console.log('universities', universities)
        if(!universities){
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
        } else {
            let prePendUniversities = signupFormData.universities.map(x => { 
                return {value: x, label:x}
            })
            prePendUniversities = prePendUniversities.concat(universities)
            setTheseUniversities(prePendUniversities)
        }
        
    }, []);
    return(
        <div className='landing-form nomad-form'>
            <Form onSubmit={e => {
                if(submitThisForm){
                    setSubmitting(true);

                    if(!theseUniversities) return;

                    submitThisForm(e)
                } 
            }}>
                <div className='top-form'>
                    <h2>Student Loan</h2>
                    <p>Almost done! You're just a few more questions away from viewing potential student loan options that you may qualify for.</p>
                </div>
                <Form.Group className="mb-3">
                    <Form.Label>Home Country*</Form.Label>
                    <Select
                        id="application_home_country"
                        name="application[home_country]"
                        defaultValue={thisHomeCountry ? {label:thisHomeCountry, value:thisHomeCountry} : selectedOption}
                        onChange={setSelectedOption}
                        options={contries}
                        required
                    />
                    
                </Form.Group>
                <hr />
                <Form.Group className="mb-3">
                    <Form.Label>Cosigner* &nbsp; 
                        <OverlayTrigger placement="right" overlay={cosignerPopover}>
                             <FontAwesomeIcon icon={faQuestionCircle} />
                        </OverlayTrigger>
                    </Form.Label>
                    <Form.Check
                        type='radio'
                        defaultChecked={thisHasCosigner == 'domestic'}
                        value={`domestic`}
                        id={`application_has_cosigner_domestic`}
                        label={`Yes, US Cosigner`}
                        name="application[has_cosigner]"
                        required
                    />
                    <Form.Check
                        type='radio'
                        defaultChecked={thisHasCosigner == 'foreign'}
                        value={`foreign`}
                        id={`application_has_cosigner_foreign`}
                        label={`Yes, Cosigner in home country`}
                        name="application[has_cosigner]"
                        required
                    />
                    <Form.Check
                        type='radio'
                        defaultChecked={thisHasCosigner == 'no'}
                        value={'no'}
                        id={`application_has_cosigner_no`}
                        label={`No`}
                        name="application[has_cosigner]"
                        required
                    />
                    
                    
                </Form.Group>
                <hr />
                {theseUniversities ? 
                <Form.Group className="mb-3">
                    <Form.Label>School*</Form.Label>
                    <p style={{fontSize:'small', }}>Please select the actual school that you are searching for loan options to help cover the cost of attendance. If you do not know yet, please select "Still Deciding" and the country you plan to study. If your school is not listed, please select "School Not Listed" and the country it is located in.</p>
                    <Select
                        id="application_school"
                        name="application[school]"
                        defaultValue={thisSchool ? {label:thisSchool, value:thisSchool} : selectedOption}
                        onChange={setSelectedOption}
                        options={theseUniversities}
                        required
                    />
                </Form.Group> 
                : 
                <Form.Group className="mb-3">
                    <Form.Label>School*</Form.Label>
                    <p style={{fontSize:'small', }}> <FontAwesomeIcon icon={faSpinner} spin /> Please wait, school data is loading.</p>
                </Form.Group>
                }
                
                <hr />
                <Form.Group className="mb-3">
                    <Form.Label>Degree Type*</Form.Label>
                    <Select
                        id="application_degree_type"
                        name="application[degree_type]"
                        defaultValue={thisDegreeType ? {label:thisDegreeType, value:thisDegreeType} : selectedOption}
                        onChange={setSelectedOption}
                        options={degree_types}
                        required
                    />
                   
                    {/* <p style={{fontSize:'small', }}>Please select the degree you want loan options to pay for</p> */}

                </Form.Group>
                <hr />

                { theseUniversities ?
                <Button disabled={submitting ? true : false} variant="primary" size='lg' className='extra-pad' type="submit" >
                {submitting ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Submit'}
            </Button> :
            <Button disabled={true} variant="primary" size='lg' className='extra-pad' type="submit" >
            <FontAwesomeIcon icon={faSpinner} spin /> Please wait, school data is loading.  
        </Button>

                }

                {/* <Button disabled={submitting ? true : false} variant="primary" size='lg' className='extra-pad' type="submit" >
                    {submitting ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Submit'}
                </Button> */}
            </Form>
            <p  style={{fontSize:'small', textAlign:'center' }}>*This is not an application for credit.</p>
        </div>
    )
}

export const StudentLoanSignupPart3B = (props) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [submitting, setSubmitting] = useState(false)
    const [theseUniversities, setTheseUniversities] = useState(null)
    const [studyCountry, setStudyCountry] = useState('USA')
    const [homeCountry, setHomeCountry] = useState('India')
    const searchForSchools = [{value:'Other', label:'Search to find schools', isDisabled: true}];
    const [universitiesList, setUniversitiesList] = useState(searchForSchools);
    const [selectedSchool, setSelectedSchool] = useState(null)
    const [selectedSchoolLabel, setSelectedSchoolLabel] = useState(null)
    const [statefulSelectedSchool, setStatefulSelectedSchool] = useState(null)
    
    let { submitThisForm, application,  universities} = props;
    let thisHomeCountry, thisCurrentCity, thisSchoolCountry, thisNeedsLoan, thisHasCosigner, thisDegreeType, thisProgram, thisIntake, thisSchool;
    const [cosigner, setCosigner] = useState(null);


    const splitSchool = (school) => {
        if(!school) return [];
        //console.log('splitSchool', school)
        if(school.indexOf('-')){
            let thisLabel = school.split('-');
            return [thisLabel[0] ? thisLabel[0].trim() : '', thisLabel[0] ? thisLabel[0].trim() : '']
        } else {
            return [school]
        }
    }

    const setUniversities = (universities) => {
        if(!theseUniversities && !universities) return;
        let prependValus = [
            // {label:'Still Deciding', value:'Still Deciding'},
            // {label:'College/University Not Listed', value:'School Not Listed'},
        ];
        let cleanOldValues;
        if(universities) cleanOldValues = universities
        else cleanOldValues = [...theseUniversities].filter(x => x.label !== 'Still Deciding' && x.label !== 'College/University Not Listed');
        let newUnis = prependValus.concat(cleanOldValues);
        setTheseUniversities(newUnis);
    }
    
    const setCosignerDials = () => {
        const foreign = document.getElementById('application_has_cosigner_foreign')
        const domestic = document.getElementById('application_has_cosigner_domestic')
        const foreignChecked = foreign.checked;
        const domesticChecked = domestic.checked;
        domestic.checked = false;
        foreign.checked = false;

        if(thisSchoolCountry === 'USA' && thisHomeCountry === 'United States'){
            if(foreignChecked){
                return domestic.checked = foreignChecked
            }
            if(domesticChecked){
                return domestic.checked = domesticChecked
            }
        } 

        if(thisSchoolCountry === 'USA' && thisHomeCountry !== 'United States'){
            if(foreignChecked){
                return foreign.checked = foreignChecked
            }
            if(domesticChecked){
                return domestic.checked = domesticChecked
            }
        }

        if(thisSchoolCountry !== 'USA' && thisHomeCountry !== 'United States'){
            if(foreignChecked){
                return foreign.checked = foreignChecked
            }
            if(domesticChecked){
                return foreign.checked = domesticChecked
            }
        }

        if(thisSchoolCountry !== 'USA' && thisHomeCountry === 'United States'){
            if(foreignChecked){
                return domestic.checked = foreignChecked
            }
            if(domesticChecked){
                return domestic.checked = domesticChecked
            }
        }
    }
    
    const cosignerPopover = (
        <Popover id="popover-basic">
          <Popover.Header as="h3">Cosigner</Popover.Header>
          <Popover.Body>
            <p style={{fontSize:'small', }}>A cosigner or co-applicant is a person – such as a parent, family member, or a friend – who adds their information, including income and credit record, to the loan application and will be responsible to pay back the loan if you are unable to. 
            <br />
            <br />
            Having a creditworthy cosigner may increase your loan options and/or reduce the interest rate on eligible loan options.  
             
            {studyCountry && studyCountry === 'USA' ? <><br /> <br /> A US Cosigner is a creditworthy US Citizen or US Permanent Resident (greencard holder).</> : ''} </p>
          </Popover.Body>
        </Popover>
      );
    
      if(application){
        if (application.home_country || application.data.home_country) {
            thisHomeCountry = application.home_country ? application.home_country : application.data.home_country;
        }

        if(application.data && application.data.school_country){
            thisSchoolCountry = application.data.school_country
        }
        if (application.has_cosigner || application.data.has_cosigner) {
            thisHasCosigner = application.has_cosigner ? application.has_cosigner : application.data.has_cosigner;
        }

        if (application.degree_type || application.data.degree_type) {
            thisDegreeType = application.degree_type ? application.degree_type : application.data.degree_type;
        }

        if (application.school || application.data.school) {
            thisSchool = application.school ? application.school : application.data.school;
            
        }
        
    }
    if(!thisSchoolCountry) thisSchoolCountry = 'USA';
    if(!thisHomeCountry) thisHomeCountry = 'India'
    

    let contries = signupFormData.countries.map(x => { 
        return {value: x, label:x}
    })


    // let countries = [
    //     {}
    // ]

    // let studyContries = ["USA", "Canada", "UK", "Australia", "New Zealand", "Ireland", "Belgium", "Switzerland", "China", "Germany", "Spain", "France", "Hong Kong", "Netherlands", "Portugal", "Singapore", "South Africa", "India", "Other Europe", "Other", ].map(x => { 
    //     return {value: x, label:x}
    // })
    let studyContries = ['USA',
    'Canada',
    'UK',
    'Europe',
    'Australia', 
    'India',
    'Other', ].map(x => { 
        return {value: x, label:x}
    })
    let degree_types = [
        {label:'Undergraduate', options: signupFormData['degree_types']['Undergraduate'].map(x => {return {value: x, label:x}})},
        {label:'Graduate', options: signupFormData['degree_types']['Graduate'].map(x => {return {value: x, label:x}})},
    ];

    degree_types = ["Bachelor’s/Undergraduate",
    "Master’s/Postgraduate (STEM field)",
    "Master’s/Postgraduate (Not-STEM field)",
    "MBA",
    "Law",
    "Medical",
    "Doctorate (PhD)",
    "Other"].map(x => { 
        return {value: x, label:x}
    })
   
    const otherval = [
        {label: 'I am still deciding', value: 'Still Deciding'},
        {label: 'My university is not listed', value: 'School Not Listed'},
    ]
    const filterChange = (val, e, list, setList) => {
        console.log('filterchange', val)
        // let otherval = {value:'Other', label:'Other'}
        let theseOtherVal = otherval;
        if(val && val.length){
            val = val.toLowerCase()
            let thisFilteredList = list.filter(x => x.label.toLowerCase().includes(val))
            if(thisFilteredList && thisFilteredList.length){
                thisFilteredList = thisFilteredList.filter(x => x.value != 'Still Deciding' && x.value != 'School Not Listed')
                setList(thisFilteredList.concat(theseOtherVal))
            } else {
                setList(otherval)
            }
        } else {
            //list = list.filter(x => x.value != 'Still Deciding' && x.value != 'School Not Listed')
            setList(searchForSchools)
        }
    }
    //
    useEffect(() => {
        if(thisSchool) {
            setStatefulSelectedSchool(thisSchool)
            if(splitSchool(thisSchool).length > 1){
                if(splitSchool(thisSchool)[0] == 'School Not Listed') { 
                    setSelectedSchoolLabel('My university is not listed')
                    setSelectedSchool('School Not Listed')
                    // setSchoolNotListed(true);
                }
                else if(splitSchool(thisSchool)[0] == 'Still Deciding') {
                    setSelectedSchoolLabel('I am still deciding')
                    setSelectedSchool('Still Deciding')
                    //setStillDeciding(true);
                }else {
                    setSelectedSchoolLabel(thisSchool)
                    setSelectedSchool(thisSchool)
                };
            }else {
                setSelectedSchoolLabel(thisSchool)
                setSelectedSchool(thisSchool)
            }
        }

        if(!universities){
            fetch(`/nomadapi.php?order_id=/api/v1/universities`)
            .then(response => response.json())
            .then(response => {
                response = response.data
                let theseUnis = response.map(x => {
                    return{value:x.name, label:x.name}
                });
                let universities = otherval;
                universities = universities.concat(theseUnis)
                setUniversities(universities)
                // setUniversitiesList(universities)
            })
            .catch(error => {
                console.log('error', ""+error);
            });
        } else {
            setUniversities(universities)
            // setUniversitiesList(universities)
        }
        
        
        setHomeCountry(thisHomeCountry);
        setStudyCountry(thisSchoolCountry)
        setCosigner(thisHasCosigner)
        // console.log('cosigner', cosigner)
        // console.log('thisHasCosigner', thisHasCosigner)
    }, []);
    return(
        <div className='landing-form nomad-form'>
            <Form onSubmit={e => {
                document.getElementById('please_choose_school').style.display = 'none'
                e.preventDefault()
                // if(document.getElementById('application_school_radio').checked){
                //     const listVal = document.querySelector('[name="application[school_list]"]').value;
                //     if(!listVal){
                //         document.getElementById('please_choose_school').style.display = 'block'
                //         return;
                //     } else {
                //         document.getElementById('application_school').value = listVal;
                //     }
                // }

                // if(document.getElementById('application_school_not_listed').checked){
                //     const listVal = document.getElementById('application_school_not_listed').value;
                //     document.getElementById('application_school').value = listVal;
                // }

                // if(document.getElementById('application_school_still_deciding').checked){
                //     const listVal = document.getElementById('application_school_still_deciding').value;
                //     document.getElementById('application_school').value = listVal;
                // }

                if(submitThisForm){
                    setSubmitting(true);

                    if(!theseUniversities) return;

                    submitThisForm(e, true)
                } 
            }}>
                <div className='top-form'>
                    <h2>Student Loan</h2>
                    <p>Almost done! You're just a few more questions away from viewing potential student loan options that you may qualify for.</p>
                </div>
                <Form.Group className="mb-3"  style={{position:'relative', zIndex:'4'}}>
                    <Form.Label>Home Country*</Form.Label>
                    <Select
                        closeMenuOnScroll={false}
                        maxMenuHeight={200}
                        id="application_home_country"
                        name="application[home_country]"
                        placeholder="Type to Search"
                        defaultValue={thisHomeCountry ? {label:thisHomeCountry, value:thisHomeCountry} : selectedOption}
                        onChange={(e, ee) => {
                            if(!e || !e.value) return
                            setSelectedOption(e,ee)
                            setHomeCountry(e.value)
                            thisHomeCountry = e.value;
                            if(application){
                                application.home_country = e.value
                                application.data.home_country = e.value
                            }
                            setCosignerDials();
                        }}
                        options={contries}
                         required
                    />
                    
                </Form.Group>
                <hr />
                <Form.Group className="mb-3" style={{position:'relative', zIndex:'3'}}>
                    <Form.Label>Planned Country of Study*</Form.Label>
                    <Select
                        closeMenuOnScroll={false}
                        maxMenuHeight={200}
                        id="application_school_country"
                        name="application[school_country]"
                        defaultValue={thisSchoolCountry ? {label:thisSchoolCountry, value:thisSchoolCountry} : selectedOption}

                        onChange={(e, ee)=>{
                            if(!e) return;
                            setSelectedOption(e,ee)
                            setStudyCountry(e.value);
                            thisSchoolCountry = e.value
                            if(application && application.data){
                                application.data.school_country = e.value
                            }
                            setCosignerDials();
                        }}
                        options={studyContries}
                    />
                </Form.Group>
                <hr />
                <Form.Group className="mb-3"  style={{position:'relative', zIndex:'2'}}>
                    <Form.Label>I need a loan to pursue abroad the following degree type:*</Form.Label>
                    <Select
                        closeMenuOnScroll={false}
                        maxMenuHeight={200}
                        id="application_degree_type"
                        name="application[degree_type]"
                        defaultValue={thisDegreeType ? {label:thisDegreeType, value:thisDegreeType} : selectedOption}
                        onChange={setSelectedOption}
                        options={degree_types}
                        required
                    />

                </Form.Group>
                <hr />
                
               
                {theseUniversities ? 
                <Form.Group id="application_school_wrapper" className="mb-3" style={{position:'relative'}}>
                   
                    <Form.Label>Select the university that you are planning to attend*
                        <p  style={{fontSize:'small', paddingTop:'7px'}}>
                        If you do not know yet, please select “I am still deciding”. If your university is not listed, please select “My university is not listed”.
                            {/* <br/><strong>“I am still deciding my university”</strong>: If you have not finalized your university, select this option.
                            <br /><strong>“My university is not listed”</strong>: If your university is not in the list, select this option. */}
                        </p>
                    </Form.Label>
                    <Select
                        //  defaultMenuIsOpen
                        placeholder="Search for School"
                        closeMenuOnScroll={false}
                        maxMenuHeight={200}
                        isClearable={true}
                        id="application_school"
                        name="application[school]"
                        defaultValue={selectedSchool ? {label:selectedSchoolLabel, value:selectedSchool} : selectedOption}
                        filterOption={() => true}
                        onFocus={(e,ee,eee)=>{
                            // if(statefulSelectedSchool){
                            //     filterChange(statefulSelectedSchool, null, theseUniversities, setUniversitiesList)
                            // }
                            setUniversitiesList(searchForSchools)

                        }}
                        required
                        onInputChange={(val, e) => {
                            filterChange(val, e, theseUniversities, setUniversitiesList)
                        }}
                        onChange={(e,ee) => {
                            if(e && e.label) setStatefulSelectedSchool(e.label)
                            else setStatefulSelectedSchool(null)
                            setSelectedOption(e,ee)
                        }}
                        options={universitiesList && universitiesList.length ? universitiesList : otherval}
                    />
                    <div className='search-mag'></div>
                    <Form.Label>
                        <p id="please_choose_school" style={{fontSize:'small', color:'red', display:'none'}}>Please choose a school. </p>
                    </Form.Label>
                    <div className='search-mag'><FontAwesomeIcon icon={faMagnifyingGlass} /></div>
                </Form.Group> 
                : 
                <Form.Group className="mb-3">
                    <Form.Label>School*</Form.Label>
                    <p style={{fontSize:'small', }}> <FontAwesomeIcon icon={faSpinner} spin /> Please wait, school data is loading.</p>
                </Form.Group>
                }
                
                
                <hr />

                <Form.Group className="mb-3">
                    <Form.Label>Will You Have A Cosigner/Co-Applicant?* &nbsp; 
                        <OverlayTrigger placement="right" overlay={cosignerPopover}>
                             <FontAwesomeIcon icon={faQuestionCircle} />
                        </OverlayTrigger>
                    </Form.Label>
                    <Form.Check
                        type='radio'
                        defaultChecked={thisHasCosigner === 'no'}
                        value={'no'}
                        id={`application_has_cosigner_no`}
                        label={`No`}
                        name="application[has_cosigner]"
                        required
                    />
                    <Form.Check
                        type='radio'
                        defaultChecked={thisHasCosigner === 'foreign'}
                        value={`foreign`}
                        id={`application_has_cosigner_foreign`}
                        label={`Yes, Cosigner in ${homeCountry}`}
                        name="application[has_cosigner]"
                        required
                        className={homeCountry && homeCountry === 'United States' ? 'hidden' : ''}
                    />
                    <Form.Check
                        type='radio'
                        defaultChecked={thisHasCosigner === 'domestic'}
                        value={`domestic`}
                        id={`application_has_cosigner_domestic`}
                        label={`Yes, Cosigner in USA`}
                        name="application[has_cosigner]"
                        className={((studyCountry && studyCountry === 'USA') || (studyCountry && studyCountry === 'United States'))|| (homeCountry && homeCountry === 'United States') ? '' : 'hidden'}
                        required
                    />
                </Form.Group>
                <hr />

                { theseUniversities ?
                <Button disabled={submitting ? true : false} variant="primary" size='lg' className='extra-pad' type="submit" >
                {submitting ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Submit'}
            </Button> :
            <Button disabled={true} variant="primary" size='lg' className='extra-pad' type="submit" >
            <FontAwesomeIcon icon={faSpinner} spin /> Please wait, school data is loading.  
        </Button>

                }

                {/* <Button disabled={submitting ? true : false} variant="primary" size='lg' className='extra-pad' type="submit" >
                    {submitting ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Submit'}
                </Button> */}
            </Form>
            <p  style={{fontSize:'small', textAlign:'center' }}>*This is not an application for credit.</p>
        </div>
    )
}

export const StudentLoanSignupPart3RevertTo0409 = (props) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [submitting, setSubmitting] = useState(false)
    const [theseUniversities, setTheseUniversities] = useState(null)
    const [studyCountry, setStudyCountry] = useState('USA')
    const [homeCountry, setHomeCountry] = useState('India')
    const [theseContries, setTheseContries] = useState([{value:'Other', label:'Search to find a country'}]);
    const [universitiesList, setUniversitiesList] = useState([{value:'Other', label:'Search to find schools', isDisabled: true}]);
    const [selectedSchool, setSelectedSchool] = useState(null)
    const [selectedSchoolLabel, setSelectedSchoolLabel] = useState(null)
    let { submitThisForm, application,  universities} = props;
    let thisHomeCountry, thisCurrentCity, thisSchoolCountry, thisNeedsLoan, thisHasCosigner, thisDegreeType, thisProgram, thisIntake, thisSchool;
    const [cosigner, setCosigner] = useState(null);

    const splitSchool = (school) => {
        if(!school) return [];
        //console.log('splitSchool', school)
        if(school.indexOf('-')){
            let thisLabel = school.split('-');
            return [thisLabel[0] ? thisLabel[0].trim() : '', thisLabel[0] ? thisLabel[0].trim() : '']
        } else {
            return [school]
        }
    }

    const setUniversities = (universities) => {
        if(!theseUniversities && !universities) return;
        let prependValus = [
            {label:'Still Deciding', value:'Still Deciding'},
            {label:'College/University Not Listed', value:'School Not Listed'},
        ];
        let cleanOldValues;
        if(universities) cleanOldValues = universities
        else cleanOldValues = [...theseUniversities].filter(x => x.label !== 'Still Deciding' && x.label !== 'College/University Not Listed');
        let newUnis = prependValus.concat(cleanOldValues);
        setTheseUniversities(newUnis);
    }

    const setCosignerDials = () => {
        const foreign = document.getElementById('application_has_cosigner_foreign')
        const domestic = document.getElementById('application_has_cosigner_domestic')
        const foreignChecked = foreign.checked;
        const domesticChecked = domestic.checked;
        domestic.checked = false;
        foreign.checked = false;

        if(thisSchoolCountry === 'USA' && thisHomeCountry === 'United States'){
            if(foreignChecked){
                return domestic.checked = foreignChecked
            }
            if(domesticChecked){
                return domestic.checked = domesticChecked
            }
        } 

        if(thisSchoolCountry === 'USA' && thisHomeCountry !== 'United States'){
            if(foreignChecked){
                return foreign.checked = foreignChecked
            }
            if(domesticChecked){
                return domestic.checked = domesticChecked
            }
        }

        if(thisSchoolCountry !== 'USA' && thisHomeCountry !== 'United States'){
            if(foreignChecked){
                return foreign.checked = foreignChecked
            }
            if(domesticChecked){
                return foreign.checked = domesticChecked
            }
        }

        if(thisSchoolCountry !== 'USA' && thisHomeCountry === 'United States'){
            if(foreignChecked){
                return domestic.checked = foreignChecked
            }
            if(domesticChecked){
                return domestic.checked = domesticChecked
            }
        }
    }
    
    const cosignerPopover = (
        <Popover id="popover-basic">
          <Popover.Header as="h3">Cosigner</Popover.Header>
          <Popover.Body>
            <p style={{fontSize:'small', }}>A cosigner or co-applicant is a person – such as a parent, family member, or a friend – who adds their information, including income and credit record, to the loan application and will be responsible to pay back the loan if you are unable to. 
            <br />
            <br />
            Having a creditworthy cosigner may increase your loan options and/or reduce the interest rate on eligible loan options.  
             
            {studyCountry && studyCountry === 'USA' ? <><br /> <br /> A US Cosigner is a creditworthy US Citizen or US Permanent Resident (greencard holder).</> : ''} </p>
          </Popover.Body>
        </Popover>
      );
    
      if(application){
        if (application.home_country || application.data.home_country) {
            thisHomeCountry = application.home_country ? application.home_country : application.data.home_country;
        }

        if(application.data && application.data.school_country){
            thisSchoolCountry = application.data.school_country
        }
        if (application.has_cosigner || application.data.has_cosigner) {
            thisHasCosigner = application.has_cosigner ? application.has_cosigner : application.data.has_cosigner;
        }

        if (application.degree_type || application.data.degree_type) {
            thisDegreeType = application.degree_type ? application.degree_type : application.data.degree_type;
        }

        if (application.school || application.data.school) {
            thisSchool = application.school ? application.school : application.data.school;
        }
        
    }
    if(!thisSchoolCountry) thisSchoolCountry = 'USA';
    if(!thisHomeCountry) thisHomeCountry = 'India'
    

    let contries = signupFormData.countries.map(x => { 
        return {value: x, label:x}
    })


    // let countries = [
    //     {}
    // ]

    // let studyContries = ["USA", "Canada", "UK", "Australia", "New Zealand", "Ireland", "Belgium", "Switzerland", "China", "Germany", "Spain", "France", "Hong Kong", "Netherlands", "Portugal", "Singapore", "South Africa", "India", "Other Europe", "Other", ].map(x => { 
    //     return {value: x, label:x}
    // })
    let studyContries = ['USA',
    'Canada',
    'UK',
    'Europe',
    'Australia', 
    'India',
    'Other', ].map(x => { 
        return {value: x, label:x}
    })
    let degree_types = [
        {label:'Undergraduate', options: signupFormData['degree_types']['Undergraduate'].map(x => {return {value: x, label:x}})},
        {label:'Graduate', options: signupFormData['degree_types']['Graduate'].map(x => {return {value: x, label:x}})},
    ];

    degree_types = ["Bachelor’s/Undergraduate",
    "Master’s/Postgraduate (STEM field)",
    "Master’s/Postgraduate (Not-STEM field)",
    "MBA",
    "Law",
    "Medical",
    "Doctorate (PhD)",
    "Other"].map(x => { 
        return {value: x, label:x}
    })

    const otherval = [
        {label: 'Still Deciding', value: 'Still Deciding'},
        {label: 'College/University Not Listed', value: 'School Not Listed'}
    ]
    const filterChange = (val, e, list, setList) => {

        // let otherval = {value:'Other', label:'Other'}
        
        if(val && val.length){
            val = val.toLowerCase()
            let thisFilteredList = list.filter(x => x.label.toLowerCase().includes(val))
            if(thisFilteredList && thisFilteredList.length){
                thisFilteredList.push(otherval)
                setList(thisFilteredList)
            } else {
                setList(otherval)
            }
        } else {
            setList(otherval)
        }
    }
    useEffect(() => {
        if(thisSchool) {
            if(splitSchool(thisSchool).length > 1){
                if(splitSchool(thisSchool)[0] == 'School Not Listed') { 
                    setSelectedSchoolLabel('College/University Not Listed')
                    setSelectedSchool('School Not Listed')
                }
                else if(splitSchool(thisSchool)[0] == 'Still Deciding') {
                    setSelectedSchoolLabel(splitSchool(thisSchool)[0])
                    setSelectedSchool('Still Deciding')
                }else {
                    setSelectedSchoolLabel(thisSchool)
                    setSelectedSchool(thisSchool)
                };
            }else {
                setSelectedSchoolLabel(thisSchool)
                setSelectedSchool(thisSchool)
            }
        }

        if(!universities){
            fetch(`/nomadapi.php?order_id=/api/v1/universities`)
            .then(response => response.json())
            .then(response => {
                response = response.data
                let theseUnis = response.map(x => {
                    return{value:x.name, label:x.name}
                });
                let universities = [];
                universities = universities.concat(theseUnis)
                setUniversities(universities)
            })
            .catch(error => {
                console.log('error', ""+error);
            });
        } else {
            setUniversities(universities)
        }
        
        
        setHomeCountry(thisHomeCountry);
        setStudyCountry(thisSchoolCountry)
        setCosigner(thisHasCosigner)
        // console.log('cosigner', cosigner)
        // console.log('thisHasCosigner', thisHasCosigner)
    }, []);
    return(
        <div className='landing-form nomad-form'>
            <Form onSubmit={e => {
                if(submitThisForm){
                    setSubmitting(true);

                    if(!theseUniversities) return;

                    submitThisForm(e, true)
                } 
            }}>
                <div className='top-form'>
                    <h2>Student Loan</h2>
                    <p>Almost done! You're just a few more questions away from viewing potential student loan options that you may qualify for.</p>
                </div>
                <Form.Group className="mb-3">
                    <Form.Label>Home Country*</Form.Label>
                    {/* <Form.Control id="application_home_country" name="application[home_country]"  type="text"  required  onKeyUp={(e) => {
                        let val = e.currentTarget.value;
                        if(val && val.length){

                        }
                    }} /> */}
                    <Select
                        closeMenuOnScroll={false}
                        maxMenuHeight={200}
                        id="application_home_country"
                        name="application[home_country]"
                        placeholder="Type to Search"
                        defaultValue={thisHomeCountry ? {label:thisHomeCountry, value:thisHomeCountry} : selectedOption}
                        // filterOption={() => true}
                        // onInputChange={(val, e) => {
                        //     filterChange(val, e, contries, setTheseContries)
                        // }}
                        onChange={(e, ee) => {
                            if(!e || !e.value) return
                            setSelectedOption(e,ee)
                            setHomeCountry(e.value)
                            thisHomeCountry = e.value;
                            if(application){
                                application.home_country = e.value
                                application.data.home_country = e.value
                            }
                            setCosignerDials();
                        }}
                        options={contries} //contries
                         required
                    />
                    
                </Form.Group>
                <hr />
                <Form.Group className="mb-3">
                    <Form.Label>Planned Country of Study*</Form.Label>
                    <Select
                        closeMenuOnScroll={false}
                        maxMenuHeight={200}
                        id="application_school_country"
                        name="application[school_country]"
                        defaultValue={thisSchoolCountry ? {label:thisSchoolCountry, value:thisSchoolCountry} : selectedOption}

                        onChange={(e, ee)=>{
                            if(!e) return;
                            setSelectedOption(e,ee)
                            setStudyCountry(e.value);
                            thisSchoolCountry = e.value
                            if(application && application.data){
                                application.data.school_country = e.value
                            }
                            setCosignerDials();
                        }}
                        options={studyContries}
                    />
                </Form.Group>
                <hr />
                <Form.Group className="mb-3">
                    <Form.Label>I need a loan to pursue abroad the following degree type:*</Form.Label>
                    <Select
                        closeMenuOnScroll={false}
                        maxMenuHeight={200}
                        id="application_degree_type"
                        name="application[degree_type]"
                        defaultValue={thisDegreeType ? {label:thisDegreeType, value:thisDegreeType} : selectedOption}
                        onChange={setSelectedOption}
                        options={degree_types}
                        required
                    />
                   
                    {/* <p style={{fontSize:'small', }}>Please select the degree you want loan options to pay for</p> */}

                </Form.Group>
                <hr />
                <Form.Group className="mb-3">
                    <Form.Label>Will You Have A Cosigner/Co-Applicant?* &nbsp; 
                        <OverlayTrigger placement="right" overlay={cosignerPopover}>
                             <FontAwesomeIcon icon={faQuestionCircle} />
                        </OverlayTrigger>
                    </Form.Label>
                    <Form.Check
                        type='radio'
                        defaultChecked={thisHasCosigner === 'no'}
                        value={'no'}
                        id={`application_has_cosigner_no`}
                        label={`No`}
                        name="application[has_cosigner]"
                        required
                    />
                    <Form.Check
                        type='radio'
                        defaultChecked={thisHasCosigner === 'foreign'}
                        value={`foreign`}
                        id={`application_has_cosigner_foreign`}
                        label={`Yes, Cosigner in ${homeCountry}`}
                        name="application[has_cosigner]"
                        required
                        className={homeCountry && homeCountry === 'United States' ? 'hidden' : ''}
                    />
                    <Form.Check
                        type='radio'
                        defaultChecked={thisHasCosigner === 'domestic'}
                        value={`domestic`}
                        id={`application_has_cosigner_domestic`}
                        label={`Yes, Cosigner in USA`}
                        name="application[has_cosigner]"
                        className={((studyCountry && studyCountry === 'USA') || (studyCountry && studyCountry === 'United States'))|| (homeCountry && homeCountry === 'United States') ? '' : 'hidden'}
                        required
                    />
                </Form.Group>
                <hr />
               
                {theseUniversities ? 
                <Form.Group className="mb-3" style={{position:'relative'}}>
                    <div className='search-mag'><FontAwesomeIcon icon={faMagnifyingGlass} /></div>
                    <Form.Label>College/University*
                        <p  style={{fontSize:'small'}}>Please select the college or university that you are planning to attend. If your college is not listed, then select “College/University Not Listed”. If you do not know yet, then select “Still Deciding”. </p>
                    </Form.Label>
                    <Select
                        placeholder="Search for School"
                        closeMenuOnScroll={false}
                        maxMenuHeight={200}
                        id="application_school"
                        name="application[school]"
                        defaultValue={selectedSchool ? {label:selectedSchoolLabel, value:selectedSchool} : selectedOption}
                        // value={selectedSchool ? {label:selectedSchool, value:selectedSchool} : selectedOption}
                        filterOption={() => true}
                        onInputChange={(val, e) => {
                            filterChange(val, e, theseUniversities, setUniversitiesList)
                        }}
                        onChange={(e,ee) => {
                            // if(e.value === 'Still Deciding') e.value = 'Still Deciding - ' + studyContries
                            // if(e.value === 'College/University Not Listed') e.value = 'College/University Not Listed - ' + studyContries
                            setSelectedOption(e,ee)
                            //setSelectedSchool(e.value)
                        }}
                        options={universitiesList && universitiesList.length ? universitiesList : otherval}
                        required
                    />
                </Form.Group> 
                : 
                <Form.Group className="mb-3">
                    <Form.Label>School*</Form.Label>
                    <p style={{fontSize:'small', }}> <FontAwesomeIcon icon={faSpinner} spin /> Please wait, school data is loading.</p>
                </Form.Group>
                }
                
                
                <hr />

                { theseUniversities ?
                <Button disabled={submitting ? true : false} variant="primary" size='lg' className='extra-pad' type="submit" >
                {submitting ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Submit'}
            </Button> :
            <Button disabled={true} variant="primary" size='lg' className='extra-pad' type="submit" >
            <FontAwesomeIcon icon={faSpinner} spin /> Please wait, school data is loading.  
        </Button>

                }

                {/* <Button disabled={submitting ? true : false} variant="primary" size='lg' className='extra-pad' type="submit" >
                    {submitting ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Submit'}
                </Button> */}
            </Form>
            <p  style={{fontSize:'small', textAlign:'center' }}>*This is not an application for credit.</p>
        </div>
    )
}

export const Loan_search_20240409 = (props) => {
    //this is a rollback to 04/09/24
    const [selectedOption, setSelectedOption] = useState(null);
    const [submitting, setSubmitting] = useState(false)
    const [theseUniversities, setTheseUniversities] = useState(null)
    const [studyCountry, setStudyCountry] = useState('USA')
    const [homeCountry, setHomeCountry] = useState('India')
    const [theseContries, setTheseContries] = useState([{value:'Other', label:'Search to find a country'}]);
    const [universitiesList, setUniversitiesList] = useState([{value:'Other', label:'Search to find schools', isDisabled: true}]);
    const [selectedSchool, setSelectedSchool] = useState(null)
    const [selectedSchoolLabel, setSelectedSchoolLabel] = useState(null)
    let { submitThisForm, application,  universities} = props;
    let thisHomeCountry, thisCurrentCity, thisSchoolCountry, thisNeedsLoan, thisHasCosigner, thisDegreeType, thisProgram, thisIntake, thisSchool;
    const [cosigner, setCosigner] = useState(null);

    const splitSchool = (school) => {
        if(!school) return [];
        //console.log('splitSchool', school)
        if(school.indexOf('-')){
            let thisLabel = school.split('-');
            return [thisLabel[0] ? thisLabel[0].trim() : '', thisLabel[0] ? thisLabel[0].trim() : '']
        } else {
            return [school]
        }
    }

    const setUniversities = (universities) => {
        if(!theseUniversities && !universities) return;
        let prependValus = [
            {label:'Still Deciding', value:'Still Deciding'},
            {label:'College/University Not Listed', value:'School Not Listed'},
        ];
        let cleanOldValues;
        if(universities) cleanOldValues = universities
        else cleanOldValues = [...theseUniversities].filter(x => x.label !== 'Still Deciding' && x.label !== 'College/University Not Listed');
        let newUnis = prependValus.concat(cleanOldValues);
        setTheseUniversities(newUnis);
    }

    const setCosignerDials = () => {
        const foreign = document.getElementById('application_has_cosigner_foreign')
        const domestic = document.getElementById('application_has_cosigner_domestic')
        const foreignChecked = foreign.checked;
        const domesticChecked = domestic.checked;
        domestic.checked = false;
        foreign.checked = false;

        if(thisSchoolCountry === 'USA' && thisHomeCountry === 'United States'){
            if(foreignChecked){
                return domestic.checked = foreignChecked
            }
            if(domesticChecked){
                return domestic.checked = domesticChecked
            }
        } 

        if(thisSchoolCountry === 'USA' && thisHomeCountry !== 'United States'){
            if(foreignChecked){
                return foreign.checked = foreignChecked
            }
            if(domesticChecked){
                return domestic.checked = domesticChecked
            }
        }

        if(thisSchoolCountry !== 'USA' && thisHomeCountry !== 'United States'){
            if(foreignChecked){
                return foreign.checked = foreignChecked
            }
            if(domesticChecked){
                return foreign.checked = domesticChecked
            }
        }

        if(thisSchoolCountry !== 'USA' && thisHomeCountry === 'United States'){
            if(foreignChecked){
                return domestic.checked = foreignChecked
            }
            if(domesticChecked){
                return domestic.checked = domesticChecked
            }
        }
    }
    
    const cosignerPopover = (
        <Popover id="popover-basic">
          <Popover.Header as="h3">Cosigner</Popover.Header>
          <Popover.Body>
            <p style={{fontSize:'small', }}>A cosigner or co-applicant is a person – such as a parent, family member, or a friend – who adds their information, including income and credit record, to the loan application and will be responsible to pay back the loan if you are unable to. 
            <br />
            <br />
            Having a creditworthy cosigner may increase your loan options and/or reduce the interest rate on eligible loan options.  
             
            {studyCountry && studyCountry === 'USA' ? <><br /> <br /> A US Cosigner is a creditworthy US Citizen or US Permanent Resident (greencard holder).</> : ''} </p>
          </Popover.Body>
        </Popover>
      );
    
      if(application){
        if (application.home_country || application.data.home_country) {
            thisHomeCountry = application.home_country ? application.home_country : application.data.home_country;
        }

        if(application.data && application.data.school_country){
            thisSchoolCountry = application.data.school_country
        }
        if (application.has_cosigner || application.data.has_cosigner) {
            thisHasCosigner = application.has_cosigner ? application.has_cosigner : application.data.has_cosigner;
        }

        if (application.degree_type || application.data.degree_type) {
            thisDegreeType = application.degree_type ? application.degree_type : application.data.degree_type;
        }

        if (application.school || application.data.school) {
            thisSchool = application.school ? application.school : application.data.school;
        }
        
    }
    if(!thisSchoolCountry) thisSchoolCountry = 'USA';
    if(!thisHomeCountry) thisHomeCountry = 'India'
    

    let contries = signupFormData.countries.map(x => { 
        return {value: x, label:x}
    })


    // let countries = [
    //     {}
    // ]

    // let studyContries = ["USA", "Canada", "UK", "Australia", "New Zealand", "Ireland", "Belgium", "Switzerland", "China", "Germany", "Spain", "France", "Hong Kong", "Netherlands", "Portugal", "Singapore", "South Africa", "India", "Other Europe", "Other", ].map(x => { 
    //     return {value: x, label:x}
    // })
    let studyContries = ['USA',
    'Canada',
    'UK',
    'Europe',
    'Australia', 
    'India',
    'Other', ].map(x => { 
        return {value: x, label:x}
    })
    let degree_types = [
        {label:'Undergraduate', options: signupFormData['degree_types']['Undergraduate'].map(x => {return {value: x, label:x}})},
        {label:'Graduate', options: signupFormData['degree_types']['Graduate'].map(x => {return {value: x, label:x}})},
    ];

    degree_types = ["Bachelor’s/Undergraduate",
    "Master’s/Postgraduate (STEM field)",
    "Master’s/Postgraduate (Not-STEM field)",
    "MBA",
    "Law",
    "Medical",
    "Doctorate (PhD)",
    "Other"].map(x => { 
        return {value: x, label:x}
    })

    const otherval = [
        {label: 'Still Deciding', value: 'Still Deciding'},
        {label: 'College/University Not Listed', value: 'School Not Listed'}
    ]
    const filterChange = (val, e, list, setList) => {

        // let otherval = {value:'Other', label:'Other'}
        
        if(val && val.length){
            val = val.toLowerCase()
            let thisFilteredList = list.filter(x => x.label.toLowerCase().includes(val))
            if(thisFilteredList && thisFilteredList.length){
                thisFilteredList.push(otherval)
                setList(thisFilteredList)
            } else {
                setList(otherval)
            }
        } else {
            setList(otherval)
        }
    }
    useEffect(() => {
        if(thisSchool) {
            if(splitSchool(thisSchool).length > 1){
                if(splitSchool(thisSchool)[0] == 'School Not Listed') { 
                    setSelectedSchoolLabel('College/University Not Listed')
                    setSelectedSchool('School Not Listed')
                }
                else if(splitSchool(thisSchool)[0] == 'Still Deciding') {
                    setSelectedSchoolLabel(splitSchool(thisSchool)[0])
                    setSelectedSchool('Still Deciding')
                }else {
                    setSelectedSchoolLabel(thisSchool)
                    setSelectedSchool(thisSchool)
                };
            }else {
                setSelectedSchoolLabel(thisSchool)
                setSelectedSchool(thisSchool)
            }
        }

        if(!universities){
            fetch(`/nomadapi.php?order_id=/api/v1/universities`)
            .then(response => response.json())
            .then(response => {
                response = response.data
                let theseUnis = response.map(x => {
                    return{value:x.name, label:x.name}
                });
                let universities = [];
                universities = universities.concat(theseUnis)
                setUniversities(universities)
            })
            .catch(error => {
                console.log('error', ""+error);
            });
        } else {
            setUniversities(universities)
        }
        
        
        setHomeCountry(thisHomeCountry);
        setStudyCountry(thisSchoolCountry)
        setCosigner(thisHasCosigner)
        // console.log('cosigner', cosigner)
        // console.log('thisHasCosigner', thisHasCosigner)
    }, []);
    return(
        <div className='landing-form nomad-form'>
            <Form onSubmit={e => {
                if(submitThisForm){
                    setSubmitting(true);

                    if(!theseUniversities) return;

                    submitThisForm(e, true)
                } 
            }}>
                <div className='top-form'>
                    <h2>Student Loan</h2>
                    <p>Almost done! You're just a few more questions away from viewing potential student loan options that you may qualify for.</p>
                </div>
                <Form.Group className="mb-3">
                    <Form.Label>Home Country*</Form.Label>
                    {/* <Form.Control id="application_home_country" name="application[home_country]"  type="text"  required  onKeyUp={(e) => {
                        let val = e.currentTarget.value;
                        if(val && val.length){

                        }
                    }} /> */}
                    <Select
                        closeMenuOnScroll={false}
                        maxMenuHeight={200}
                        id="application_home_country"
                        name="application[home_country]"
                        placeholder="Type to Search"
                        defaultValue={thisHomeCountry ? {label:thisHomeCountry, value:thisHomeCountry} : selectedOption}
                        // filterOption={() => true}
                        // onInputChange={(val, e) => {
                        //     filterChange(val, e, contries, setTheseContries)
                        // }}
                        onChange={(e, ee) => {
                            if(!e || !e.value) return
                            setSelectedOption(e,ee)
                            setHomeCountry(e.value)
                            thisHomeCountry = e.value;
                            if(application){
                                application.home_country = e.value
                                application.data.home_country = e.value
                            }
                            setCosignerDials();
                        }}
                        options={contries} //contries
                         required
                    />
                    
                </Form.Group>
                <hr />
                <Form.Group className="mb-3">
                    <Form.Label>Planned Country of Study*</Form.Label>
                    <Select
                        closeMenuOnScroll={false}
                        maxMenuHeight={200}
                        id="application_school_country"
                        name="application[school_country]"
                        defaultValue={thisSchoolCountry ? {label:thisSchoolCountry, value:thisSchoolCountry} : selectedOption}

                        onChange={(e, ee)=>{
                            if(!e) return;
                            setSelectedOption(e,ee)
                            setStudyCountry(e.value);
                            thisSchoolCountry = e.value
                            if(application && application.data){
                                application.data.school_country = e.value
                            }
                            setCosignerDials();
                        }}
                        options={studyContries}
                    />
                </Form.Group>
                <hr />
                <Form.Group className="mb-3">
                    <Form.Label>I need a loan to pursue abroad the following degree type:*</Form.Label>
                    <Select
                        closeMenuOnScroll={false}
                        maxMenuHeight={200}
                        id="application_degree_type"
                        name="application[degree_type]"
                        defaultValue={thisDegreeType ? {label:thisDegreeType, value:thisDegreeType} : selectedOption}
                        onChange={setSelectedOption}
                        options={degree_types}
                        required
                    />
                   
                    {/* <p style={{fontSize:'small', }}>Please select the degree you want loan options to pay for</p> */}

                </Form.Group>
                <hr />
                <Form.Group className="mb-3">
                    <Form.Label>Will You Have A Cosigner/Co-Applicant?* &nbsp; 
                        <OverlayTrigger placement="right" overlay={cosignerPopover}>
                             <FontAwesomeIcon icon={faQuestionCircle} />
                        </OverlayTrigger>
                    </Form.Label>
                    <Form.Check
                        type='radio'
                        defaultChecked={thisHasCosigner === 'no'}
                        value={'no'}
                        id={`application_has_cosigner_no`}
                        label={`No`}
                        name="application[has_cosigner]"
                        required
                    />
                    <Form.Check
                        type='radio'
                        defaultChecked={thisHasCosigner === 'foreign'}
                        value={`foreign`}
                        id={`application_has_cosigner_foreign`}
                        label={`Yes, Cosigner in ${homeCountry}`}
                        name="application[has_cosigner]"
                        required
                        className={homeCountry && homeCountry === 'United States' ? 'hidden' : ''}
                    />
                    <Form.Check
                        type='radio'
                        defaultChecked={thisHasCosigner === 'domestic'}
                        value={`domestic`}
                        id={`application_has_cosigner_domestic`}
                        label={`Yes, Cosigner in USA`}
                        name="application[has_cosigner]"
                        className={((studyCountry && studyCountry === 'USA') || (studyCountry && studyCountry === 'United States'))|| (homeCountry && homeCountry === 'United States') ? '' : 'hidden'}
                        required
                    />
                </Form.Group>
                <hr />
               
                {theseUniversities ? 
                <Form.Group className="mb-3" style={{position:'relative'}}>
                    <div className='search-mag'><FontAwesomeIcon icon={faMagnifyingGlass} /></div>
                    <Form.Label>College/University*
                        <p  style={{fontSize:'small'}}>Please select the college or university that you are planning to attend. If your college is not listed, then select “College/University Not Listed”. If you do not know yet, then select “Still Deciding”. </p>
                    </Form.Label>
                    <Select
                        placeholder="Search for School"
                        closeMenuOnScroll={false}
                        maxMenuHeight={200}
                        id="application_school"
                        name="application[school]"
                        defaultValue={selectedSchool ? {label:selectedSchoolLabel, value:selectedSchool} : selectedOption}
                        // value={selectedSchool ? {label:selectedSchool, value:selectedSchool} : selectedOption}
                        filterOption={() => true}
                        onInputChange={(val, e) => {
                            filterChange(val, e, theseUniversities, setUniversitiesList)
                        }}
                        onChange={(e,ee) => {
                            // if(e.value === 'Still Deciding') e.value = 'Still Deciding - ' + studyContries
                            // if(e.value === 'College/University Not Listed') e.value = 'College/University Not Listed - ' + studyContries
                            setSelectedOption(e,ee)
                            //setSelectedSchool(e.value)
                        }}
                        options={universitiesList && universitiesList.length ? universitiesList : otherval}
                        required
                    />
                </Form.Group> 
                : 
                <Form.Group className="mb-3">
                    <Form.Label>School*</Form.Label>
                    <p style={{fontSize:'small', }}> <FontAwesomeIcon icon={faSpinner} spin /> Please wait, school data is loading.</p>
                </Form.Group>
                }
                
                
                <hr />

                { theseUniversities ?
                <Button disabled={submitting ? true : false} variant="primary" size='lg' className='extra-pad' type="submit" >
                {submitting ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Submit'}
            </Button> :
            <Button disabled={true} variant="primary" size='lg' className='extra-pad' type="submit" >
            <FontAwesomeIcon icon={faSpinner} spin /> Please wait, school data is loading.  
        </Button>

                }

                {/* <Button disabled={submitting ? true : false} variant="primary" size='lg' className='extra-pad' type="submit" >
                    {submitting ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Submit'}
                </Button> */}
            </Form>
            <p  style={{fontSize:'small', textAlign:'center' }}>*This is not an application for credit.</p>
        </div>
    )
}

export const StudentLoanSignupPart3RevertTo111523 = (props) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [submitting, setSubmitting] = useState(false)
    const [theseUniversities, setTheseUniversities] = useState(null)
    
    let { submitThisForm, application,  universities} = props;
    let thisHomeCountry, thisCurrentCity, thisSchoolCountry, thisNeedsLoan, thisHasCosigner, thisDegreeType, thisProgram, thisIntake, thisSchool;

    const cosignerPopover = (
        <Popover id="popover-basic">
          <Popover.Header as="h3">Cosigner</Popover.Header>
          <Popover.Body>
            <p style={{fontSize:'small', }}>It is important to indicate if you may have a creditworthy cosigner. Having a creditworthy cosigner may either increase your loan options and/or reduce the interest rate on your eligible loan options. A US Cosigner is a creditworthy US Citizen or US Permanent Resident</p>
          </Popover.Body>
        </Popover>
      );

    if(application){
        // student loan
        if (application.home_country || application.data.home_country) {
            thisHomeCountry = application.home_country ? application.home_country : application.data.home_country;
        }

        if (application.home_country || application.data.home_country) {
            thisHomeCountry = application.home_country ? application.home_country : application.data.home_country;
        }

        if (application.has_cosigner || application.data.has_cosigner) {
            thisHasCosigner = application.has_cosigner ? application.has_cosigner : application.data.has_cosigner;
        }

        if (application.degree_type || application.data.degree_type) {
            thisDegreeType = application.degree_type ? application.degree_type : application.data.degree_type;
        }

        if (application.school || application.data.school) {
            thisSchool = application.school ? application.school : application.data.school;
        }
    }

    let contries = signupFormData.countries.map(x => { 
        return {value: x, label:x}
    })
    let degree_types = [
        {label:'Undergraduate', options: signupFormData['degree_types']['Undergraduate'].map(x => {return {value: x, label:x}})},
        {label:'Graduate', options: signupFormData['degree_types']['Graduate'].map(x => {return {value: x, label:x}})},
    ];
    useEffect(() => {
        
        if(!universities){
            fetch(`/nomadapi.php?order_id=/api/v1/universities`)
            .then(response => response.json())
            .then(response => {
                response = response.data
                
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
        } else {
            setTheseUniversities(universities)
        }
        
    }, []);
    return(
        <div className='landing-form nomad-form'>
            <Form onSubmit={e => {
                if(submitThisForm){
                    setSubmitting(true);

                    if(!theseUniversities) return;

                    submitThisForm(e)
                } 
            }}>
                <div className='top-form'>
                    <h2>Student Loan</h2>
                    <p>Almost done! You're just a few more questions away from viewing potential student loan options that you may qualify for.</p>
                </div>
                <Form.Group className="mb-3">
                    <Form.Label>Home Country*</Form.Label>
                    <Select
                        id="application_home_country"
                        name="application[home_country]"
                        defaultValue={thisHomeCountry ? {label:thisHomeCountry, value:thisHomeCountry} : selectedOption}
                        onChange={setSelectedOption}
                        options={contries}
                        required
                    />
                    
                </Form.Group>
                <hr />
                <Form.Group className="mb-3">
                    <Form.Label>Cosigner* &nbsp; 
                        <OverlayTrigger placement="right" overlay={cosignerPopover}>
                             <FontAwesomeIcon icon={faQuestionCircle} />
                        </OverlayTrigger>
                    </Form.Label>
                    <Form.Check
                        type='radio'
                        defaultChecked={thisHasCosigner == 'domestic'}
                        value={`domestic`}
                        id={`application_has_cosigner_domestic`}
                        label={`Yes, US Cosigner`}
                        name="application[has_cosigner]"
                        required
                    />
                    <Form.Check
                        type='radio'
                        defaultChecked={thisHasCosigner == 'foreign'}
                        value={`foreign`}
                        id={`application_has_cosigner_foreign`}
                        label={`Yes, Cosigner in home country`}
                        name="application[has_cosigner]"
                        required
                    />
                    <Form.Check
                        type='radio'
                        defaultChecked={thisHasCosigner == 'no'}
                        value={'no'}
                        id={`application_has_cosigner_no`}
                        label={`No`}
                        name="application[has_cosigner]"
                        required
                    />
                    
                    
                </Form.Group>
                <hr />
                {theseUniversities ? 
                <Form.Group className="mb-3">
                    <Form.Label>School*</Form.Label>
                    <p style={{fontSize:'small', }}>Please select the actual school that you are searching for loan options to help cover the cost of attendance. If you do not know yet, please select "Still Deciding" and the country you plan to study. If your school is not listed, please select "School Not Listed" and the country it is located in.</p>
                    <Select
                        id="application_school"
                        name="application[school]"
                        defaultValue={thisSchool ? {label:thisSchool, value:thisSchool} : selectedOption}
                        onChange={setSelectedOption}
                        options={theseUniversities}
                        required
                        className='legacy-school'
                    />
                </Form.Group> 
                : 
                <Form.Group className="mb-3">
                    <Form.Label>School*</Form.Label>
                    <p style={{fontSize:'small', }}> <FontAwesomeIcon icon={faSpinner} spin /> Please wait, school data is loading.</p>
                </Form.Group>
                }
                
                <hr />
                <Form.Group className="mb-3">
                    <Form.Label>Degree Type*</Form.Label>
                    <Select
                        id="application_degree_type"
                        name="application[degree_type]"
                        defaultValue={thisDegreeType ? {label:thisDegreeType, value:thisDegreeType} : selectedOption}
                        onChange={setSelectedOption}
                        options={degree_types}
                        required
                    />
                   
                    {/* <p style={{fontSize:'small', }}>Please select the degree you want loan options to pay for</p> */}

                </Form.Group>
                <hr />

                { theseUniversities ?
                <Button disabled={submitting ? true : false} variant="primary" size='lg' className='extra-pad' type="submit" >
                {submitting ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Submit'}
            </Button> :
            <Button disabled={true} variant="primary" size='lg' className='extra-pad' type="submit" >
            <FontAwesomeIcon icon={faSpinner} spin /> Please wait, school data is loading.  
        </Button>

                }

                {/* <Button disabled={submitting ? true : false} variant="primary" size='lg' className='extra-pad' type="submit" >
                    {submitting ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Submit'}
                </Button> */}
            </Form>
            <p  style={{fontSize:'small', textAlign:'center' }}>*This is not an application for credit.</p>
        </div>
    )
}

export const Loan_search_20231201 = (props) => {
    //this is a rollback to 11/15/23
    const [selectedOption, setSelectedOption] = useState(null);
    const [submitting, setSubmitting] = useState(false)
    const [theseUniversities, setTheseUniversities] = useState(null)
    
    let { submitThisForm, application,  universities} = props;
    let thisHomeCountry, thisCurrentCity, thisSchoolCountry, thisNeedsLoan, thisHasCosigner, thisDegreeType, thisProgram, thisIntake, thisSchool;

    const cosignerPopover = (
        <Popover id="popover-basic">
          <Popover.Header as="h3">Cosigner</Popover.Header>
          <Popover.Body>
            <p style={{fontSize:'small', }}>It is important to indicate if you may have a creditworthy cosigner. Having a creditworthy cosigner may either increase your loan options and/or reduce the interest rate on your eligible loan options. A US Cosigner is a creditworthy US Citizen or US Permanent Resident</p>
          </Popover.Body>
        </Popover>
      );

    if(application){
        // student loan
        if (application.home_country || application.data.home_country) {
            thisHomeCountry = application.home_country ? application.home_country : application.data.home_country;
        }

        if (application.home_country || application.data.home_country) {
            thisHomeCountry = application.home_country ? application.home_country : application.data.home_country;
        }

        if (application.has_cosigner || application.data.has_cosigner) {
            thisHasCosigner = application.has_cosigner ? application.has_cosigner : application.data.has_cosigner;
        }

        if (application.degree_type || application.data.degree_type) {
            thisDegreeType = application.degree_type ? application.degree_type : application.data.degree_type;
        }

        if (application.school || application.data.school) {
            thisSchool = application.school ? application.school : application.data.school;
        }
    }

    let contries = signupFormData.countries.map(x => { 
        return {value: x, label:x}
    })
    let degree_types = [
        {label:'Undergraduate', options: signupFormData['degree_types']['Undergraduate'].map(x => {return {value: x, label:x}})},
        {label:'Graduate', options: signupFormData['degree_types']['Graduate'].map(x => {return {value: x, label:x}})},
    ];
    useEffect(() => {
        
        if(!universities){
            fetch(`/nomadapi.php?order_id=/api/v1/universities`)
            .then(response => response.json())
            .then(response => {
                response = response.data
                
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
        } else {
            setTheseUniversities(universities)
        }
        
    }, []);
    return(
        <div className='landing-form nomad-form'>
            <Form onSubmit={e => {
                if(submitThisForm){
                    setSubmitting(true);

                    if(!theseUniversities) return;

                    submitThisForm(e)
                } 
            }}>
                <div className='top-form'>
                    <h2>Student Loan</h2>
                    <p>Almost done! You're just a few more questions away from viewing potential student loan options that you may qualify for.</p>
                </div>
                <Form.Group className="mb-3">
                    <Form.Label>Home Country*</Form.Label>
                    <Select
                        id="application_home_country"
                        name="application[home_country]"
                        defaultValue={thisHomeCountry ? {label:thisHomeCountry, value:thisHomeCountry} : selectedOption}
                        onChange={setSelectedOption}
                        options={contries}
                        required
                    />
                    
                </Form.Group>
                <hr />
                <Form.Group className="mb-3">
                    <Form.Label>Cosigner* &nbsp; 
                        <OverlayTrigger placement="right" overlay={cosignerPopover}>
                             <FontAwesomeIcon icon={faQuestionCircle} />
                        </OverlayTrigger>
                    </Form.Label>
                    <Form.Check
                        type='radio'
                        defaultChecked={thisHasCosigner == 'domestic'}
                        value={`domestic`}
                        id={`application_has_cosigner_domestic`}
                        label={`Yes, US Cosigner`}
                        name="application[has_cosigner]"
                        required
                    />
                    <Form.Check
                        type='radio'
                        defaultChecked={thisHasCosigner == 'foreign'}
                        value={`foreign`}
                        id={`application_has_cosigner_foreign`}
                        label={`Yes, Cosigner in home country`}
                        name="application[has_cosigner]"
                        required
                    />
                    <Form.Check
                        type='radio'
                        defaultChecked={thisHasCosigner == 'no'}
                        value={'no'}
                        id={`application_has_cosigner_no`}
                        label={`No`}
                        name="application[has_cosigner]"
                        required
                    />
                    
                    
                </Form.Group>
                <hr />
                {theseUniversities ? 
                <Form.Group className="mb-3">
                    <Form.Label>School*</Form.Label>
                    <p style={{fontSize:'small', }}>Please select the actual school that you are searching for loan options to help cover the cost of attendance. If you do not know yet, please select "Still Deciding" and the country you plan to study. If your school is not listed, please select "School Not Listed" and the country it is located in.</p>
                    <Select
                        id="application_school"
                        name="application[school]"
                        defaultValue={thisSchool ? {label:thisSchool, value:thisSchool} : selectedOption}
                        onChange={setSelectedOption}
                        options={theseUniversities}
                        required
                        className='legacy-school'
                    />
                </Form.Group> 
                : 
                <Form.Group className="mb-3">
                    <Form.Label>School*</Form.Label>
                    <p style={{fontSize:'small', }}> <FontAwesomeIcon icon={faSpinner} spin /> Please wait, school data is loading.</p>
                </Form.Group>
                }
                
                <hr />
                <Form.Group className="mb-3">
                    <Form.Label>Degree Type*</Form.Label>
                    <Select
                        id="application_degree_type"
                        name="application[degree_type]"
                        defaultValue={thisDegreeType ? {label:thisDegreeType, value:thisDegreeType} : selectedOption}
                        onChange={setSelectedOption}
                        options={degree_types}
                        required
                    />
                   
                    {/* <p style={{fontSize:'small', }}>Please select the degree you want loan options to pay for</p> */}

                </Form.Group>
                <hr />

                { theseUniversities ?
                <Button disabled={submitting ? true : false} variant="primary" size='lg' className='extra-pad' type="submit" >
                {submitting ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Submit'}
            </Button> :
            <Button disabled={true} variant="primary" size='lg' className='extra-pad' type="submit" >
            <FontAwesomeIcon icon={faSpinner} spin /> Please wait, school data is loading.  
        </Button>

                }

                {/* <Button disabled={submitting ? true : false} variant="primary" size='lg' className='extra-pad' type="submit" >
                    {submitting ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Submit'}
                </Button> */}
            </Form>
            <p  style={{fontSize:'small', textAlign:'center' }}>*This is not an application for credit.</p>
        </div>
    )
}

export const AdmissionsSignupPart3 = (props) => {
    let { submitThisForm, application} = props;
    let thisHomeCountry, thisCurrentCity, thisSchoolCountry, thisNeedsLoan, thisHasCosigner, thisDegreeType, thisProgram, thisIntake, thisSchool;
    const [programs, setPrograms] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {

        fetch(`/nomadapi.php?order_id=/api/v1/umbrella_categories`)
            .then(response => response.json())
            .then(response => {
                let thesePrograms = []
                response = response.data;
                response.forEach(x => {
                    thesePrograms.push({value:x.name, label: x.name})
                });
                setPrograms(thesePrograms)
            })
            .catch(error => {
                console.log('error', ""+error);
            });
    }, []);

    const cosignerPopover = (
        <Popover id="popover-basic">
          <Popover.Header as="h3">Cosigner</Popover.Header>
          <Popover.Body>
            <p style={{fontSize:'small', }}>It is important to indicate if you may have a creditworthy cosigner. Having a creditworthy cosigner may either increase your loan options and/or reduce the interest rate on your eligible loan options. A US Cosigner is a creditworthy US Citizen or US Permanent Resident</p>
          </Popover.Body>
        </Popover>
      );

    if(application){
        if (application.home_country || application.data.home_country) {
            thisHomeCountry = application.home_country ? application.home_country : application.data.home_country;
        }

        if (application.current_city) {
            thisCurrentCity = application.current_city;
        }

        if (application.data.needs_loan) {
            thisNeedsLoan = application.data.needs_loan;
        }

        if (application.has_cosigner || application.data.has_cosigner) {
            thisHasCosigner = application.has_cosigner ? application.has_cosigner : application.data.has_cosigner;
        }

        if (application.degree_type || application.data.degree_type) {
            thisDegreeType = application.degree_type ? application.degree_type : application.data.degree_type;
        }

        if (application.school || application.data.school) {
            thisSchool = application.school ? application.school : application.data.school;
        }

        if (application.data.school_country) {
            thisSchoolCountry = application.data.school_country;
        }

        // if (application.data.program) {
        //     thisProgram = application.data.program;
        // }

        if (application.data.intake_year && application.data.intake_season) {
            thisIntake = application.data.intake_season + " " + application.data.intake_year;
        }
    }

    const [selectedOption, setSelectedOption] = useState(null);
    
    let contries = signupFormData.countries.map(x => { 
        return {value: x, label:x}
    })
    let degree_types = [
        {label:'Undergraduate', options: signupFormData['degree_types']['Undergraduate'].map(x => {return {value: x, label:x}})},
        {label:'Graduate', options: signupFormData['degree_types']['Graduate'].map(x => {return {value: x, label:x}})},
    ];

    const [needsLoan, setNeedsLoan] = useState(false)
    let setThisNeedsLoan = (retVal1, retVal2) => {
        if(retVal1.value === 'Yes') setNeedsLoan(true);
        else setNeedsLoan(false);
        setSelectedOption(retVal1, retVal2)
    }
    
    return(
        <div className='landing-form nomad-form'>
            <Form onSubmit={e => {
                setSubmitting(true)
                if(submitThisForm){
                    submitThisForm(e)
                } 
            }}>
                <div className='top-form'>
                    <h2>Admissions</h2>
                    <p>Please fill out the information below to allow our expert admissions counselors to better prepare for your free consultation call. Please note the information shared should be about your study abroad plans and not your current ongoing education details.</p>
                </div>
                <Form.Group className="mb-3">
                    <Form.Label>Home Country</Form.Label>
                    <Select
                        id="application_home_country"
                        name="application[home_country]"
                        defaultValue={thisHomeCountry ? {label:thisHomeCountry, value:thisHomeCountry} : selectedOption}
                        onChange={setSelectedOption}
                        options={contries}
                    />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Current City</Form.Label>
                    <Form.Control type="text"  id='alPassword' name="application[current_city]" defaultValue={thisCurrentCity ? thisCurrentCity : null} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Planned Country of Study</Form.Label>
                    <Select
                        id="application_school_country"
                        name="application[school_country]"
                        defaultValue={thisSchoolCountry ? {label:thisSchoolCountry, value:thisSchoolCountry} : selectedOption}
                        onChange={setSelectedOption}
                        options={contries}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Will you need a student loan to fund your education?</Form.Label>
                    <Select
                        id="application_needs_loan"
                        name="application[needs_loan]"
                        defaultValue={thisNeedsLoan ? {label:thisNeedsLoan, value:thisNeedsLoan} : selectedOption}
                        onChange={setThisNeedsLoan}
                        options={[
                                {value:'', label:''},
                                {value:'Yes', label:'Yes'},
                                {value:'No', label:'No'},
                            ]}
                    />
                </Form.Group>
                <Form.Group className={`mb-3 ${(needsLoan || thisNeedsLoan === 'Yes') ? '' : 'hidden'}`}>
                    <Form.Label>Do you have a cosigner? &nbsp; 
                        <OverlayTrigger placement="right" overlay={cosignerPopover}>
                             <FontAwesomeIcon icon={faQuestionCircle} />
                        </OverlayTrigger>
                    </Form.Label>
                    <Form.Check
                        type='radio'
                        defaultChecked={thisHasCosigner == 'domestic'}
                        value={`domestic`}
                        id={`application_has_cosigner_domestic`}
                        label={`Yes, US Cosigner`}
                        name="application[has_cosigner]"
                    />
                    <Form.Check
                        type='radio'
                        defaultChecked={thisHasCosigner == 'foreign'}
                        value={`foreign`}
                        id={`application_has_cosigner_foreign`}
                        label={`Yes, Cosigner in home country`}
                        name="application[has_cosigner]"
                    />
                    <Form.Check
                        type='radio'
                        defaultChecked={thisHasCosigner == 'no'}
                        value={'no'}
                        id={`application_has_cosigner_no`}
                        label={`No`}
                        name="application[has_cosigner]"
                    />
                    
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Degree Type You Are Pursuing for Study Abroad</Form.Label>
                    {/* <p style={{fontSize:'small', }}>Please select the degree you want loan options to pay for</p> */}
                    <Select
                        id="application_degree_type"
                        name="application[degree_type]"
                        defaultValue={thisDegreeType ? {label:thisDegreeType, value:thisDegreeType} : selectedOption}
                        onChange={setSelectedOption}
                        options={degree_types}
                    />
                    
                    

                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Program</Form.Label>
                    <Select
                        id="application[program]"
                        name="application[program]"
                        // defaultValue={thisProgram ? {label:thisProgram, value:thisProgram} : selectedOption}
                        onChange={setSelectedOption}
                        options={
                            programs
                            // [
                            //     {value:'Acountancy', label:'Acountancy'},
                            //     {value:'Aerospace Engineering', label:'Aerospace Engineering'},
                            // ]
                        }
                    />
                    
                </Form.Group>


                <Form.Group className="mb-3">
                    <Form.Label>Intake (Semester) Start Date (Required)</Form.Label>
                    <Select
                        id="intake_for_lead"
                        name="application[school_start_date]"
                        defaultValue={thisIntake ? {label:thisIntake, value:thisIntake} : selectedOption}
                        onChange={setSelectedOption}
                        options={
                            [
                                {value:'Fall 2023', label:'Fall 2023'},
                                {value:'Spring 2024', label:'Spring 2024'},
                                {value:'Summer 2024', label:'Summer 2024'},
                                {value:'Fall 2024', label:'Fall 2024'},
                                {value:'Spring 2025', label:'Spring 2025'},
                                {value:'Summer 2025', label:'Summer 2025'},
                                {value:'Fall 2025', label:'Fall 2025'},
                            ]
                        }
                        required
                    />
                    
                </Form.Group>


                <Button disabled={submitting ? true : false} variant="primary" size='lg' className='extra-pad' type="submit" >
                    {submitting ? <FontAwesomeIcon icon={faSpinner} spin />: 'Submit'}
                </Button>
            </Form>
            <p  style={{fontSize:'small', textAlign:'center' }}>*This is not an application for credit.</p>
        </div>
    )
}

export const AdmissionsSignupPart3A = (props) => {
    //let submitThisForm = props.submitThisForm;
    let { submitThisForm, application} = props;
    let thisHomeCountry, thisCurrentCity, thisSchoolCountry, thisNeedsLoan, thisHasCosigner, thisDegreeType, thisProgram, thisIntake, thisSchool;
    //let programs = [];
    const [programs, setPrograms] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    //''

    useEffect(() => {
        fetch(`/api/v1/umbrella_categories`)
            .then(response => response.json())
            .then(response => {
                let thesePrograms = []
                response.forEach(x => {
                    thesePrograms.push({value:x.name, label: x.name})
                });
                setPrograms(thesePrograms)
            })
            .catch(error => {
                console.log('error', ""+error);
            });
    }, []);

    const cosignerPopover = (
        <Popover id="popover-basic">
          <Popover.Header as="h3">Cosigner</Popover.Header>
          <Popover.Body>
            <p style={{fontSize:'small', }}>It is important to indicate if you may have a creditworthy cosigner. Having a creditworthy cosigner may either increase your loan options and/or reduce the interest rate on your eligible loan options. A US Cosigner is a creditworthy US Citizen or US Permanent Resident</p>
          </Popover.Body>
        </Popover>
      );

    if(application){
        if (application.home_country || application.data.home_country) {
            thisHomeCountry = application.home_country ? application.home_country : application.data.home_country;
        }

        if (application.current_city) {
            thisCurrentCity = application.current_city;
        }

        if (application.data.needs_loan) {
            thisNeedsLoan = application.data.needs_loan;
        }

        if (application.has_cosigner || application.data.has_cosigner) {
            thisHasCosigner = application.has_cosigner ? application.has_cosigner : application.data.has_cosigner;
        }

        if (application.degree_type || application.data.degree_type) {
            thisDegreeType = application.degree_type ? application.degree_type : application.data.degree_type;
        }

        if (application.school || application.data.school) {
            thisSchool = application.school ? application.school : application.data.school;
        }

        if (application.data.school_country) {
            thisSchoolCountry = application.data.school_country;
        }

        // if (application.data.program) {
        //     thisProgram = application.data.program;
        // }

        if (application.data.intake_year && application.data.intake_season) {
            thisIntake = application.data.intake_season + " " + application.data.intake_year;
        }
    }

    const [selectedOption, setSelectedOption] = useState(null);
    
    let contries = signupFormData.countries.map(x => { 
        return {value: x, label:x}
    })
    let degree_types = [
        {label:'Undergraduate', options: signupFormData['degree_types']['Undergraduate'].map(x => {return {value: x, label:x}})},
        {label:'Graduate', options: signupFormData['degree_types']['Graduate'].map(x => {return {value: x, label:x}})},
    ];

    const [needsLoan, setNeedsLoan] = useState(false)
    let setThisNeedsLoan = (retVal1, retVal2) => {
        if(retVal1.value === 'Yes') setNeedsLoan(true);
        else setNeedsLoan(false);
        setSelectedOption(retVal1, retVal2)
    }
    
    return(
        <div className='landing-form nomad-form'>
            <Form onSubmit={e => {
                setSubmitting(true)
                if(submitThisForm){
                    submitThisForm(e)
                } 
            }}>
                <div className='top-form'>
                    <h2>Admissions</h2>
                    <p>Please fill out the information below to allow our expert admissions counselors to better prepare for your free consultation call. Please note the information shared should be about your study abroad plans and not your current ongoing education details.</p>
                </div>
                <Form.Group className="mb-3">
                    <Form.Label>Home Country</Form.Label>
                    <Select
                        id="application_home_country"
                        name="application[home_country]"
                        defaultValue={thisHomeCountry ? {label:thisHomeCountry, value:thisHomeCountry} : selectedOption}
                        onChange={setSelectedOption}
                        options={contries}
                    />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Current City</Form.Label>
                    <Form.Control type="text"  id='alPassword' name="application[current_city]" defaultValue={thisCurrentCity ? thisCurrentCity : null} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Planned Country of Study</Form.Label>
                    <Select
                        id="application_school_country"
                        name="application[school_country]"
                        defaultValue={thisSchoolCountry ? {label:thisSchoolCountry, value:thisSchoolCountry} : selectedOption}
                        onChange={setSelectedOption}
                        options={contries}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Will you need a student loan to fund your education?</Form.Label>
                    <Select
                        id="application_needs_loan"
                        name="application[needs_loan]"
                        defaultValue={thisNeedsLoan ? {label:thisNeedsLoan, value:thisNeedsLoan} : selectedOption}
                        onChange={setThisNeedsLoan}
                        options={[
                                {value:'', label:''},
                                {value:'Yes', label:'Yes'},
                                {value:'No', label:'No'},
                            ]}
                    />
                </Form.Group>
                <Form.Group className={`mb-3 ${(needsLoan || thisNeedsLoan === 'Yes') ? '' : 'hidden'}`}>
                    <Form.Label>Do you have a cosigner? &nbsp; 
                        <OverlayTrigger placement="right" overlay={cosignerPopover}>
                             <FontAwesomeIcon icon={faQuestionCircle} />
                        </OverlayTrigger>
                    </Form.Label>
                    <Form.Check
                        type='radio'
                        defaultChecked={thisHasCosigner == 'domestic'}
                        value={`domestic`}
                        id={`application_has_cosigner_domestic`}
                        label={`Yes, US Cosigner`}
                        name="application[has_cosigner]"
                    />
                    <Form.Check
                        type='radio'
                        defaultChecked={thisHasCosigner == 'foreign'}
                        value={`foreign`}
                        id={`application_has_cosigner_foreign`}
                        label={`Yes, Cosigner in home country`}
                        name="application[has_cosigner]"
                    />
                    <Form.Check
                        type='radio'
                        defaultChecked={thisHasCosigner == 'no'}
                        value={'no'}
                        id={`application_has_cosigner_no`}
                        label={`No`}
                        name="application[has_cosigner]"
                    />
                    
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Degree Type You Are Pursuing for Study Abroad</Form.Label>
                    {/* <p style={{fontSize:'small', }}>Please select the degree you want loan options to pay for</p> */}
                    <Select
                        id="application_degree_type"
                        name="application[degree_type]"
                        defaultValue={thisDegreeType ? {label:thisDegreeType, value:thisDegreeType} : selectedOption}
                        onChange={setSelectedOption}
                        options={degree_types}
                    />
                    
                    

                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Program</Form.Label>
                    <Select
                        id="application[program]"
                        name="application[program]"
                        // defaultValue={thisProgram ? {label:thisProgram, value:thisProgram} : selectedOption}
                        onChange={setSelectedOption}
                        options={
                            programs
                            // [
                            //     {value:'Acountancy', label:'Acountancy'},
                            //     {value:'Aerospace Engineering', label:'Aerospace Engineering'},
                            // ]
                        }
                    />
                    
                </Form.Group>


                <Form.Group className="mb-3">
                    <Form.Label>Intake (Semester) Start Date (Required)</Form.Label>
                    <Select
                        id="intake_for_lead"
                        name="application[school_start_date]"
                        defaultValue={thisIntake ? {label:thisIntake, value:thisIntake} : selectedOption}
                        onChange={setSelectedOption}
                        options={
                            [
                                {value:'Fall 2023', label:'Fall 2023'},
                                {value:'Spring 2024', label:'Spring 2024'},
                                {value:'Summer 2024', label:'Summer 2024'},
                                {value:'Fall 2024', label:'Fall 2024'},
                                {value:'Spring 2025', label:'Spring 2025'},
                                {value:'Summer 2025', label:'Summer 2025'},
                                {value:'Fall 2025', label:'Fall 2025'},
                            ]
                        }
                        required
                    />
                    
                </Form.Group>


                <Button disabled={submitting ? true : false} variant="primary" size='lg' className='extra-pad' type="submit" >
                    {submitting ? <FontAwesomeIcon icon={faSpinner} spin />: 'Submit'}
                </Button>
            </Form>
            <p  style={{fontSize:'small', textAlign:'center' }}>*This is not an application for credit.</p>
        </div>
    )
}

export const AdmissionsSignupPart3B = (props) => {
    //let submitThisForm = props.submitThisForm;
    let { submitThisForm, application} = props;
    let thisHomeCountry, thisCurrentCity, thisSchoolCountry, thisNeedsLoan, thisHasCosigner, thisDegreeType, thisProgram, thisIntake, thisSchool;
    //let programs = [];
    const [programs, setPrograms] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    //''

    useEffect(() => {
        fetch(`/api/v1/umbrella_categories`)
            .then(response => response.json())
            .then(response => {
                let thesePrograms = []
                response.forEach(x => {
                    thesePrograms.push({value:x.name, label: x.name})
                });
                setPrograms(thesePrograms)
            })
            .catch(error => {
                console.log('error', ""+error);
            });
    }, []);

    const cosignerPopover = (
        <Popover id="popover-basic">
          <Popover.Header as="h3">Cosigner</Popover.Header>
          <Popover.Body>
            <p style={{fontSize:'small', }}>It is important to indicate if you may have a creditworthy cosigner. Having a creditworthy cosigner may either increase your loan options and/or reduce the interest rate on your eligible loan options. A US Cosigner is a creditworthy US Citizen or US Permanent Resident</p>
          </Popover.Body>
        </Popover>
      );

    if(application){
        if (application.home_country || application.data.home_country) {
            thisHomeCountry = application.home_country ? application.home_country : application.data.home_country;
        }

        if (application.current_city) {
            thisCurrentCity = application.current_city;
        }

        if (application.data.needs_loan) {
            thisNeedsLoan = application.data.needs_loan;
        }

        if (application.has_cosigner || application.data.has_cosigner) {
            thisHasCosigner = application.has_cosigner ? application.has_cosigner : application.data.has_cosigner;
        }

        if (application.degree_type || application.data.degree_type) {
            thisDegreeType = application.degree_type ? application.degree_type : application.data.degree_type;
        }

        if (application.school || application.data.school) {
            thisSchool = application.school ? application.school : application.data.school;
        }

        if (application.data.school_country) {
            thisSchoolCountry = application.data.school_country;
        }

        // if (application.data.program) {
        //     thisProgram = application.data.program;
        // }

        if (application.data.intake_year && application.data.intake_season) {
            thisIntake = application.data.intake_season + " " + application.data.intake_year;
        }
    }

    const [selectedOption, setSelectedOption] = useState(null);
    
    // let contries = signupFormData.countries.map(x => { 
    //     return {value: x, label:x}
    // })
    let contries = signupFormData.countries.map(x => { 
        return {value: x, label:x}
    })

    let degree_types = [
        {label:'Undergraduate', options: signupFormData['degree_types']['Undergraduate'].map(x => {return {value: x, label:x}})},
        {label:'Graduate', options: signupFormData['degree_types']['Graduate'].map(x => {return {value: x, label:x}})},
    ];

    const [needsLoan, setNeedsLoan] = useState(false)
    let setThisNeedsLoan = (retVal1, retVal2) => {
        if(retVal1.value === 'Yes') setNeedsLoan(true);
        else setNeedsLoan(false);
        setSelectedOption(retVal1, retVal2)
    }
    
    return(
        <div className='landing-form nomad-form'>
            <Form onSubmit={e => {
                setSubmitting(true)
                if(submitThisForm){
                    submitThisForm(e)
                } 
            }}>
                <div className='top-form'>
                    <h2>Admissions</h2>
                    <p>Please fill out the information below to allow our expert admissions counselors to better prepare for your free consultation call. Please note the information shared should be about your study abroad plans and not your current ongoing education details.</p>
                </div>
                <Form.Group className="mb-3">
                    <Form.Label>Home Country</Form.Label>
                    <Select
                        id="application_home_country"
                        name="application[home_country]"
                        defaultValue={thisHomeCountry ? {label:thisHomeCountry, value:thisHomeCountry} : selectedOption}
                        onChange={setSelectedOption}
                        options={contries}
                    />
                </Form.Group>
                {/* <Form.Group className="mb-3" >
                    <Form.Label>Current City</Form.Label>
                    <Form.Control type="text"  id='alPassword' name="application[current_city]" defaultValue={thisCurrentCity ? thisCurrentCity : null} />
                </Form.Group> */}
                <Form.Group className="mb-3">
                    <Form.Label>Planned Country of Study</Form.Label>
                    <Select
                        id="application_school_country"
                        name="application[school_country]"
                        defaultValue={thisSchoolCountry ? {label:thisSchoolCountry, value:thisSchoolCountry} : selectedOption}
                        onChange={setSelectedOption}
                        options={contries}
                    />
                </Form.Group>
                {/* <Form.Group className="mb-3">
                    <Form.Label>Will you need a student loan to fund your education?</Form.Label>
                    <Select
                        id="application_needs_loan"
                        name="application[needs_loan]"
                        defaultValue={thisNeedsLoan ? {label:thisNeedsLoan, value:thisNeedsLoan} : selectedOption}
                        onChange={setThisNeedsLoan}
                        options={[
                                {value:'', label:''},
                                {value:'Yes', label:'Yes'},
                                {value:'No', label:'No'},
                            ]}
                    />
                </Form.Group> */}
                {/* <Form.Group className={`mb-3 ${(needsLoan || thisNeedsLoan === 'Yes') ? '' : 'hidden'}`}>
                    <Form.Label>Do you have a cosigner? &nbsp; 
                        <OverlayTrigger placement="right" overlay={cosignerPopover}>
                             <FontAwesomeIcon icon={faQuestionCircle} />
                        </OverlayTrigger>
                    </Form.Label>
                    <Form.Check
                        type='radio'
                        defaultChecked={thisHasCosigner == 'domestic'}
                        value={`domestic`}
                        id={`application_has_cosigner_domestic`}
                        label={`Yes, US Cosigner`}
                        name="application[has_cosigner]"
                    />
                    <Form.Check
                        type='radio'
                        defaultChecked={thisHasCosigner == 'foreign'}
                        value={`foreign`}
                        id={`application_has_cosigner_foreign`}
                        label={`Yes, Cosigner in home country`}
                        name="application[has_cosigner]"
                    />
                    <Form.Check
                        type='radio'
                        defaultChecked={thisHasCosigner == 'no'}
                        value={'no'}
                        id={`application_has_cosigner_no`}
                        label={`No`}
                        name="application[has_cosigner]"
                    />
                    
                </Form.Group> */}
                <Form.Group className="mb-3">
                    <Form.Label>Degree Type You Are Pursuing for Study Abroad</Form.Label>
                    {/* <p style={{fontSize:'small', }}>Please select the degree you want loan options to pay for</p> */}
                    <Select
                        id="application_degree_type"
                        name="application[degree_type]"
                        defaultValue={thisDegreeType ? {label:thisDegreeType, value:thisDegreeType} : selectedOption}
                        onChange={setSelectedOption}
                        options={degree_types}
                    />
                    
                    

                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Program</Form.Label>
                    <Select
                        id="application[program]"
                        name="application[program]"
                        // defaultValue={thisProgram ? {label:thisProgram, value:thisProgram} : selectedOption}
                        onChange={setSelectedOption}
                        options={
                            programs
                            // [
                            //     {value:'Acountancy', label:'Acountancy'},
                            //     {value:'Aerospace Engineering', label:'Aerospace Engineering'},
                            // ]
                        }
                    />
                    
                </Form.Group>


                <Form.Group className="mb-3">
                    <Form.Label>Intake (Semester) Start Date (Required)</Form.Label>
                    <Select
                        id="intake_for_lead"
                        name="application[school_start_date]"
                        defaultValue={thisIntake ? {label:thisIntake, value:thisIntake} : selectedOption}
                        onChange={setSelectedOption}
                        options={
                            [
                                {value:'Fall 2023', label:'Fall 2023'},
                                {value:'Spring 2024', label:'Spring 2024'},
                                {value:'Summer 2024', label:'Summer 2024'},
                                {value:'Fall 2024', label:'Fall 2024'},
                                {value:'Spring 2025', label:'Spring 2025'},
                                {value:'Summer 2025', label:'Summer 2025'},
                                {value:'Fall 2025', label:'Fall 2025'},
                            ]
                        }
                        required
                    />
                    
                </Form.Group>


                <Button disabled={submitting ? true : false} variant="primary" size='lg' className='extra-pad' type="submit" >
                    {submitting ? <FontAwesomeIcon icon={faSpinner} spin />: 'Submit'}
                </Button>
            </Form>
            <p  style={{fontSize:'small', textAlign:'center' }}>*This is not an application for credit.</p>
        </div>
    )
}

export const AdmissionsSignupPart3C = (props) => {
    //let submitThisForm = props.submitThisForm;
    let { submitThisForm, application} = props;
    let thisHomeCountry, thisCurrentCity, thisSchoolCountry, thisNeedsLoan, thisHasCosigner, thisDegreeType, thisProgram, thisIntake, thisSchool;
    //let programs = [];
    const [programs, setPrograms] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    //''

    useEffect(() => {
        fetch(`/nomadapi.php?order_id=/api/v1/umbrella_categories`)
            .then(response => response.json())
            .then(response => {
                let thesePrograms = []
                response = response.data;
                response.forEach(x => {
                    thesePrograms.push({value:x.name, label: x.name})
                });
                setPrograms(thesePrograms)
            })
            .catch(error => {
                console.log('error', ""+error);
            });
    }, []);

    const cosignerPopover = (
        <Popover id="popover-basic">
          <Popover.Header as="h3">Cosigner</Popover.Header>
          <Popover.Body>
            <p style={{fontSize:'small', }}>It is important to indicate if you may have a creditworthy cosigner. Having a creditworthy cosigner may either increase your loan options and/or reduce the interest rate on your eligible loan options. A US Cosigner is a creditworthy US Citizen or US Permanent Resident</p>
          </Popover.Body>
        </Popover>
      );

    if(application){

        if (application.home_country || application.data.home_country) {
            thisHomeCountry = application.home_country ? application.home_country : application.data.home_country;
        }

        if (application.current_city) {
            thisCurrentCity = application.current_city;
        }

        if (application.data.needs_loan) {
            thisNeedsLoan = application.data.needs_loan;
        }

        if (application.has_cosigner || application.data.has_cosigner) {
            thisHasCosigner = application.has_cosigner ? application.has_cosigner : application.data.has_cosigner;
        }

        if (application.degree_type || application.data.degree_type) {
            thisDegreeType = application.degree_type ? application.degree_type : application.data.degree_type;
        }

        if (application.school || application.data.school) {
            thisSchool = application.school ? application.school : application.data.school;
        }

        if (application.data.school_country) {
            thisSchoolCountry = application.data.school_country;
        }

        if (application.data && application.data.program) {
            thisProgram = application.data.program;
        }

        if (application.data.intake_year && application.data.intake_season) {
            thisIntake = application.data.intake_season + " " + application.data.intake_year;
        }
    }

    const [selectedOption, setSelectedOption] = useState(null);
    
    // let contries = signupFormData.countries.map(x => { 
    //     return {value: x, label:x}
    // })
    let contries = signupFormData.countries.map(x => { 
        return {value: x, label:x}
    })

    let degree_types = [
        {label:'Undergraduate', options: signupFormData['degree_types']['Undergraduate'].map(x => {return {value: x, label:x}})},
        {label:'Graduate', options: signupFormData['degree_types']['Graduate'].map(x => {return {value: x, label:x}})},
    ];

    const [needsLoan, setNeedsLoan] = useState(false)
    let setThisNeedsLoan = (retVal1, retVal2) => {
        if(retVal1.value === 'Yes') setNeedsLoan(true);
        else setNeedsLoan(false);
        setSelectedOption(retVal1, retVal2)
    }
    
    return(
        <div className='landing-form nomad-form'>
            <Form onSubmit={e => {
                setSubmitting(true)
                if(submitThisForm){
                    submitThisForm(e)
                } 
            }}>
                <div className='top-form'>
                    <h2>Admissions</h2>
                    <p>Please fill out the information below to allow our expert admissions counselors to better prepare for your free consultation call. Please note the information shared should be about your study abroad plans and not your current ongoing education details.</p>
                </div>
                <Form.Group className="mb-3">
                    <Form.Label>Home Country</Form.Label>
                    <Select
                        id="application_home_country"
                        name="application[home_country]"
                        defaultValue={thisHomeCountry ? {label:thisHomeCountry, value:thisHomeCountry} : selectedOption}
                        onChange={setSelectedOption}
                        options={contries}
                    />
                </Form.Group>
                {/* <Form.Group className="mb-3" >
                    <Form.Label>Current City</Form.Label>
                    <Form.Control type="text"  id='alPassword' name="application[current_city]" defaultValue={thisCurrentCity ? thisCurrentCity : null} />
                </Form.Group> */}
                <Form.Group className="mb-3">
                    <Form.Label>Planned Country of Study</Form.Label>
                    <Select
                        id="application_school_country"
                        name="application[school_country]"
                        defaultValue={thisSchoolCountry ? {label:thisSchoolCountry, value:thisSchoolCountry} : selectedOption}
                        onChange={setSelectedOption}
                        options={contries}
                    />
                </Form.Group>
                {/* <Form.Group className="mb-3">
                    <Form.Label>Will you need a student loan to fund your education?</Form.Label>
                    <Select
                        id="application_needs_loan"
                        name="application[needs_loan]"
                        defaultValue={thisNeedsLoan ? {label:thisNeedsLoan, value:thisNeedsLoan} : selectedOption}
                        onChange={setThisNeedsLoan}
                        options={[
                                {value:'', label:''},
                                {value:'Yes', label:'Yes'},
                                {value:'No', label:'No'},
                            ]}
                    />
                </Form.Group> */}
                {/* <Form.Group className={`mb-3 ${(needsLoan || thisNeedsLoan === 'Yes') ? '' : 'hidden'}`}>
                    <Form.Label>Do you have a cosigner? &nbsp; 
                        <OverlayTrigger placement="right" overlay={cosignerPopover}>
                             <FontAwesomeIcon icon={faQuestionCircle} />
                        </OverlayTrigger>
                    </Form.Label>
                    <Form.Check
                        type='radio'
                        defaultChecked={thisHasCosigner == 'domestic'}
                        value={`domestic`}
                        id={`application_has_cosigner_domestic`}
                        label={`Yes, US Cosigner`}
                        name="application[has_cosigner]"
                    />
                    <Form.Check
                        type='radio'
                        defaultChecked={thisHasCosigner == 'foreign'}
                        value={`foreign`}
                        id={`application_has_cosigner_foreign`}
                        label={`Yes, Cosigner in home country`}
                        name="application[has_cosigner]"
                    />
                    <Form.Check
                        type='radio'
                        defaultChecked={thisHasCosigner == 'no'}
                        value={'no'}
                        id={`application_has_cosigner_no`}
                        label={`No`}
                        name="application[has_cosigner]"
                    />
                    
                </Form.Group> */}
                <Form.Group className="mb-3">
                    <Form.Label>Degree Type You Are Pursuing for Study Abroad</Form.Label>
                    {/* <p style={{fontSize:'small', }}>Please select the degree you want loan options to pay for</p> */}
                    <Select
                        id="application_degree_type"
                        name="application[degree_type]"
                        defaultValue={thisDegreeType ? {label:thisDegreeType, value:thisDegreeType} : selectedOption}
                        onChange={setSelectedOption}
                        options={degree_types}
                    />
                    
                    

                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Program</Form.Label>
                    <Select
                        id="application[program]"
                        name="application[program]"
                        defaultValue={thisProgram ? {label:thisProgram, value:thisProgram} : selectedOption}
                        onChange={setSelectedOption}
                        options={
                            programs
                            // [
                            //     {value:'Acountancy', label:'Acountancy'},
                            //     {value:'Aerospace Engineering', label:'Aerospace Engineering'},
                            // ]
                        }
                    />
                    
                </Form.Group>


                <Form.Group className="mb-3">
                    <Form.Label>Intake (Semester) Start Date (Required)</Form.Label>
                    <Select
                        id="intake_for_lead"
                        name="application[school_start_date]"
                        defaultValue={thisIntake ? {label:thisIntake, value:thisIntake} : selectedOption}
                        onChange={setSelectedOption}
                        options={
                            [
                                {value:'Fall 2023', label:'Fall 2023'},
                                {value:'Spring 2024', label:'Spring 2024'},
                                {value:'Summer 2024', label:'Summer 2024'},
                                {value:'Fall 2024', label:'Fall 2024'},
                                {value:'Spring 2025', label:'Spring 2025'},
                                {value:'Summer 2025', label:'Summer 2025'},
                                {value:'Fall 2025', label:'Fall 2025'},
                            ]
                        }
                        required
                    />
                    
                </Form.Group>


                <Button disabled={submitting ? true : false} variant="primary" size='lg' className='extra-pad' type="submit" >
                    {submitting ? <FontAwesomeIcon icon={faSpinner} spin />: 'Submit'}
                </Button>
            </Form>
            <p  style={{fontSize:'small', textAlign:'center' }}>*This is not an application for credit.</p>
        </div>
    )
}

export const ForgetPasswordForm = () => {
    
    return(
        <div className='landing-form nomad-form'>
            <Form onSubmit={e => {
                passwordResetForm(e);
            }}>
                <div className='top-form'>
                    <h1>Forget Password</h1>
                </div>
                
                <Form.Group className="mb-3">
                    <Form.Control  type="email"  id='alEmail' name="user[email]" required  />
                    <Form.Label>Email*</Form.Label>
                </Form.Group>
                <Button variant="primary" size='lg' className='extra-pad' type="submit" >
                    Send me reset password instructions
                </Button>
            </Form>
        </div>
    )
}

const validatePassword = (password) => {
    return password && password.length > 5;
};

const validatePhone = (phoneNumber) => {
    return phoneNumber && phoneNumber.replace(/ /g,'').length > 9;
};

export const BasicForm = (props) => {
    const [validPhone, setValidPhone] = useState(true);
    const [validEmail, setValidEmail] = useState(true);
    const [validPassword, setValidPassword] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    let {description, checkAdmissionsOption, checkLoanOption} = props;
    if(!description) description = `Fill out the form to create an account and tell us about yourself and what you're searching for. We'll show you potential lending partner loan options or put you in touch with one of our admissions counselors.`;

    return(
        <Container fluid className='signup-form nomad-form pt-0 pb-5' id="mainForm">
                <Row> 
                    <Col md={{offset:3}}>
                        
                        <Form onSubmit={e => {
                            e.preventDefault();
                            setSubmitting(true)
                            const formData = new FormData(e.target),
                                details = Object.fromEntries(formData.entries())
                            if (!validatePhone(details.phone_number)) {
                                setValidPhone(false);
                                setSubmitting(false)
                            } else {
                                setValidPhone(true);
                                if (details.email) {
                                    if (!validateEmail(details.email)) {
                                        setValidEmail(false);
                                        setSubmitting(false)
                                    } else {
                                        setValidEmail(true);
                                        if (!validatePassword(details.password)) {
                                            setValidPassword(false);
                                            setSubmitting(false)
                                        } else {
                                            setValidPassword(true);
                                            if (details.interested === 'Loan Options') {
                                                submitLoanLandingForm(e, 'loans-website-sign-up');
                                            } else {
                                                submitLoanLandingForm(e, 'admissions-website-sign-up');
                                            }

                                        }
                                    }
                                } else {
                                    setValidEmail(false);
                                    setSubmitting(false)
                                }
                            }

                        }}>
                            <div className='top-form'>
                                <h2>Sign up to get started</h2>
                                <p>{description}</p>
                            </div>
                            
                            <Form.Group className="mb-3">
                                <Form.Control type="text" required  id='bfFName1'  name='first_name' />
                                <Form.Label>First Name*</Form.Label>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control type="text" required id='bfLName1'  name='last_name' />
                                <Form.Label>Last Name*</Form.Label>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <PhoneField />
                                <Form.Label>Phone Number*</Form.Label>
                                { validPhone ? <></> : <><br /><Form.Label style={{color:'red'}}>Please provide a valid phone number.</Form.Label></>}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control type="email" required id='bfEmail1' name="email" />
                                <Form.Label>Email*</Form.Label>
                                { validEmail ? <></> : <><br /><Form.Label style={{color:'red'}}>Please provide a valid email.</Form.Label></>}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control type="password" required name='password' id='bfPassword1' />
                                <Form.Label>Password*</Form.Label>
                                { validPassword ? <></> : <><br /><Form.Label style={{color:'red'}}>Please provide a password that is at least six characters long.</Form.Label></>}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>I'm Interested In:*</Form.Label>
                                <div key={`inline-radio`}>
                                    <Form.Check
                                        inline
                                        label="Loan Options"
                                        name="interested"
                                        required
                                        type='radio'
                                        id={`inline-radio-3`}
                                        value='Loan Options'
                                        defaultChecked={checkLoanOption}
                                    />
                                    <Form.Check
                                        inline
                                        label="Admissions Consultation"
                                        name="interested"
                                        required
                                        type='radio'
                                        id={`inline-radio-4`}
                                        value='Admissions Consultation'
                                        defaultChecked={checkAdmissionsOption}

                                    />
                                </div>
                            </Form.Group>
                            <Button disabled={submitting ? true : false} variant="primary" size='lg' className='extra-pad' type="submit">
                                {submitting ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Submit'}
                            </Button>
                            <BottomForm />
                        </Form>
                        
                    </Col>
                    <Col className='spacer' md={3} />
                </Row>
            </Container>
    )
}

export const LoanBottomForm = (props) => {
    const [validPhone, setValidPhone] = useState(true);
    const [validEmail, setValidEmail] = useState(true);
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
                            const formData = new FormData(e.target),
                            details = Object.fromEntries(formData.entries())
                            if (details.phone_number && details.phone_number.replace(/ /g,'').length < 10) {
                                setValidPhone(false);
                            } else {
                                setValidPhone(true);
                                if (details.email) {
                                    if (!validateEmail(details.email)) {
                                        setValidEmail(false);
                                    } else {
                                        setValidEmail(true);
                                        submitLoanLandingForm(e, landingName);
                                    }
                                } else {
                                    setValidEmail(false);
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

                            {/*<Form.Group className="mb-3" >*/}
                            {/*    <Form.Control type="password"  id='alPassword' name="password" required  />*/}
                            {/*    <Form.Label>Password*</Form.Label>*/}
                            {/*</Form.Group>*/}

                            <Button variant="primary" size='lg' className='extra-pad' type="submit" >
                                {buttonText}
                            </Button>
                            <BottomForm buttonText={buttonText} />
                        </Form>
                        
                    </Col>
                    <Col className='spacer' md={3} />
                </Row>
            </Container>
    )
}

const isBlank = (str) => {
    return (!str || /^\s*$/.test(str));
};

export const FooterForm = (props) => {

    const [validEmail, setValidEmail] = useState(true);
    const [validMessage, setValidMessage] = useState(true);
    const [submitted, setSubmitted] = useState(false);
    if(submitted) return <ThankYou small={true} />

    return(
        <Form onSubmit={e => {
            e.preventDefault();
            const formData = new FormData(e.target),
            details = Object.fromEntries(formData.entries())

            if (!validateEmail(details.email_address)) {
                setValidEmail(false);
                return;
            } else {
                setValidEmail(true);
            }

            if (isBlank(details.message)) {
                setValidMessage(false);
                return;
            }

            submitContactMessage(e);
            setSubmitted(true)
        }}>
            <h3>Get Connected</h3>
            <p>Stay up to date on the latest from Nomad Credit. Sign up below.</p>
            <Form.Group className="mb-3">
                <Form.Control type="email" name='email_address' id='ffemail' placeholder="Email" />
                { validEmail ? <></> : <><br /><Form.Label style={{color:'red'}}>Please provide a valid email.</Form.Label></>}
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Control type="text" name='message' id='ffMessage' placeholder="Message" />
                { validMessage ? <></> : <><br /><Form.Label style={{color:'red'}}>Please provide a message.</Form.Label></>}
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default BasicForm;