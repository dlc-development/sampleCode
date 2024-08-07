import React,{useEffect, useState} from 'react';
import { Container, Row, Col, Button, Modal, Card, Nav, Form} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faPencil, faLock } from '@fortawesome/free-solid-svg-icons';
import myDocsFormData from "./documents.json";
import '../../css/views/student-portal.scss';


const MyDocuments = (props) => {
    const [showTerms, setShowTerms] = useState(true);
    const [agreeTerms, setAgreeTerms] = useState(null);
    const [user_id, setUser_id] = useState(null);
    let thisUserId = null;


    let setThisShowTerms = (torf, agree, mydocsterms) => {
        if(mydocsterms){
            if(mydocsterms === 'true'){
                setShowTerms(false)
                setAgreeTerms(true);
            } else {
                setShowTerms(false)
                setAgreeTerms(false);
            }
        }else {
            // TODO: Add '/users/approve_docs' post request (no data needed)
            // Stored in database as users.approved_docs_upload
            // and users.approved_docs_upload_date.
            // NOTE: This is gated, of course.
            localStorage.setItem("mydocsterms", agree);
            setShowTerms(torf)
            setAgreeTerms(agree);
        }

    }
    const [uploadForm, setUploadForm] = useState('admissions')
    const [uploadedDocs, setUploadedDocs] = useState(null);

    useEffect(() => {
        fetch(`/whoami.php`)
            .then(response => response.json())
            .then(response => {
                if(!response.logged_in) window.location.href = '/sign-in?sign_in=true';
                thisUserId = response.id;
                setUser_id(response.id);

                fetch(`/nomadapi.php?order_id=/api/v1/mydocs&user_id=${thisUserId}`)
                    .then(response => response.json())
                    .then(response => {
                        response = response.data;
                        if(response && response.length){
                            setUploadedDocs(response);
                        }
                    })
                    .catch(error => {
                        console.log('error', ""+error);
                    });
            })
            .catch(error => {
                console.log('error', ""+error);
            });

        
        const mydocsterms = localStorage.getItem("mydocsterms");
        if (mydocsterms) setThisShowTerms(null, null, mydocsterms)
    }, []);


    return(
        <>
            <Modal show={showTerms}>
                <Modal.Header>Terms and Conditions</Modal.Header>
                <Modal.Body>
                    The secure and encrypted file upload feature enables Nomad Credit and our partners to find the products and services for your individual needs. By clicking "Agree", you agree to let Nomad Credit share any uploaded files to any one of our partners, for purposes of loan application and/or school admissions. Our lending partners are not responsible for the documents a student uploads to the site.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={()=> setThisShowTerms(false, true)}>Agree</Button>
                    <Button variant="danger" onClick={()=> setThisShowTerms(false, false)}>Disagree</Button>
                </Modal.Footer>
            </Modal>
            <div className='my-documents'>
            {/* If TERMS ARE AGREED TOO */}
                {agreeTerms ?
                    <Container className='section-block'>
                        <Row className='three-col-row'>
                            <Col xs={12}>
                                <h1>My Documents</h1>
                            <div className="new-feature">
                                    <h3><FontAwesomeIcon icon={faLock} /> Special Product Alert</h3>
                                        <p>Our lending and academic institution partners may require a minimum set of documents from the student to prove identification, test scores, residency, etc. These documents aid them in their decision-making process. Providing your documents may decrease the time it takes to get a decision. Please upload your documents for the product(s) you’re interested in Nomad’s help with. We'll ensure the partners that you may be a fit for receive them.
                                            <br />*Our lending partners are not responsible for the documents a student uploads to the site.</p>
                                </div>
                            </Col>
                        </Row>
                        <Row className='three-col-row'>
                            <Col xs={12}>
                                <Nav variant="tabs" defaultActiveKey="admissions">
                                    <Nav.Item>
                                        <Nav.Link onClick={() => setUploadForm('admissions')} eventKey="admissions">Admissions</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link onClick={() => setUploadForm('student_loan')} eventKey="loans">Student Loans</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                        </Row>
                        {Object.keys(myDocsFormData[uploadForm]).map((x,i) => {
                            let thisObj = myDocsFormData[uploadForm][x];
                            return(
                                <form key={i} id={x} onSubmit={e => {
                                    e.preventDefault();
                                    const formData = new FormData(e.target);
                                    if(formData.get('mydoc[name]') === 'Please Choose'){
                                        document.getElementById(x + ' names invalid').classList.remove('hidden');
                                        return;
                                    } else {
                                        document.getElementById(x + ' names invalid').classList.add('hidden');
                                    }

                                    fetch(`/uploadDoc.php`,
                                        {
                                            method: "POST",
                                            body: formData,
                                            // headers: {
                                            //     //'Accept': 'application/json',
                                            //     'Content-Type': 'enctype="multipart/form-data"'
                                            //   }
                                        })
                                        .then(response => response.json())
                                        .then(response =>
                                            {
                                                if(response.data){
                                                    response = JSON.parse(response.data);
                                                    //if(response.status === "created") window.location.href = '/my-documents?mydocs=true'
                                                    setUploadedDocs(null)
                                                    fetch(`/nomadapi.php?order_id=/api/v1/mydocs&user_id=${user_id}`)
                                                        .then(response => response.json())
                                                        .then(response => {
                                                            console.log('after upload',user_id, response)
                                                            response = response.data;
                                                            if(response && response.length){
                                                                setUploadedDocs(response);
                                                            }
                                                        })
                                                        .catch(error => {
                                                            console.log('error', ""+error);
                                                        });
                                                }
                                            }
                                        )
                                        .catch((error) => console.log(error));

                                }}>
                                    <Form.Control readOnly name='product_key' hidden type='text' value={uploadForm}  />
                                    <Form.Control readOnly name='mydoc[category]'  hidden type='text' value={x}  />
                                    <Row  className='three-col-row doc-upload-row'>

                                        <Col xs={12} md={2} className="title">{x} </Col>
                                        <Col xs={12} md={2}  className="description">{thisObj.description} </Col>
                                            <Col xs={12} md={2}>
                                                <Form.Select required id={x + ' select'} name='mydoc[name]'>
                                                    <option value="Please Choose">Please Choose</option>
                                                    {thisObj.names.map((x,i) => {
                                                        return( <option key={'option'+i}>{x}</option>)
                                                    })}
                                                </Form.Select>
                                                <label id={x + ' names invalid'} className={'hidden'} style={{color:'red'}}>Please choose</label>
                                            </Col>
                                            <Col xs={12} md={4}>
                                                <Form.Control required name='file' type="file" placeholder={x} /> </Col>
                                            <Col xs={12} md={2}>
                                                <Button  variant="primary" type="submit">
                                                    Upload
                                                </Button>
                                            </Col>
                                            <Form.Control type='text' value={user_id} name="user_id" className='hidden' />

                                    { uploadedDocs && uploadedDocs.length && uploadedDocs.filter(u => {return u.category === x}).length
                                    ?
                                        <Col xs={12} className="files">Uploaded File(s):&nbsp;
                                        {
                                            uploadedDocs.filter(u => {return u.category === x}).map((x, i) => {
                                                return <>{i !== 0 ? ', ' : ''}<a target="_blank" href={x.file_url}>{x.name + ': ' + x.file_file_name}</a></>
                                            })}
                                        </Col>
                                    : ''

                                    }
                                    </Row>
                                 </form>
                            )
                        })}

                </Container>
                // If TERMS ARE NOT AGREED TOO
                    :
                    <Container fluid className='section-block'>
                        <Row className='three-col-row'>
                            <Col xs={12}>
                                <p>You must agree to Terms and Conditions to upload docs:</p>
                                <Button onClick={()=> setShowTerms(true)}>Show Terms and Conditions</Button>
                            </Col>
                        </Row>
                    </Container>

                }
            </div>
        </>
    )
}
export default MyDocuments
