import React, { useState } from 'react';
import { Button, Container, Row, Col, Image, Card, Collapse} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import '../css/components/team.scss';

const Team = (props) => {
    const [brianOpen, setBrianOpen] = useState(false);
    const [nateOpen, setNateOpen] = useState(false);
    const [team1Open, setTeam1Open] = useState(false);
    const [team2Open, setTeam2Open] = useState(false);
    const [team3Open, setTeam3Open] = useState(false);

    return(
        <Container fluid className={`section-block team ${props.className ? props.className : ''}`}>
            <Row className='three-col-row'> 
                <Col>
                    <h2>Meet our Team</h2>
                </Col>
            </Row>
            <Row className='three-col-row'> 
                <Col xs={12} md={6}>
                    <Card className='nomad-card'>
                        <Card.Body>
                            <Image alt='Brian Hoffman' fluid roundedCircle={true} src='/images/Brian.webp' />
                            <Card.Title>Brian Hoffman</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Founder & CEO</Card.Subtitle>
                            <div className='clearfix' />
                            <Card.Text>
                                Prior to founding Nomad Credit, Brian worked on an international student loan program for students studying in the United States. Brian was also a top derivatives trader at a leading global trading fi{ brianOpen ? '' : '...' }
                                <Collapse in={brianOpen}>
                                    <span>
                                        rm at the famous, Chicago Board of Trade. In his time at Nomad, Brian has personally helped thousands of students evaluate loan and admissions options for studying abroad. In addition, Brian consults for numerous of the leading study abroad consultants in India and around the world to ensure the quality of their USA school selections for their customers. Brian stays active in the U.S. University system by volunteering on the Advisory Board of his college fraternity. Brian graduated top of his class from the highly ranked business school at Indiana University – Bloomington with a degree in Finance.
                                    </span>
                                </Collapse>
                                <Button
                                        variant='link'
                                        onClick={() => setBrianOpen(!brianOpen)}
                                        aria-controls="example-collapse-text"
                                        aria-expanded={brianOpen}
                                    >
                                    <>
                                    { brianOpen ? 'Less' : 'More' } { brianOpen ? <FontAwesomeIcon icon={faArrowUp} /> : <FontAwesomeIcon icon={faArrowDown} /> }
                                    {}
                                    </> 
                                </Button>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={6}>
                    <Card className='nomad-card'>
                        <Card.Body>
                            <Image alt='Nathan Treadwell' fluid roundedCircle={true} src='/images/Nate.webp' />
                            <Card.Title>Nathan Treadwell</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Head of U.S. Loans & Admissions</Card.Subtitle>
                            <div className='clearfix' />
                            <Card.Text>
                                Part of the Nomad Credit founding team, Nathan has led Nomad Credit in building their profile evaluation model and U.S. admissions processes. As Head of U.S. Admissions, Nathan has personally worked w{ nateOpen ? '' : '...' }
                                <Collapse in={nateOpen}>
                                    <span>
                                        ith thousands of students to evaluate their loan and university options to help further their goals of studying abroad. Nathan represents Nomad’s presence abroad and in the U.S. – consulting with noted Indian NBFCs and prominent U.S. universities – and will be leading a series of webinars with Nomad’s NBFC partners on U.S. admissions and the visa process. Nathan graduated from the Kelley School of Business at Indiana University – Bloomington, a top ranked business school, with a degree in Finance.
                                    </span>
                                </Collapse>
                                <Button
                                        variant='link'
                                        onClick={() => setNateOpen(!nateOpen)}
                                        aria-controls="example-collapse-text"
                                        aria-expanded={nateOpen}
                                    >
                                    <>
                                    { nateOpen ? 'Less' : 'More' } { nateOpen ? <FontAwesomeIcon icon={faArrowUp} /> : <FontAwesomeIcon icon={faArrowDown} /> }
                                    {}
                                    </> 
                                </Button>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={6}>
                    <Card className='nomad-card'>
                        <Card.Body>
                            <Image alt='Poornima Tyagi' fluid roundedCircle={true} src='/images/poornima.webp' />
                            <Card.Title>Poornima Tyagi</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Head of India</Card.Subtitle>
                            <div className='clearfix' />
                            <Card.Text>
                            Ms. Poornima Tyagi, a thorough finance professional with more than 15 years of banking experience. Poornima is a business management graduate with a core expertise in relationship management and busin{ team1Open ? '' : '...' }
                            <Collapse in={team1Open}>
                                <span>
                                ess development. She comes with rich working experience in global brands like Citi Financial, HSBC and also significantly contributed to Avanse Financial Services to build an education loan portfolio of $320M in a span of slightly over 4 years. While at Avanse, Poornima was the Channel & Strategy Head, managing +1,000 partnerships. Nomad Credit has positioned Ms. Poornima Tyagi as India Head to expand the business presence in the field of admissions consulting and student loans.
                                </span>
                            </Collapse>
                            <Button
                                variant='link'
                                onClick={() => setTeam1Open(!team1Open)}
                                aria-controls="example-collapse-text"
                                aria-expanded={team1Open}
                            >
                               <>
                               { team1Open ? 'Less' : 'More' } { team1Open ? <FontAwesomeIcon icon={faArrowUp} /> : <FontAwesomeIcon icon={faArrowDown} /> }
                               {}
                               </> 
                            </Button>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={6}>
                <Card className='nomad-card'>
                        <Card.Body>
                            <Image alt='Ganesh Sharma' fluid  roundedCircle={true} src='/images/ganesh.webp' />
                            <Card.Title>Ganesh Sharma</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">USA Loans Manager</Card.Subtitle>
                            <div className='clearfix' />
                            <Card.Text>
                            Mr. Ganesh Sharma comes with 12 years of business development experience. 8 years of his professional experience had been in the student loan space. Ganesh holds a Bachelor in Science from Pune Univer{ team2Open ? '' : '...' }
                            <Collapse in={team2Open}>
                                <span>
                                sity. Ganesh has been a top performing sales professional in his previous assignments at major financial institutions, including: HDFC Credila, Avanse, Incred and Shriram City. During the course of his career, Ganesh has garnered many accolades from industry leaders. Ganesh is recruited to lead the Nomad Credit USA cosigner student loan business in India.
                                </span>
                            </Collapse>
                            <Button
                                variant='link'
                                onClick={() => setTeam2Open(!team2Open)}
                                aria-controls="example-collapse-text"
                                aria-expanded={team2Open}
                            >
                                { team2Open ? 'Less' : 'More' } { team2Open ? <FontAwesomeIcon icon={faArrowUp} /> : <FontAwesomeIcon icon={faArrowDown} /> }
                            </Button>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
)
}
export const IstAdmissionsTeam = (props) => {
    let {title} = props;
    if(!title) title = "Our World-Class Admissions Experts Have Connections With The Top U.S. University Admissions Teams";
    const [team1Open, setTeam1Open] = useState(false);
    const [team2Open, setTeam2Open] = useState(false);
    const [team3Open, setTeam3Open] = useState(false);
    const [team4Open, setTeam4Open] = useState(false);
    const [team5Open, setTeam5Open] = useState(false);
    

    return(
        <Container fluid className={`section-block team ${props.className ? props.className : ''}`}>
            <Row className='three-col-row'> 
                <Col>
                    <h2>{title}</h2>
                </Col>
            </Row>
            <Row className='three-col-row'> 
                <Col xs={12} md={6}>
                    <Card className='nomad-card'>
                        <Card.Body>
                            {/*<Image fluid roundedCircle={true} src='https://placehold.co/100x100' />*/}
                            <Card.Title>Poonam Dhingreja </Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">(Team Lead Counselor)</Card.Subtitle>
                            <div className='clearfix' />
                            <Card.Text>
                            A seasoned Global Admissions Counselor with 14+ years of service industry experience, Poonam has guided over 3500 students to their dream universities and secured 100% success visas. By providing personalized guidance and nurtu{ team1Open ? '' : '...' }
                            <Collapse in={team1Open}>
                                <span>
                                ring each student's potential, Poonam ensures that their profiles are maximized for growth and success in countries like the USA, UK, Canada, Australia, and Ireland.
                                </span>
                            </Collapse>
                            <Button
                                variant='link'
                                onClick={() => setTeam1Open(!team1Open)}
                                aria-controls="example-collapse-text"
                                aria-expanded={team1Open}
                            >
                               <>
                               { team1Open ? 'Less' : 'More' } { team1Open ? <FontAwesomeIcon icon={faArrowUp} /> : <FontAwesomeIcon icon={faArrowDown} /> }
                               {}
                               </> 
                            </Button>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={6}>
                    <Card className='nomad-card'>
                        <Card.Body>
                            {/*<Image fluid  roundedCircle={true} src='https://placehold.co/100x100' />*/}
                            <Card.Title>Meghna Chhabra </Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">(Team Lead Counselor)</Card.Subtitle>
                            <div className='clearfix' />
                            <Card.Text>
                            Meghna leads our team of dedicated Admissions Counselors, Application Coordinators, and Admissions Assistants who assist students with the entire study abroad journey right from profile evaluation to{ team2Open ? '' : '...' }
                            <Collapse in={team2Open}>
                                <span>
                                &nbsp;pre-departure orientation.  With expertise in counseling and learning & development, Meghna brings a wealth of knowledge and a passion for empowering students to reach their long-term goals.
                                </span>
                            </Collapse>
                            <Button
                                variant='link'
                                onClick={() => setTeam2Open(!team2Open)}
                                aria-controls="example-collapse-text"
                                aria-expanded={team2Open}
                            >
                                { team2Open ? 'Less' : 'More' } { team2Open ? <FontAwesomeIcon icon={faArrowUp} /> : <FontAwesomeIcon icon={faArrowDown} /> }
                            </Button>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={4}>
                    <Card className='nomad-card'>
                        <Card.Body>
                            {/*<Image fluid  roundedCircle={true} src='https://placehold.co/100x100' />*/}
                            <Card.Title>Dharmesh Joshi  </Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">(Admissions Manager)</Card.Subtitle>
                            <div className='clearfix' />
                            <Card.Text>
                            Dharmesh has successfully guided more than 1200 students towards achieving their career goals in international education. Specializing in US universities, Dharmesh excels at assisting students in sel{ team3Open ? '' : '...' }
                            <Collapse in={team3Open}>
                                <span>
                                ecting institutions that align with their aspirations, providing unwavering support throughout the admissions process and ensuring a smooth student visa procurement. Dharmesh takes immense pride in empowering students to make informed choices and seize the unparalleled opportunity to study abroad.
                                </span>
                            </Collapse>
                            <Button
                                variant='link'
                                onClick={() => setTeam3Open(!team3Open)}
                                aria-controls="example-collapse-text"
                                aria-expanded={team3Open}
                            >
                                { team3Open ? 'Less' : 'More' } { team3Open ? <FontAwesomeIcon icon={faArrowUp} /> : <FontAwesomeIcon icon={faArrowDown} /> }
                            </Button>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={4}>
                    <Card className='nomad-card'>
                        <Card.Body>
                            {/*<Image fluid  roundedCircle={true} src='https://placehold.co/100x100' />*/}
                            <Card.Title>Sulekha Uniyal </Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">(Senior Counselor)</Card.Subtitle>
                            <div className='clearfix' />
                            <Card.Text>
                            Sulekha has dedicated herself to guiding and supporting students on their path to higher education. With a special focus on Europe (particularly Germany) and the United States, Sulekha accompanies stud{ team4Open ? '' : '...' }
                            <Collapse in={team4Open}>
                                <span>
                                ents through each step of the application process, addressing concerns and uncertainties, from document preparation to standardized tests, scholarships, and visa procedures.
                                </span>
                            </Collapse>
                            <Button
                                variant='link'
                                onClick={() => setTeam4Open(!team4Open)}
                                aria-controls="example-collapse-text"
                                aria-expanded={team4Open}
                            >
                                { team4Open ? 'Less' : 'More' } { team4Open ? <FontAwesomeIcon icon={faArrowUp} /> : <FontAwesomeIcon icon={faArrowDown} /> }
                            </Button>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={4}>
                    <Card className='nomad-card'>
                        <Card.Body>
                            {/*<Image fluid  roundedCircle={true} src='/images/poornima.webp' />*/}
                            <Card.Title>Poornima Tayagi</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">(Head of India)</Card.Subtitle>
                            <div className='clearfix' />
                            <Card.Text>
                            Poornima is a business management graduate with 15+ years of banking experience. 
                            She has rich working experience with global brands like CitiFinancial and HSBC. And she has helped build an education loan port{ team5Open ? '' : '...' }
                            <Collapse in={team5Open}>
                                <span>
                                folio of $320M to help international students finance their study abroad journeys.
                            
                                </span>
                            </Collapse>
                            <Button
                                variant='link'
                                onClick={() => setTeam5Open(!team5Open)}
                                aria-controls="example-collapse-text"
                                aria-expanded={team5Open}
                            >
                                { team5Open ? 'Less' : 'More' } { team5Open ? <FontAwesomeIcon icon={faArrowUp} /> : <FontAwesomeIcon icon={faArrowDown} /> }
                            </Button>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        )
}
export default  Team;