import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Image,Card, Form, Accordion, Nav} from 'react-bootstrap';
import PhoneInput, {getCountryCallingCode} from 'react-phone-number-input';
import '../../css/views/secondary.scss';
import '../../css/views/student-portal.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import {Modal} from "antd";
import { usePostHog } from 'posthog-js/react';


const Offers = (props) => {
    const [offerData, setOfferData] = useState([])
    const [likelyOffers, setLikelyOffers] = useState(null)
    const [likelyOfferTab, setLikelyOfferTab] = useState(null)
    const [userData, setUserData] = useState({});
    const [advertisingDisclosuresVisible, setAdvertisingDisclosuresVisible] = useState(false);
    const [applicationType, setApplicationType] = useState(null);
    const [thisApplication, setThisApplication] = useState(null);

    //let {id} = props;
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const user_id = urlParams.get('user_id');
    const searchParams = new URLSearchParams(window.location.search);
    const fromPopup = searchParams.get("fromPopup")
    const posthog = usePostHog()
    // const {user_id, setUser_id} = useState(false); 
    let humanize = (str) => {
        var i, frags = str.split('_');
        for (i=0; i<frags.length; i++) {
          frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
        }
        return frags.join(' ');
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

    function sessionStorageHasUtms() {
        return sessionStorage.getItem('utm_source') !== null
            || sessionStorage.getItem('utm_medium') !== null
            || sessionStorage.getItem('utm_campaign') !== null
            || sessionStorage.getItem('utm_term') !== null
            || sessionStorage.getItem('utm_content') !== null;
    }

    useEffect(() => {
        fetch(`/whoami.php`)
            .then(response => response.json())
            .then(response => {
                if(!response.logged_in) window.location.href = '/sign-in?sign_in=true'
                else {
                    //console.log('setUser_id', response)
                    //setUser_id(response.id);
                }
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
                {credentials: "include",
                    method: "POST",
                    body: JSON.stringify({
                        utm_source: sessionStorage.getItem('utm_source'),
                        utm_medium: sessionStorage.getItem('utm_medium'),
                        utm_campaign: sessionStorage.getItem('utm_campaign'),
                        utm_term: sessionStorage.getItem('utm_term'),
                        utm_content: sessionStorage.getItem('utm_content'),
                        path: sessionStorage.getItem('path_for_utm'),
                    }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }})
                .then(response => console.log(response.json()))
                .catch(error => console.log(error));
            sessionStorage.removeItem('utm_source');
            sessionStorage.removeItem('utm_medium');
            sessionStorage.removeItem('utm_campaign');
            sessionStorage.removeItem('utm_term');
            sessionStorage.removeItem('utm_content');
            sessionStorage.removeItem('path_for_utm');
        }

        fetch(`/nomadapi.php?order_id=/api/v1/applications/${id}/offers/&user_id=${user_id}`)
            .then(response => response.json())
            .then(response => {
                response = response.data;
                posthog?.capture(`${fromPopup?"Popup":"Main"}  Signup - Offers`, { "offers": response?.length || 0  });
                setOfferData(response)
            }).then(() => {
            fetch(`/nomadapi.php?order_id=/api/v1/users/&user_id=${user_id}`)
                .then(response => response.json())
                .then(response => {
                    response = response.data;
                    setUserData(response)
                })
                .catch(error => {
                    console.error('error with user details', ""+error);
                });
        })
        .catch(error => {
            console.error('error with offers', ""+error);
        });
        ///api/v1/users/applications/types
    }, []);

    useEffect(() => {
        fetch(`/applicationDetails.php?id=${id}&user_id=${user_id}`)
            .then(response => response.json())
            .then(response => {
                response = JSON.parse(response.data);
                setThisApplication(response);
                setApplicationType(response.application_type);
            })
            .catch(error => {
                console.log('error', ""+error);
            });

        fetch(`/nomadapi.php?order_id=/api/v1/users/likely_offers&id=${id}&user_id=${user_id}`)
            .then(response => response.json())
            .then(response => {
                response = response.data;
                setLikelyOffers(response);

                if(response){
                    setLikelyOfferTab(Object.keys(response)[0]);
                }

            }).then(() => {

        })
            .catch(error => {
                console.log('error with offers', ""+error);
            });

        // fetch(`/api/v1/users/likely_offers`)
        //     .then(response => response.json())
        //     .then(response => {
        //         setLikelyOffers(response);
        //         if(response){
        //             setLikelyOfferTab(Object.keys(response)[0]);
        //         }

        //         console.log('likelyOffers', likelyOffers)
        //     }).then(() => {

        // })
        // .catch(error => {
        //     console.log('error with offers', ""+error);
        // });
        //
    }, []);

    const checkWaiver = async (details) => {
        fetch(`/nomadapi.php?order_id=/api/v1/applications/${id}/edit/admissions/waiver&user_id=${user_id}`,
            {
                method: "POST",
                credentials: "include",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
                .then(response => {
                    console.log('waiver', response)
                    response = response.data;
                    window.location.href = "/dashboard" + `?dashboard=true&waiver_checked_path=${response.waiver_checked_path}&intake_path=${response.intake_path}&program_path=${response.program_path}&home_country_path=${response.home_country_path}&school_country_path=${response.school_country_path}`
                })
                .catch(error => {
                    console.log('error', ""+error);
                });
    }

    const isWaiverChecked = () => {
        if(thisApplication && thisApplication.data && thisApplication.data.waiver_checked){
            return true;
        } else {
            return false;
        }
    }

    const selectOffer = (url, i, offer, likely = false) => {
        if(applicationType === 'admissions'){
            if(isWaiverChecked()){
                console.log('admissions', offer)
                window.location.href = "/dashboard?dashboard=true"
            } else {
                document.getElementById('offer_' + i).classList.add('hidden')
                document.getElementById('waiver_' + i).classList.remove('hidden')
            }
        } else {
            //{ method: "POST",}
            fetch(`/offerClick.php?application_offer_id=${offer.id}&offer_id=${offer.offer_id}&likely=${likely}&application_id=${id}&user_id=${user_id}`
            )
            
            .then(response => response.json())
            .then(response => {
                response = response.data;
                if(response){
                    if(response.redirect_to) window.open(response.redirect_to, '_blank');
                }

            })

        }
    }
    if(!id) return(<p>No Offer ID, please try again.</p>)

    const showAdvertisingDisclosures = () => {
        setAdvertisingDisclosuresVisible(true);
    }

    return(
        <>
    <Modal
        title="Advertising Disclosures"
        open={advertisingDisclosuresVisible}
        onOk={(_) => {
            setAdvertisingDisclosuresVisible(false);
        }}
        cancelButtonProps={{ style: { display: 'none' } }}
    >
        <div>
            Nomad Credit is an independent, advertising-supported comparison service. The loan options that appear on this site are from companies from which Nomad Credit receives compensation. This compensation may impact how and where products appear on this site, including, for example, the order in which they may appear within listing categories. Other factors, such as our own proprietary website rules and the likelihood of applicants' credit approval also impact how and where products appear on this site. Nomad Credit does not include the entire universe of available lenders, savings products or loan options available in the marketplace.
        </div>
    </Modal>
    <div className='options'>
        <Container fluid className='section-block'>
            <Row className='three-col-row'>
                <Col xs={12}>
                    <h1>Options</h1>
                    {offerData.length > 0 ?
                        <div className="congratulations">
                            <h3><FontAwesomeIcon icon={faLock} /> Congratulations, {userData.first_name}</h3>
                            <p>Based on your profile, we've found the below options to potentially be a good fit for you! Please click "Select" to learn more about each option. If you have any questions, please schedule a consultation or email us.</p>

                        </div>
                        :
                        <div className="not-found">
                            <p>Based upon the information that you submitted, we did not identify any options that fits your profile at this time. We will reach out if this is a result of missing information in your search. In the meantime, you are eligible to search for other products. Please email any questions that you may have to <a href={"mailto:help@nomadcredit.com"}>help@nomadcredit.com</a>.</p>

                        </div>

                    }
                    <div>
                        <p style={{marginTop: '10px', textAlign: 'center', color: 'blue'}}><a onClick={showAdvertisingDisclosures}>Advertising Disclosures</a></p>
                    </div>
                </Col>

            </Row>
            <Row className='three-col-row mt-5'>
                <Col xs={12} className="offers">

                    {offerData ? offerData.map((x,i) => {
                        let {offer} = x;
                        return(
                            <div key={i}  className='offer-card'>
                                <div className='offer-card-offer' id={'offer_' + i}>
                                    <Image style={{height: '60px'}} src={offer.logo_img_url}></Image> { offer.tracking_pixel_with_timestamp ? <Image style={{height: '1px'}} src={offer.tracking_pixel_with_timestamp} alt={'Advertisement'}></Image> : ''}
                                    <h3>{offer.company_name}</h3>
                                    {applicationType === 'admissions' ?
                                        <><Button className='offer-select' onClick={() => selectOffer(offer.url, i)}>Select</Button><div style={{float: 'right'}}><a href={offer.url}>Schedule Free Consultation</a></div></>
                                    :
                                    <Button className='offer-select' onClick={() => selectOffer(offer.url, i, x)}> Select</Button>
                                    }

                                    {offer.variable_rates ? <table>
                                        <tbody>
                                        <tr><td>Variable Rates</td><td>Fixed Rates</td></tr>
                                        <tr><td dangerouslySetInnerHTML={{__html:offer.variable_rates}}></td><td dangerouslySetInnerHTML={{__html:offer.fixed_rates}} ></td></tr>
                                        </tbody>
                                    </table> : <br/>}
                                    {offer.short_disclosure ?  <p dangerouslySetInnerHTML={{__html:offer.short_disclosure}}></p>  : ''}
                                    <div dangerouslySetInnerHTML={{__html:offer.description}} />

                                    {
                                        offer.long_disclosure ?
                                        <Accordion style={{marginTop:'50px'}}>
                                            <Accordion.Item eventKey="0">
                                                <Accordion.Header>{offer.more_info_text ? offer.more_info_text : 'Disclosure'}</Accordion.Header>
                                                <Accordion.Body >
                                                {offer.long_disclosure ? <p dangerouslySetInnerHTML={{__html:offer.long_disclosure}}></p> : ''}

                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                        :
                                        ''
                                    }

                                </div>
                                {applicationType && applicationType === 'admissions' ?
                                    <div id={'waiver_' + i} className='offer-card-waiver hidden'>

                                        <h3>Admissions Service Sign Up</h3>
                                        <p>
                                            You are almost ready to begin our FREE Full Admissions Service. All that remains is to please confirm your details below and check the box indicating that you have read our waiver. We are excited to help you Begin Your Journey!
                                        </p>

                                        <div className='landing-form nomad-form'>
                                            <Form onSubmit={e => {
                                                e.preventDefault()
                                                const formData = new FormData(e.target),
                                                details = Object.fromEntries(formData.entries());
                                                checkWaiver(details);
                                            }}>
                                                <Form.Group className="mb-3">
                                                    <Form.Control type="text"  id='alFName' name="application[first_name]" required defaultValue={thisApplication.first_name}  />
                                                    <Form.Label>First Name*</Form.Label>
                                                </Form.Group>

                                                <Form.Group className="mb-3" >
                                                    <Form.Control type="text" id='alLName'  name="application[last_name]" required defaultValue={thisApplication.last_name} />
                                                    <Form.Label>Last Name*</Form.Label>
                                                </Form.Group>

                                                <Form.Group className="mb-3">
                                                    <Form.Control  type="email"  id='alEmail' name="application[email]" required defaultValue={thisApplication.email}  />
                                                    <Form.Label>Email*</Form.Label>
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="phone" >
                                                    <PhoneField name="application[phone_number]" required defaultValue={thisApplication.phone_number}/>
                                                    <Form.Label>Phone Number*</Form.Label>
                                                </Form.Group>


                                                <p>By checking this box you agree to the terms below.</p>

                                                <p>I acknowledge that by submitting this online form, I am requesting Nomad Credit’s admissions services. Nomad Credit’s services may include sending personal information and documents to colleges and universities.</p>

                                                <p>I confirm that all information and documents that I provide to Nomad Credit are true with nothing omitted or falsified.</p>

                                                <p>I acknowledge I am responsible for all tuition, fees and other costs related to the college(s), university(s) and/or program(s) of which I am applying.</p>
                                                <Form.Group className="mb-3">
                                                    <Form.Check
                                                        type={'checkbox'}
                                                        id={`default-check`}
                                                        required
                                                    />
                                                </Form.Group>

                                                <Button variant="primary" size='lg' className='extra-pad' type="submit" >
                                                    Submit
                                                </Button>
                                            </Form>
                                        </div>

                                    </div>
                                :''}

                            </div>
                        )
                    }) : ''}
                </Col>
            </Row>
        </Container>
    </div>
    {likelyOffers ?
    <div className='options'>
        <Container fluid className=''>
        <Row className='three-col-row'>
            <Col xs={12}>
            <h2>Recommended Partners</h2>
            <p>
            Please see our recommended partners listed by product below. Click "Select" next to the partner you would like to choose. You will then be taken to the partner’s site where you can get additional information and submit an application on their site. Need help? Please email any questions to <a href='mailto:help@nomadcredit.com'>help@nomadcredit.com</a>.
            </p>
            </Col>
            </Row>

            <Row  className='three-col-row'>
                <Col xs={12}>

                <Nav variant="tabs" defaultActiveKey={Object.keys(likelyOffers)[0]}>
                    {
                        Object.keys(likelyOffers).map((x,i) =>{

                            return(<>
                                <Nav.Item key={x}>
                                    <Nav.Link onClick={() => setLikelyOfferTab(x)} eventKey={x}>{humanize(x)}</Nav.Link>
                                </Nav.Item>
                            </>)
                        })
                    }
                </Nav>

            </Col>
            </Row>

        </Container>
        {likelyOffers && likelyOffers[likelyOfferTab] ?
        <Container fluid className=''>
            <Row className='three-col-row'>
                {
                    likelyOffers[likelyOfferTab].map((x,i) => {
                        return(
                            <div key={i} className='offer-card'>
                                <Image style={{height: '60px'}} src={'/wp-content/uploads/images/partners/' + x.offer.logo_file_name}></Image>
                                <h3>{x.offer.company_name}</h3>
                                { x.offer.description.split(/\r?\n|\r|\n/g).map(x => <p>{x}</p>)}
                                <Button className='offer-select' onClick={() => selectOffer(x.offer.url, i, x, true)}>Select</Button>

                            </div>
                        )
                    })
                }
            </Row>
        </Container>
                : ''
}
    </div>

    : ''}

</>
    )
}
export default Offers
