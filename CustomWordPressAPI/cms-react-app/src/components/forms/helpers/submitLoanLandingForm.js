import {getCountryCallingCode} from 'react-phone-number-input';

const submitLoanLandingForm = (e, landingPageName) => {

    e.preventDefault();

    const formData = new FormData(e.target),
        details = Object.fromEntries(formData.entries())

    details['landing_page_name'] = landingPageName;
    details['phone_country_code'] = getCountryCallingCode(details['phone_numberCountry']);

    const api_route =  details['landing_page_name'].indexOf('admissions') > -1 || details['landing_page_name'].indexOf('admission') > -1 ? 'admissions' : 'loans'

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

export default submitLoanLandingForm;