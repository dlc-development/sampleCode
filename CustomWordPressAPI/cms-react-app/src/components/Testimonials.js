import React, { useState, } from 'react';
// import { Button, Container, Row, Col, Card, Collapse} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Collapse from 'react-bootstrap/Collapse';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import '../css/components/testimonials.scss';

const Testimonials = (props) => {

    const [testimonial1Open, setTestimonial1Open] = useState(false);
    const [testimonial2Open, setTestimonial2Open] = useState(false);
    const [testimonial3Open, setTestimonial3Open] = useState(false);
    let {title} = props;
    if(!title) title = 'What International Students are Saying'
    return(
        <Container fluid className={`section-block testimonials ${props.className ? props.className : ''}`}>
            {/* <LazyLoadImage alt='Envelope' src='/images/testimonial-envelope.png' className='envelope' /> */}
            <Row> 
                <Col className='pt-5' md={{offset:1}}>
                    <h2>{title}</h2>
                </Col>
                <Col className='spacer' md={1} />
            </Row>
            <Row className='three-col-row'> 
                <Col xs={12} md={4}>
                    <Card className='nomad-card'>
                        <Card.Body>
                            <LazyLoadImage alt='Vikramjit' width={100} height={100} fluid src='/images/student1-small.webp' />
                            <Card.Title>Vikramjit</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">MBA Student at University of Georgia</Card.Subtitle>
                            <div className='clearfix' />
                            <Card.Text>
                            I am really happy with the services provided by Nomad Credit, especially the prompt responses and personalized loan solutions. I sincerely recommend their services.
                            {/* My name is Vikramjit Singh and I am currently pursuing an FTMBA in the USA. I had completed one year of study and was yet to start with the second year. I required an education loan for which I contac{ testimonial1Open ? '' : '...' } 
                            <Collapse in={testimonial1Open}>
                                <span id="example-collapse-text">
                                ted Nomad Credit. Mr Brian personally got involved in the case and apart from advising me on which organizations to reach out to, he also followed up for my case and made sure that all formalities were done on a fast track basis. I am really happy with the services provided by Nomad Credit, especially the prompt responses and personalized loan solutions. I sincerely recommend their services.
                                </span>
                            </Collapse>
                            <Button
                                variant='link'
                                onClick={() => setTestimonial1Open(!testimonial1Open)}
                                aria-controls="example-collapse-text"
                                aria-expanded={testimonial1Open}
                            >
                               { testimonial1Open ? 'Less' : 'More' } { testimonial1Open ? <FontAwesomeIcon icon={faArrowUp} /> : <FontAwesomeIcon icon={faArrowDown} /> }
                            </Button> */} 
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={4}>
                <Card className='nomad-card'>
                        <Card.Body>
                            <LazyLoadImage alt='Rohan' width={100} height={100} fluid src='/images/student2-small.webp' />
                            <Card.Title>Rohan</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">California State University</Card.Subtitle>
                            <div className='clearfix' />
                            <Card.Text>
                            Nomad Credit really understood my need and started filtering options based on it. Finally I chose the right option and now I am in my final semester waiting to graduate this fall. It was all possible because of you guys. 
                            {/* First of all many thanks for the great support and you guys are doing a splendid job. I am a Masters student from India, studying in the U.S. and due to certain unforeseen conditions I was not able to{ testimonial2Open ? ' ' : '...' }  
                            <Collapse in={testimonial2Open}>
                                <span id="example-collapse-text">
                                arrange for my last Semester fees. After researching 50+ options finally Nomad Credit came to the rescue. Being an International Student I was very tensed about arranging fees at the last minute but the Nomad Credit team made me relaxed. A simple yet accurate communication and follow up helped me in understanding various options. Nomad Credit really understood my need and started filtering options based on it. Finally I chose the right option and now I am in my final semester waiting to graduate this fall. It was all possible because of you guys. Cheers to Team Nomad Credit.
                                </span>
                            </Collapse>
                            <Button
                                variant='link'
                                onClick={() => setTestimonial2Open(!testimonial2Open)}
                                aria-controls="example-collapse-text"
                                aria-expanded={testimonial2Open}
                            >
                                { testimonial2Open ? 'Less' : 'More' } { testimonial2Open ? <FontAwesomeIcon icon={faArrowUp} /> : <FontAwesomeIcon icon={faArrowDown} /> }
                            </Button> */} 
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={4}>
                <Card className='nomad-card'>
                        <Card.Body>
                            <LazyLoadImage alt='C.B.' width={100} height={100} fluid src='/images/student8-small.webp' />
                            <Card.Title>C.B.</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Graduate Student at Clemson University</Card.Subtitle>
                            <div className='clearfix' />
                            <Card.Text>
                            I searched for a student loan from Nomad Credit and I must commend that they are the right team for the job with the best professionals always willing to help students handle the stress of finance. 
                            {/* I searched for a student loan from Nomad Credit and I must commend that they are the right team for the job with the best professionals always willing to help students handle the stress of finance. The loan options{ testimonial3Open ? '' : '...' }  
                            <Collapse in={testimonial3Open}>
                                <span id="example-collapse-text">
                                 they provided were great and it can benefit international students. I would recommend Nomad Credit to any aspiring international student in America.
                                </span>
                            </Collapse>
                            <Button
                                variant='link'
                                onClick={() => setTestimonial3Open(!testimonial3Open)}
                                aria-controls="example-collapse-text"
                                aria-expanded={testimonial3Open}
                            >
                                { testimonial3Open ? 'Less' : 'More' } { testimonial3Open ? <FontAwesomeIcon icon={faArrowUp} /> : <FontAwesomeIcon icon={faArrowDown} /> }
                            </Button> */} 
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
)
}

