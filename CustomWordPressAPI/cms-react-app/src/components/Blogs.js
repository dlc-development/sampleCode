// import { Button, Container, Row, Col,Card} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import '../css/components/blogs.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Blogs = (props) => {
    return(
        <Container fluid className='blogs-section pt-5 pb-5'>
                <Row> 
                    <Col>
                        <h2>Blog Articles and News</h2>
                    </Col>
                </Row>
                <Row className='mb-5 three-col-row'> 
                    <Col xs={12} md={4}>
                        <Card>
                            <LazyLoadImage className='img-fluid' alt='International Student Graduating' width="337" height="224" variant="top" src="/images/Potential-Loan-options.webp" />
                            <Card.Body>
                                <Card.Title>Nomad Credit Potential Loan Options for your Admissions Journey</Card.Title>
                                <Card.Text>
                                    Evaluating loan options is very important for many students in their journey to study abroad...
                                </Card.Text>
                                <Button variant="link" href='https://blog.nomadcredit.com/nomad-credit-potential-loan-options-for-your-admissions-journey/' target='_blank'>Read More <FontAwesomeIcon icon={faArrowRight} /></Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={4}>
                    <Card>
                        <LazyLoadImage className='img-fluid' alt='Get International Student Loans with the help of Nomad Credit' width="337" height="224" variant="top" src="/images/Basics-of-Interest.webp" />
                            <Card.Body>
                                <Card.Title>Understanding the Basics of Interest Rates for International Student Loans</Card.Title>
                                <Card.Text>
                                    Understanding international student loans and everything they entail can be a very difficult task...
                                </Card.Text>
                                <Button variant="link" href="https://blog.nomadcredit.com/understanding-the-basics-of-interest-rates-for-international-student-loans/"  target='_blank'>Read More <FontAwesomeIcon icon={faArrowRight} /></Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={4}>
                    <Card>
                        <LazyLoadImage className='img-fluid' alt='Get help finding a U.S. Cosigner with Nomad Credit' width="337" height="224" variant="top" src="/images/Find-US-Cosigner.webp" />
                            <Card.Body>
                                <Card.Title>How to Find a United States Cosigner as an International Student</Card.Title>
                                <Card.Text>
                                    If you are an international student interested in studying abroad in the United States, sometimes the most difficult aspect is figuring out how to pay for your education...
                                </Card.Text>
                                <Button variant="link" href="https://blog.nomadcredit.com/how-to-find-a-united-states-cosigner-as-an-international-student/" target='_blank'>Read More <FontAwesomeIcon icon={faArrowRight} /></Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
    )
}

export default Blogs;