import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import {LoanLandingForm, LoanBottomForm} from '../../components/Forms';
import '../../css/views/secondary.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
 
const StudentLoansLandingAvanse = (props) => {

    return(

        <>
            <Container fluid className='secondary-hero section-block  position-relative'>
                
                <Row className='three-col-row'>
                    <Col>
                        <h1 className='hero-header'>Help Fund your Study Abroad Education with Nomad Credit and Avanse Financial Services</h1>
                        <p>Nomad Credit prides itself on making study abroad a pain-free process by helping international students find education loan options that best benefit them. The education loan process can be confusing for many, as it’s difficult to understand if a cosigner or collateral is needed for your specific journey. To combat these issues, Nomad Credit has partnered with Avanse Financial Services to help students find the best loan options for their unique needs. Don't let financing hold you back from pursuing your dreams of studying abroad. Let Nomad Credit and Avanse help you find the best loan options!</p>
                        <p></p>
                        
                        <Image width={293} height={291} fluid className='mt-5 display-mobile' src={`/images/how-it-works.webp`} />
                    </Col>
                </Row>
                <Row className='mt-5 mb-5'>
                    <Col md={{span:10, offset:1}}>
                        <LoanLandingForm  landingName="/student-loans-landing-avanse" />
                    </Col>
                </Row>
                <Row className='mt-5 three-col-row'>
                    <Col xs={12}><h2 className='mt-5 mb-5 text-center'>How Does an Avanse Education Loan Benefit Me?</h2></Col>
                    <Col xs={12} md={6}>
                    
                        <p><strong>Quality Help from A Trusted Leader in the Industry</strong>
                            <ul>
                                <li>Avanse has helped 400,000++ study abroad students realize their academic aspirations in 4,000+ institutions across 50+ countries</li>
                                <li>
                                Financial solutions provided can cover up to 100% of your cost of education
                                </li>
                            </ul>
                        </p>
                        <p><strong>Loan Assistance Catered to Your Specific Study Abroad Journey</strong>
                            <ul>
                                <li>Avanse offers education loans without collateral and with collateral, depending on your student loan requirements.</li>
                                <li>
                                If you need help with your education loan, Avanse will send an executive to help you get through the paperwork
                                </li>
                            </ul>
                        </p>
                        <p><strong>Straightforward Process with No Hassle</strong>
                            <ul>
                                <li>With a fast-track student loan application, you can get the funds within 3 working days</li>
                                <li>
                                You decide how and when you’d like to pay your loan back - You don’t have to make any payments until after you complete your course or secure employment
                                </li>
                            </ul>
                        </p>
                        <p><strong>Free Assistance from Nomad Credit</strong>
                            <ul>
                                <li>Nomad Credit will assist you in your entire loan process completely free of charge</li>
                            </ul>
                        </p>
                        


                        <Image width={578} height={436} fluid className='mt-5 display-desktop' src={`/images/how-it-works.webp`} />
                    </Col>
                    <Col >
                        <p><strong>Avanse Education Loan Features At a Glance</strong>
                        
                        </p>
                        <div >
                            <table >
                                <thead>
                                    <th>Feature</th>
                                    <th>Detail</th>
                                </thead>
                                <tbody>
                                <tr><td>	Loan Amount	</td><td>	100% COA	</td></tr>
                                <tr><td>	Interest Rate	</td><td>	10.75% onwards	</td></tr>
                                <tr><td>	Interest Rate Type	</td><td>	Floating	</td></tr>
                                <tr><td>	Minimum Income	</td><td>	Not Required	</td></tr>
                                <tr><td>	Repayment	</td><td>	Options for partial or full interest payments or EMI during the course, EMI afterward - 6 month grace period after graduation or 3 months from the time you secure your first job<br />(Grace Period up to 12 months as applicable)	</td></tr>
                                <tr><td>	Processing Fees	</td><td>	around 1-2% of your total loan amount	</td></tr>
                                <tr><td>	Other Charges	</td><td>	No upfront charges	</td></tr>
                                <tr><td>	Margin Money	</td><td>	0	</td></tr>
                                <tr><td>	Loan Tenure	</td><td>	Up to 15 years	</td></tr>
                                <tr><td>	Processing Time	</td><td>	As quick as 3 days	</td></tr>
                                <tr><td>	Repayment Penalty	</td><td>	No Penalty	</td></tr>
                                </tbody>
                                
                            </table>
                            </div>
                    </Col>
                    
                </Row>
                
                <Image className='secondary-hero-city' src={`/images/admission-hero-city.webp`}/>
            </Container>
            <Container>
            <Row className='mt-5 three-col-row'>
                <Col xs={12}>
                    <h2 className='mt-5 text-center'>Am I Eligible for an Avanse Financial Services Education Loan? </h2>
                    <h3 className='text-center'>
                    Please complete our loan option search to see if you  may be eligible!  </h3>
                        <Button className='extra-pad mt-5 mb-5 mx-auto' style={{display:'block', width:'fit-content'}} href='#mainForm'>Start your Search Now! <FontAwesomeIcon icon={faArrowRight} /> </Button>
                    <p>
                        <strong>Students can apply if they:</strong>
                        <ul>
                            <li>	Are Indian citizens who are 18 or older	</li>
                            <li>	Have a confirmed admission before the final disbursal	</li>
                            <li>	Have a co-borrower who earns in India	</li>
                        </ul>
                    </p>

                    <p>
                        <strong>Co-borrowers also need to meet the following criteria:</strong>
                        <ul>
                            <li>	Must be an Indian citizen and should be a parent, legal guardian, sibling or other blood relative	</li>
                            <li>	Must have a bank account in India that allows them to sign checks	</li>
                            <li>	Must be the primary debtor	</li>
                        </ul>
                    </p>
                    <p>
                        Students can apply for a study abroad education loan for graduate or post-graduate courses or other job-oriented professional or technical courses. The courses and the institute offering them must be approved by Avanse.
                    </p>
                        
                </Col>
            </Row>
            </Container>
            <Container style={{fontSize:'large', textAlign:'center'}} className='section-block'>
                <Row>
                    <Col sm={12} md={4}><Image src='/images/prodigy/prodigy-interest-rate.webp' alt='interest rate sign' /><h2>Interest Rate</h2><p>10.75% onwards</p></Col>
                    <Col sm={12}  md={4}><Image src='/images/prodigy/prodigy-processing-fees.webp' alt='processing fees' /><h2>Processing Fees</h2><p>around 1-2% <br /><small>of your total loan amount</small></p></Col>
                    <Col  sm={12}  md={4}><Image src='/images/prodigy/prodigy-loan-margin.webp' alt='loan margin' /><h2>Margin Money</h2><p>0%</p></Col>
                </Row>
            </Container>
            {/* <Testimonials /> */}
            <Container fluid className='easy-process-section section-block prodigy-how' style={{paddingTop:'20px', paddingBottom:'20px'}}>
                <Row className='three-col-row pt-5 pb-5'>
                    <Col xs={12} md={6}>
                        <Image width={578} height={550} fluid src={`/images/prodigy/why-choose-prodigy.webp`} />
                    </Col> 
                    <Col xs={12} md={6}>
                        <h2 className='mt-5 mb-5'>What Are My Next Steps?</h2>

                        <ol>
                            <li>	Get started by registering your interest and telling us more about your study plans. Nomad Credit will help you get everything ready so that applying for funding is effortless.	</li>
                            <li>	Send us the required documents needed to process your loan option and Nomad will organize and send your file to Avanse	</li>
                            <li>	A Nomad Education Loan Manager will provide you updates of when your loan is successfully logged in and sanctioned	</li>
                            <li>	Pay any necessary sanction fees and await disbursement	</li>
                            <li>	Study first, pay later with Avanse's flexible repayment options.	</li>
                        </ol>

                        
                        <Button variant="outline-light" className='extra-pad mt-3 mb-2' href='#mainForm'>See Your Options <FontAwesomeIcon icon={faArrowRight} /> </Button>
                    </Col>
                    
                </Row>
            </Container>
            
            <Container fluid className='pt-5  section-block required-docs' style={{backgroundColor:'#e9e9e9'}}>
                <Row className='pt-5'> 
                    
                    <Col xs={{offset:0, span:12}} md={{offset:2, span:8}}>
                        <Image style={{display:'block', margin:'auto', marginBottom:'20px'}} src='/images/prodigy/prodigy-doc-reqs.webp' alt="Required Document Image" />
                        <h2 style={{textAlign:'center'}}>What Documents Do I Need?</h2>
                        <p  style={{textAlign:'center'}}>
                            There are quite a few documents that are required to   process your Avanse education loan. To ensure a speedy process, it’s best to prepare all your documents early on.
                        </p>
                        <p>
                            To complete your application for an Avanse education loan, you will have to provide the following documents:
                        </p>
                        
                        <ol>
                            <li>	Application Form	</li>
                            <li>	Student KYC and educational documents	</li>
                            <li>	Details regarding the course and fees	</li>
                            <li>	Co-borrower KYC and income details	</li>
                            <li>	Collateral documents  (As applicable)</li>
                        </ol>

                        <p>
                            Here are the list of documents required by Avanse Financial Services for their study abroad education loans:
                        </p>
                        <div className='table-responsive'>
                            <table className='table'>
                                <thead>
                                    <th>	Documents	</th>
                                    <th>	Applicant	</th>
                                    <th>	Co-Applicant	</th>
                                    <th>	Additional Co-Applicant	</th>
                                    <th>	Guarantor	</th>
                                </thead>
                                <tbody>
                                    <tr><td>	2 Colour Passport-sized Photos	</td><td>	X	</td><td>	X	</td><td>	X	</td><td>	X	</td></tr>
                                    <tr><td>	Photo ID	</td><td>	X	</td><td>	X	</td><td>	X	</td><td>	X	</td></tr>
                                    <tr><td>	Residence Proof	</td><td>	X	</td><td>	X	</td><td>	X	</td><td>	X	</td></tr>
                                    <tr><td>	Date of Birth Proof	</td><td>	X	</td><td>	X	</td><td>	X	</td><td>	X	</td></tr>
                                    <tr><td>	Signature Verification	</td><td>	X	</td><td>	X	</td><td>	X	</td><td>	X	</td></tr>
                                    <tr><td>	Academic Documents	</td><td>	X	</td><td>		</td><td>		</td><td>		</td></tr>
                                    <tr><td>	Proof of Admission	</td><td>	X	</td><td>		</td><td>		</td><td>		</td></tr>
                                    <tr><td>	Fee Structure	</td><td>	X	</td><td>		</td><td>		</td><td>		</td></tr>
                                    <tr><td>	Income Proof	</td><td>		</td><td>	X	</td><td>	X	</td><td>	X	</td></tr>
                                    <tr><td>	Collateral Documents	</td><td>		</td><td>	X	</td><td>	X	</td><td>	X	</td></tr>
                                    <tr><td>	8-month Bank Statement	</td><td>		</td><td>	X	</td><td>	X	</td><td>		</td></tr>
                                    <tr><td>	Relationship Proof	</td><td>		</td><td>	X	</td><td>	X	</td><td>		</td></tr>
                                </tbody>
                                
                            </table>
                        </div>
                        {/* <Button variant="outline-primary" className='extra-pad' href='#mainForm'>Get Started  <FontAwesomeIcon icon={faArrowRight} /></Button> */}
                    </Col>
                </Row>
            </Container>
            <Container fluid className='pt-5 section-block prodigy-faq' >
                <Row className='pt-5'> 
                    
                    <Col xs={{offset:0, span:12}} md={{offset:2, span:8}}>
                        <Image style={{display:'block', margin:'auto', marginBottom:'20px'}} src='/images/prodigy/prodigy-faqs.webp' alt="FAQs" />
                       

                        <h2 style={{textAlign:'center', marginBottom:'20px'}}>Frequently Asked Questions</h2>
                        <p>Please see some of Avanse’s FAQ’s below. For a full list of FAQ’s, please visit <a href='https://www.avanse.com/faqs' target='_blank'>here</a></p>
                        <h3>What costs will the Avanse study abroad education loan help cover?</h3>
                        <p>Our education loans will cover:</p>
                        <ul>
                            <li>	Up to 100% of the tuition fee as decided by the university or institute	</li>
                            <li>	Up to 100% living expenses	</li>
                            {/* <li>	Up to 75% of your living expenses, including the purchase of books, computers and other equipment, as long as it does not exceed 20% of the tuition fee	</li>
                            <li>	Up to 100% of the building fund or caution deposit or refundable deposit as long as it does not exceed 10% of the tuition fee and comes with valid bills or receipts from the institution	</li>
                            <li>	Travel expenses or passage money up to INR 75,000 for students traveling abroad	</li> */}
                        </ul>
                        <h3 className='mt-5'>What is the maximum education loan amount I can take from Avanse?</h3>
                        <p>You can opt for a minimum loan amount of INR 500000 and Max loan amount depend on Country, college, course, students academic background and parents financial. If you'd like to understand the maximum loan amount you can opt for, you can use our Education Loan Eligibility Calculator.</p>
                        
                        <h3 className='mt-5'>Do I have to provide collateral to secure a study abroad education loan?</h3>
                        <p>At Avanse, we offer both secured and unsecured loans. If you do not have collateral, that's fine, we'll still provide you with a study abroad education loan.</p>

                        <h3 className='mt-5'>I do not have a very consistent academic record, but I have a secured seat at a reputed university. Can I still apply for a loan?</h3>
                        <p>Your academic record isn't the only criteria we look at, so you could still get the loan you need.</p>

                        <h3 className='mt-5'>Will my interest rate remain the same through the loan tenure?</h3>
                        <p>At Avanse, we offer floating interest rates, so your education loan interest rate may go up or down depending on the economic conditions and our company policies.</p>
                        
                        
                    </Col>
                </Row>
            </Container>
            
            <LoanBottomForm landingName="/student-loans-landing-avanse" />
            <Container fluid className='pt-5 section-block prodigy-terms' >
                <Row className='pt-5'> 
                    <Col  xs={{offset:0, span:12}} md={{offset:3, span:6}}>
                    <h4>Terms and conditions</h4>
                    <p>To see Avanse Financial Services LTD’s full terms and conditions, please visit <a target="_blank" href="https://www.avanse.com/terms-conditions">click here.</a></p> 
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default StudentLoansLandingAvanse