export const AllTestimonials = (props) => {

    const [testimonial1Open, setTestimonial1Open] = useState(false);
    const [testimonial2Open, setTestimonial2Open] = useState(false);
    const [testimonial3Open, setTestimonial3Open] = useState(false);
    const [testimonial4Open, setTestimonial4Open] = useState(false);
    const [testimonial5Open, setTestimonial5Open] = useState(false);
    const [testimonial6Open, setTestimonial6Open] = useState(false);

    let {title} = props;
    if(!title) title = "What International Students are Saying";

    return(
        <Container fluid className={`section-block testimonials ${props.className ? props.className : ''}`}>
            <LazyLoadImage alt='Envelope' src='/images/testimonial-envelope.png' className='envelope' />
            <Row> 
                <Col className='pt-5' md={{offset:1}}>
                    <h2>{title}</h2>
                </Col>
                <Col className='spacer' md={1} />
            </Row>
            <Row className='three-col-row'> 
                <Col xs={12} md={4}>
                    <Card className='nomad-card'>
                        <Card.Body>
                            <LazyLoadImage alt='Alok' fluid roundedCircle src='/images/alok.webp' />
                            <Card.Title>Alok</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">MS in US</Card.Subtitle>
                            <div className='clearfix' />
                            <Card.Text>
                            
                             I would like to say many thanks to Ms. Neelu for truly being the best mentor in getting admission into my desired University. Since I wasn't aware of the overall procedure, I was a bit anxious about i{ testimonial1Open ? '' : '...' } 
                            <Collapse in={testimonial1Open}>
                                <span id="example-collapse-text">
                                t, but she helped me from scratch with all the documentation, assisted me with the scholarships, loans, and Visa processes, and found the best college which suits my profile. Thank you so much for all your help and assistance, Neelu. Good Luck!
                                </span>
                            </Collapse>
                            <Button
                                variant='link'
                                onClick={() => setTestimonial1Open(!testimonial1Open)}
                                aria-controls="example-collapse-text"
                                aria-expanded={testimonial1Open}
                            >
                               { testimonial1Open ? 'Less' : 'More' } { testimonial1Open ? <FontAwesomeIcon icon={faArrowUp} /> : <FontAwesomeIcon icon={faArrowDown} /> }
                            </Button> 
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={4}>
                <Card className='nomad-card'>
                        <Card.Body>
                            <LazyLoadImage alt='Namrata' fluid roundedCircle src='/images/namrata.webp' />
                            <Card.Title>Namrata</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">MS in US</Card.Subtitle>
                            <div className='clearfix' />
                            <Card.Text>
                            
                             I had particular requirements about the universities for doing my Masters in the US. I enrolled in Nomad Credit, and Sneha helped me throughout the admission process. She was cooperative and kind. Sne{ testimonial2Open ? '' : '...' }  
                            <Collapse in={testimonial2Open}>
                                <span id="example-collapse-text">
                                ha guided me rightly in order to get an admission to my targeted university. She always gave her assistance even in off-work hours, which I appreciated the most about her. Sneha is very friendly and cleared all my doubts very patiently and correctly. Thank you so much Sneha for your help.
                                </span>
                            </Collapse>
                            <Button
                                variant='link'
                                onClick={() => setTestimonial2Open(!testimonial2Open)}
                                aria-controls="example-collapse-text"
                                aria-expanded={testimonial2Open}
                            >
                                { testimonial2Open ? 'Less' : 'More' } { testimonial2Open ? <FontAwesomeIcon icon={faArrowUp} /> : <FontAwesomeIcon icon={faArrowDown} /> }
                            </Button>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={4}>
                <Card className='nomad-card'>
                        <Card.Body>
                            <LazyLoadImage alt='Ashutosh' fluid roundedCircle src='/images/ashutosh.webp' />
                            <Card.Title>Ashutosh</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">MS in US</Card.Subtitle>
                            <div className='clearfix' />
                            <Card.Text>
                             
                             If I have to give thanks for something this year, it would be connecting me with Nomad and Sneha, a person who helped me a lot in my steps towards my career, made a warm friendship with me before she{ testimonial3Open ? ' ' : '...' }  
                            <Collapse in={testimonial3Open}>
                                <span id="example-collapse-text">
                                    started ,and helped me very kindly. She is very knowledgeable and a great resource. Thanks won't be enough for such a great opportunity.
                                </span>
                            </Collapse>
                            <Button
                                variant='link'
                                onClick={() => setTestimonial3Open(!testimonial3Open)}
                                aria-controls="example-collapse-text"
                                aria-expanded={testimonial3Open}
                            >
                                { testimonial3Open ? 'Less' : 'More' } { testimonial3Open ? <FontAwesomeIcon icon={faArrowUp} /> : <FontAwesomeIcon icon={faArrowDown} /> }
                            </Button> 
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className='three-col-row'> 
                <Col xs={12} md={4}>
                    <Card className='nomad-card'>
                        <Card.Body>
                            <LazyLoadImage alt='Aadit' fluid roundedCircle src='/images/aadit.webp' />
                            <Card.Title>Aadit</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">MS in US</Card.Subtitle>
                            <div className='clearfix' />
                            <Card.Text>
                            My experience with Nomad has been great so far. Academic counseling is a very long and stressful process and you need personal attention to help you throughout your application process. Nomad, and esp{ testimonial4Open ? '' : '...' } 
                            <Collapse in={testimonial4Open}>
                                <span id="example-collapse-text">
                                    ecially Sneha Ma’am, has taken care of every aspect of my applications with great care and attention. Sneha Ma’am was available at any given point of time when I needed her assistance. I'd highly recommend Nomad Credit and especially the guidance of Sneha Ma’am for your Masters preparation and counseling. She has great knowledge about the entire procedure. Thank you Nomad Team and thanks a lot Sneha Ma’am.
                                </span>
                            </Collapse>
                            <Button
                                variant='link'
                                onClick={() => setTestimonial4Open(!testimonial4Open)}
                                aria-controls="example-collapse-text"
                                aria-expanded={testimonial4Open}
                            >
                               { testimonial4Open ? 'Less' : 'More' } { testimonial4Open ? <FontAwesomeIcon icon={faArrowUp} /> : <FontAwesomeIcon icon={faArrowDown} /> }
                            </Button>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={4}>
                <Card className='nomad-card'>
                        <Card.Body>
                            <LazyLoadImage alt='Onkar' fluid roundedCircle src='/images/onkar.webp' />
                            <Card.Title>Onkar</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">MS in US</Card.Subtitle>
                            <div className='clearfix' />
                            <Card.Text>
                            Master studies in USA was my long sought dream. Though I had done extensive research on universities, I wasn’t able to decide on the universities that suited my profile. In the pursuit of research, I{ testimonial5Open ? ' ' : '...' }  
                            <Collapse in={testimonial5Open}>
                                <span id="example-collapse-text">
                                came across Nomad Credit’s website. I was connected with Neelu Tatkare ma’am. I explained my situation to her and going ahead I wasn’t disappointed at all. She suggested quite a few universities to me and constantly kept in touch regarding applications. Her follow-up and constant efforts gave me a great boost going through the application process. Today I have admits from three very good universities, thanks to Neelu ma’am and Nomad Credit. Without any reservation, I recommend Nomad Credit’s admission services for abroad studies.
                                </span>
                            </Collapse>
                            <Button
                                variant='link'
                                onClick={() => setTestimonial5Open(!testimonial5Open)}
                                aria-controls="example-collapse-text"
                                aria-expanded={testimonial5Open}
                            >
                                { testimonial5Open ? 'Less' : 'More' } { testimonial5Open ? <FontAwesomeIcon icon={faArrowUp} /> : <FontAwesomeIcon icon={faArrowDown} /> }
                            </Button>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={4}>
                <Card className='nomad-card'>
                        <Card.Body>
                            <LazyLoadImage alt='Nitin' fluid roundedCircle src='/images/nitin.webp' />
                            <Card.Title>Nitin</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">MS in US</Card.Subtitle>
                            <div className='clearfix' />
                            <Card.Text>
                            I wanted to share my views towards the assistance & consultancy that I got from Neelu Tatkare Mam. She gave me confidence that I can apply to US universities with my current profile. My ambitious coll{ testimonial6Open ? ' ' : '...' }  
                            <Collapse in={testimonial6Open}>
                                <span id="example-collapse-text">
                                    ege was Stevens Institute of Technology, to which mam helped me in completing the application and assisting throughout the process. Then after she helped me in applying to University of Dayton, of which I got the admit on the same day that I applied! Later on she helped me applying to University of New Haven from which I got the admit and 20% Dean’s Scholarship as well as later applying to New Jersey Institute of Technology, Lawrence Technological University and University of Dearborn Then, after exactly 15 days after applying, I got the admit from Stevens Institute of Technology , which I was eagerly waiting for! Before working with Neelu mam’, I was not even sure whether to apply with my current profile or not. But after working with her, I received admits from 3 of the 5 schools I applied to despite my average profile. And now am looking forward to join Stevens for Fall 2021! I would highly recommend all the students who are aspiring for MS in US, Canada, UK, NewZealand connect with

                                </span>
                            </Collapse>
                            <Button
                                variant='link'
                                onClick={() => setTestimonial6Open(!testimonial6Open)}
                                aria-controls="example-collapse-text"
                                aria-expanded={testimonial6Open}
                            >
                                { testimonial6Open ? 'Less' : 'More' } { testimonial6Open ? <FontAwesomeIcon icon={faArrowUp} /> : <FontAwesomeIcon icon={faArrowDown} /> }
                            </Button>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
)
}

