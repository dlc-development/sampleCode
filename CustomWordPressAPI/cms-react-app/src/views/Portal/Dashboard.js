import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Image,Card, Form} from 'react-bootstrap';
import '../../css/views/secondary.scss';
import '../../css/views/student-portal.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faPencil } from '@fortawesome/free-solid-svg-icons';

const Dashboard = (props) => {

    let loanOptions = 3;
    let welcomeMessage = 'Welcome Back!';
    let [loans, setLoans] = useState([]);
    let [admissions, setAdmissions] = useState([]);
    const [email, setEmail] = useState(false);
    const [user_id, setUser_id] = useState(false);
    let thisUserId= false;

    useEffect(() => {

        fetch(`/whoami.php`)
            .then(response => response.json())
            .then(response => {
                console.log('whoami', response)
                if(!response.logged_in) window.location.href = '/sign-in?sign_in=true';
                else {
                    setEmail(response.email);
                    setUser_id(response.id);
                    thisUserId = response.id;
                }

                fetch(`/nomadapi.php?order_id=/api/v1/users/applications/types&user_id=${thisUserId}`)
                    .then(response => response.json())
                    .then(response => {
                        console.log('applications', response)
                        response = response.data;
                        setLoans(response.filter(x => x.application_type === "student_loan"))
                        setAdmissions(response.filter(x => x.application_type === "admissions"));
                    })
                    .catch(error => {
                        console.log('error', ""+error);
                    });
            })
            .catch(error => {
                console.log('error', ""+error);
            });

        

    
        
    }, []);

    return(
        <div className='dashboard'>
            <Container fluid className='section-block'>
                <Row className='three-col-row'>
                    <Col xs={12} md={8}>
                        <div className="welcome-panel">
                            <h3>{welcomeMessage}</h3>
                            <h2>{loans.length ? `You Have 1 or more Student Loan Options Available!` : ''}</h2>
                            <p className='mb-5'>Please view your potential student loan options.</p>
                            <Row>
                                <Col xs={12} md={6}>
                                    <Image fluid src='/wp-content/uploads/images/portal/student_loans.png' style={{maxHeight:'200px', display:'block', margin:'auto'}} />
                                </Col>
                                <Col xs={12} md={6}>
                                    <h3>{loans.length ? `1 or more options available` : ''} </h3>
                                    {loans.length > 0 ? <Button style={{color:'white'}} variant="outline-light" className='extra-pad mt-3' href={"/offers?offers=true&id="+loans[0].id+`&user_id=${user_id}`}>View Now <FontAwesomeIcon icon={faArrowRight} /> </Button> : ''}
                                    
                                </Col>
                            </Row>
                            <div style={{padding:'10px', width:'100%', height:'60px' ,color:'white'}}>
                                {loans && loans.length ? <Button style={{color:'white'}} variant="outline-light" className='extra-pad edit-pencil' href={"/edit?edit=true&id="+loans[0].id+`&user_id=${user_id}`}>Edit <FontAwesomeIcon icon={faPencil} /> </Button> : <Button style={{color:'white'}} variant="outline-light" className='extra-pad mt-3' href={`/new?new=true&type=student_loan&email=${email}&user_id=${user_id}`}>Start <FontAwesomeIcon icon={faArrowRight} /> </Button> }
                                
                            </div>
                        </div>
                        
                        
                        
                       
                    </Col>
                    <Col xs={12} md={4} className="admissions-panel">
                        <h3>Admissions</h3>
                        <p>Find the school options for the education that you need.</p>
                        <Image fluid src='/wp-content/uploads/images/portal/accepted.png' style={{maxHeight:'200px', display:'block', margin:'auto'}} />
                        {admissions.length ? <Button className='extra-pad view-now mt-3' href={"/offers?offers=true&id="+admissions[0].id+`&user_id=${user_id}`}>View Now <FontAwesomeIcon icon={faArrowRight} /> </Button> : ''}
                        {admissions && admissions.length ? <Button className='extra-pad edit-pencil mt-3' href={`/edit?edit=true&id=` + admissions[0].id+`&user_id=${user_id}`}>Edit <FontAwesomeIcon icon={faPencil} /> </Button> :
                         <Button className='extra-pad edit-pencil mt-3' href={`/new?new=true&type=admissions&user_id=${user_id}`}>New <FontAwesomeIcon icon={faPencil} /> </Button>
                        }
                        
                    </Col> 
                </Row>
                <Row className='three-col-row mt-5'>
                    <Col xs={12} className="docs-panel">
                        <Row>
                            <Col xs={12} md={3}>
                                
                                <Button className='extra-pad edit-pencil mt-3' href='/my-documents?mydocs=true'>Add my docs </Button>
                                <Image fluid src='/wp-content/uploads/images/portal/3-layers.png' style={{margin:'20px 0 0 20px'}} />
                            </Col>
                            <Col xs={12} md={9}>
                                <p  style={{margin:'20px 0 20px 20px'}}>
                                    Providing your documents may decrease the time it takes to get a decision. Please upload your documents for the product(s) you’re interested in.
                                </p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default Dashboard