export const Testimonials2023 = (props) => {

    const [testimonial1Open, setTestimonial1Open] = useState(false);
    const [testimonial2Open, setTestimonial2Open] = useState(false);
    const [testimonial3Open, setTestimonial3Open] = useState(false);
    const [testimonial4Open, setTestimonial4Open] = useState(false);
    const [testimonial5Open, setTestimonial5Open] = useState(false);

    let {title} = props;
    if(!title) title = "What International Students are Saying";

    return(
        <Container fluid className={`section-block testimonials ${props.className ? props.className : ''}`}>
            <LazyLoadImage alt='Envelope' src='/images/testimonial-envelope.png' className='envelope' />
            <Row> 
                <Col className='pt-5' md={{offset:1}}>
                    <h2>{title}</h2>
                </Col>
                <Col className='spacer' md={1} />
            </Row>
            <Row className='three-col-row'> 
                <Col xs={12} md={6}>
                    <Card className='nomad-card'>
                        <Card.Body>
                            {/*<LazyLoadImage fluid roundedCircle src='https://placehold.co/100x100' />*/}
                            <Card.Title>Sandeep George</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">(Arizona State University)</Card.Subtitle>
                            <div className='clearfix' />
                            <Card.Text>
                            
                            “I got introduced to Nomad by one of my family friends who got counseling from their team. I was under the guidance of Poonam ma’am from the very beginning, and she explained each and every step{ testimonial1Open ? '' : '...' } 
                            <Collapse in={testimonial1Open}>
                                <span id="example-collapse-text">
                                 &nbsp;with such clarity and patience. She was so helpful and accessible, guiding me through filling up the applications.
                                <br />
                                <br />
                                <strong>Overall, I loved being associated with Nomad Credit in my Master's journey and would 10/10 recommend any student who is about to embark on their own journey.”</strong>
                                </span>
                            </Collapse>
                            <Button
                                variant='link'
                                onClick={() => setTestimonial1Open(!testimonial1Open)}
                                aria-controls="example-collapse-text"
                                aria-expanded={testimonial1Open}
                            >
                               { testimonial1Open ? 'Less' : 'More' } { testimonial1Open ? <FontAwesomeIcon icon={faArrowUp} /> : <FontAwesomeIcon icon={faArrowDown} /> }
                            </Button> 
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={6}>
                <Card className='nomad-card'>
                        <Card.Body>
                            {/*<LazyLoadImage fluid roundedCircle src='https://placehold.co/100x100' />*/}
                            <Card.Title>Shradha Sabherwal </Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">(University of Reading)</Card.Subtitle>
                            <div className='clearfix' />
                            <Card.Text>
                            
                                “I cannot thank Nomad Credit enough, especially my counselor who has worked day and night, helping me out, from short listings the universities to helping me with the applications, SOP, visa application and what not.{ testimonial2Open ? '' : '...' }  
                            <Collapse in={testimonial2Open}>
                                <span id="example-collapse-text">
                                <br />
                                <br />
                                <strong>I would highly recommend anyone looking to study abroad to get consultation from (Nomad) since they give each student personal attention and time. They make this journey much easier for you and give wings to your dreams!”</strong>
                                </span>
                            </Collapse>
                            <Button
                                variant='link'
                                onClick={() => setTestimonial2Open(!testimonial2Open)}
                                aria-controls="example-collapse-text"
                                aria-expanded={testimonial2Open}
                            >
                                { testimonial2Open ? 'Less' : 'More' } { testimonial2Open ? <FontAwesomeIcon icon={faArrowUp} /> : <FontAwesomeIcon icon={faArrowDown} /> }
                            </Button>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={4}>
                <Card className='nomad-card'>
                        <Card.Body>
                            {/*<LazyLoadImage fluid roundedCircle src='https://placehold.co/100x100' />*/}
                            <Card.Title>Yashas Rao Bettu</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted"> (Hofstra University)</Card.Subtitle>
                            <div className='clearfix' />
                            <Card.Text>
                             
                            “Within a day I had received a set of universities matching my profile. From there on <strong>Nomad Credit has nurtured my profile, helped me to write the SOP, and guided me to choose the right universities.</strong> { testimonial3Open ? ' ' : '...' }  
                            <Collapse in={testimonial3Open}>
                                <span id="example-collapse-text">
                                    <br />
                                    <br />
                                    Once again, I thank Nomad Credit & Poonam ma’am for converting a dream into a reality.”
                                </span>
                            </Collapse>
                            <Button
                                variant='link'
                                onClick={() => setTestimonial3Open(!testimonial3Open)}
                                aria-controls="example-collapse-text"
                                aria-expanded={testimonial3Open}
                            >
                                { testimonial3Open ? 'Less' : 'More' } { testimonial3Open ? <FontAwesomeIcon icon={faArrowUp} /> : <FontAwesomeIcon icon={faArrowDown} /> }
                            </Button> 
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={4}>
                    <Card className='nomad-card'>
                        <Card.Body>
                            {/*<LazyLoadImage fluid roundedCircle src='https://placehold.co/100x100' />*/}
                            <Card.Title>Dishant Shah </Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">(Rochester Institute of Technology)</Card.Subtitle>
                            <div className='clearfix' />
                            <Card.Text>
                            “I had the pleasure of working with Nomad Credit and my counselor, Sneha mam, for my higher education needs. <strong>From start to finish, Sneha was incredibly patient, helpful, and informative, providing me with the guidance and support I needed to make informed decisions about my education.</strong>{ testimonial4Open ? '' : '...' } 
                            <Collapse in={testimonial4Open}>
                                <span id="example-collapse-text">
                                    <br />
                                    <br />
                                    I highly recommend Nomad Credit to anyone looking for top-notch higher education counseling services. Their expertise and commitment to helping students achieve their goals is truly impressive.”
                                </span>
                            </Collapse>
                            <Button
                                variant='link'
                                onClick={() => setTestimonial4Open(!testimonial4Open)}
                                aria-controls="example-collapse-text"
                                aria-expanded={testimonial4Open}
                            >
                               { testimonial4Open ? 'Less' : 'More' } { testimonial4Open ? <FontAwesomeIcon icon={faArrowUp} /> : <FontAwesomeIcon icon={faArrowDown} /> }
                            </Button>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={4}>
                    <Card className='nomad-card'>
                        <Card.Body>
                            {/*<LazyLoadImage fluid roundedCircle src='https://placehold.co/100x100' />*/}
                            <Card.Title>Samruddhi Gawande  </Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">(San Jose State University) </Card.Subtitle>
                            <div className='clearfix' />
                            <Card.Text>
                            “I would like to share my heartfelt appreciation for the exceptional guidance and unwavering support provided by Nomad Credit and Poonam ma'am. Your expertise and dedication played a pivotal role in transforming my dream of pursuing masters in the US into a tangible reality.{ testimonial5Open ? '' : '...' } 
                            <Collapse in={testimonial5Open}>
                                <span id="example-collapse-text">
                                    <br />
                                    <br />
                                    <strong>
                                    I am forever grateful for your exceptional support and highly recommend you as a counselor and all your services to any student aspiring to study abroad.” 
                                    </strong>
                                </span>
                            </Collapse>
                            <Button
                                variant='link'
                                onClick={() => setTestimonial5Open(!testimonial5Open)}
                                aria-controls="example-collapse-text"
                                aria-expanded={testimonial5Open}
                            >
                               { testimonial5Open ? 'Less' : 'More' } { testimonial5Open ? <FontAwesomeIcon icon={faArrowUp} /> : <FontAwesomeIcon icon={faArrowDown} /> }
                            </Button>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                
            </Row>
        </Container>
)
}

export const TestimonialsAdmissions = (props) => {

    const [testimonial1Open, setTestimonial1Open] = useState(false);
    const [testimonial2Open, setTestimonial2Open] = useState(false);
    const [testimonial3Open, setTestimonial3Open] = useState(false);
    const [testimonial4Open, setTestimonial4Open] = useState(false);
    const [testimonial5Open, setTestimonial5Open] = useState(false);

    let {title} = props;
    if(!title) title = "What International Students are Saying";

    return(
        <Container fluid className={`section-block testimonials ${props.className ? props.className : ''}`}>
            {/* <LazyLoadImage alt='Envelope' src='/images/testimonial-envelope.png' className='envelope' /> */}
            <Row> 
                <Col className='pt-5' md={{offset:1}}>
                    <h2>{title}</h2>
                </Col>
                <Col className='spacer' md={1} />
            </Row>
            <Row className='three-col-row'> 
                <Col xs={12} md={4}>
                    <Card className='nomad-card'>
                        <Card.Body className='text-center'>
                            <Card.Title>Sandeep George</Card.Title>
                            <Card.Subtitle className="mb-3 ">Arizona State University</Card.Subtitle>
                            <div className='clearfix' />
                            <Card.Text>
                            
                            “I got introduced to Nomad by one of my family friends who got counseling from their team. I was under the guidance of Poonam ma’am from the very beginning, and she explained each and every step with such clarity and patience. She was so helpful and accessible, guiding me through filling up the applications.
                                <br />
                                <br />
                                <strong>Overall, I loved being associated with Nomad Credit in my Master's journey and would 10/10 recommend any student who is about to embark on their own journey.”</strong>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={4}>
                <Card className='nomad-card'>
                        <Card.Body className='text-center'>
                            {/*<LazyLoadImage fluid roundedCircle src='https://placehold.co/100x100' />*/}
                            <Card.Title>Shradha Sabherwal </Card.Title>
                            <Card.Subtitle className="mb-3 ">University of Reading</Card.Subtitle>
                            <div className='clearfix' />
                            <Card.Text>
                            
                                “I cannot thank Nomad Credit enough, especially my counselor who has worked day and night, helping me out, from short listings the universities to helping me with the applications, SOP, visa application and what not.<br />
                                <br />
                                <strong>I would highly recommend anyone looking to study abroad to get consultation from (Nomad) since they give each student personal attention and time. They make this journey much easier for you and give wings to your dreams!”</strong>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                
                <Col xs={12} md={4}>
                    <Card className='nomad-card'>
                        <Card.Body className='text-center'>
                            {/*<LazyLoadImage fluid roundedCircle src='https://placehold.co/100x100' />*/}
                            <Card.Title>Dishant Shah </Card.Title>
                            <Card.Subtitle className="mb-3 ">Rochester Institute of Technology</Card.Subtitle>
                            <div className='clearfix' />
                            <Card.Text>
                            “I had the pleasure of working with Nomad Credit and my counselor, Sneha mam, for my higher education needs. <strong>From start to finish, Sneha was incredibly patient, helpful, and informative, providing me with the guidance and support I needed to make informed decisions about my education.</strong><br />
                                    <br />
                                    I highly recommend Nomad Credit to anyone looking for top-notch higher education counseling services. Their expertise and commitment to helping students achieve their goals is truly impressive.”
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                
            </Row>
        </Container>
)
}

export default Testimonials;