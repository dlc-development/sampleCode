import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import {LoanLandingForm, LoanBottomForm} from '../../components/Forms';
import '../../css/views/secondary.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
// import windowSize from '../helpers/window-size.js';
 
const StudentLoansLandingProdigy = (props) => {
    // const imgSize = windowSize();
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString);
    const thankYou = urlParams.get('thankYou');
    if(thankYou){
        return(
            <Container fluid className='section-block'>
                
                <Row className='three-col-row'>
                    <Col>
                        <h1 className='hero-header'>Thank You</h1>
                        <p>We will be in touch soon. In the meantime, you may finish setting up your NomadCredit.com account using the email we sent you.</p>
                    </Col>
                </Row>
            </Container>
        )
    }

    return(

        <>
            <Container fluid className='secondary-hero section-block  position-relative'>
                
                <Row className='three-col-row'>
                    <Col>
                        <h1 className='hero-header'> Fund your Study Abroad Education with a Prodigy Finance Loan</h1>
                        <p>Are you ready to take the leap and embark on a life-changing study abroad adventure? Get started today and compare options in minutes!</p>
                        <p></p>
                        {/* <Button className='extra-pad display-desktop' size='lg' href='#mainForm'>Get Started <FontAwesomeIcon icon={faArrowRight} /></Button>
                        <Button className='extra-pad display-mobile' size='lg' href='#secondaryForm'>Get Started <FontAwesomeIcon icon={faArrowRight} /></Button> */}
                        <Image width={293} height={291} fluid className='mt-5 display-mobile' src={`/images/how-it-works.webp`} />
                    </Col>
                </Row>
                <Row className='mt-5 three-col-row'>
                    
                    <Col xs={12} md={6}>
                    <h2 className='mt-5'>Build your Future </h2>
                        <p>
                        Prodigy Finance offers flexible international student loans based on your future potential, without the need for collateral or a co-signer. And now, Nomad Credit has partnered with Prodigy Finance to help you find the best student loan for your unique needs.</p>
                        <p>
                        Don't let financing hold you back from pursuing your dreams of studying abroad. Let Nomad Credit and Prodigy Finance help you find the perfect loan for your future potential. Fill out the brief questionnaire to get started today.</p>


                        <Image width={578} height={436} fluid className='mt-5 display-desktop' src={`/images/how-it-works.webp`} />
                    </Col>
                    <Col >
                        <LoanLandingForm  landingName="student-loans-landing-prodigy"Frequir />
                    </Col>
                    
                </Row>
                <Image className='secondary-hero-city' src={`/images/admission-hero-city.webp`}/>
            </Container>
            <Container style={{fontSize:'large', textAlign:'center'}} className='section-block'>
                <Row>
                    <Col><Image src='/images/prodigy/prodigy-interest-rate.webp' alt='interest rate sign' /><h2>Interest Rate</h2><p>Starting at 11.06%</p></Col>
                    <Col><Image src='/images/prodigy/prodigy-processing-fees.webp' alt='processing fees' /><h2>Processing Fees</h2><p>2.5% - 4% Range</p></Col>
                    <Col><Image src='/images/prodigy/prodigy-loan-margin.webp' alt='loan margin' /><h2>Loan Margin</h2><p>0%</p></Col>
                </Row>
            </Container>
            {/* <Testimonials /> */}
            <Container fluid className='easy-process-section section-block' style={{paddingTop:'20px', paddingBottom:'20px'}}>
                <Row className='three-col-row'>
                    <Col xs={12} md={6}>
                        <Image width={578} height={550} fluid src={`/images/loans-landing-get-advice.webp`} />
                    </Col> 
                    <Col xs={12} md={6}>
                        <h2 className='mt-5 mb-5'>How it Works </h2>

                        <ol>
                            <li>Get started by filling out a short questionaire and telling us more about your study plans. Nomad Credit will help you get everything ready so that applying for funding is effortless.</li>
                            <li>Apply for funding and receive a customized quote from Prodigy Finance in exchange for some additional details about your plans. If you're still deciding where to study, you can apply to each school and compare offers.</li>
                            <li>Upload your documents to Prodigy Finance's secure platform.</li>
                            <li>Finalize your loan and sign on the dotted line.</li>
                            <li>Study first, pay later with Prodigy Finance's flexible repayment options.</li>

                        </ol>

                        
                        <Button variant="outline-light" className='extra-pad mt-3 mb-2' href='#mainForm'>See Your Options <FontAwesomeIcon icon={faArrowRight} /> </Button>
                    </Col>
                    
                </Row>
            </Container>
            <Container fluid className='guidance-section pt-5'>
                <Row className='pt-5'> 
                    
                    <Col md={{offset:1}}>
                        <h2>Why Choose Prodigy Finance?</h2>
                        <p>Prodigy Finance has provided loans to over 30,000 students from 150 countries, at over 1,100 schools around the world since 2007.</p>
                        <p>They offer student loans without any collateral or co-applicant require- ments and at competitive interest rates, making it easier than ever for international students to fund their education. By addressing the limita- tions posed by domestic restrictions, Prodigy Finance is bridging the gap in education financing.</p>
                        <p>What sets Prodigy Finance apart is its ability to provide loans in USD or EUR, catering specifically to the needs of international students. Plus, the entire application process for Prodigy Finance is conducted online, ensur- ing a smooth and hassle-free experience.</p>
                        <h2 className='pt-5'>Why Choose Nomad Credit?</h2>
                        <p>Nomad Credit helps international students find the best student loans for their unique needs by partnering with top lenders like Prodigy Fi- nance. We strive to make the process of searching for student loans as simple and transparent as possible. Our team of experts is here to help you every step of the way with no additional cost to you!</p>
                        
                        <Button variant="outline-light" className='extra-pad' href='#mainForm'>Get Started  <FontAwesomeIcon icon={faArrowRight} /></Button>
                    </Col>
                    <Col className='center-spacer' md={1} />
                    <Col className='guidance-image'>
                        <Image src='/images/guidance.webp' />
                    </Col>
                    <Col className='spacer' md={1} />
                </Row>
            </Container>
            <Container fluid className='pt-5  section-block required-docs' style={{backgroundColor:'#e9e9e9'}}>
                <Row className='pt-5'> 
                    
                    <Col xs={{offset:0, span:12}} md={{offset:2, span:8}}>
                        <Image style={{display:'block', margin:'auto', marginBottom:'20px'}} src='/images/prodigy/prodigy-doc-reqs.webp' alt="Required Document Image" />
                        <h2 style={{textAlign:'center'}}>Required Documents</h2>
                        <p  style={{textAlign:'center'}}>There are quite a few documents that we require from you - some will need to be uploaded when you apply for your loan, while others may only be needed later. However, as the loan approval process is speedy, it’s best to get everything together from the beginning.</p>
                        <ol>
                            <li><strong>Proof of Identity</strong> - a passport, driver's license, or government issued identification document.</li>
                            <li><strong>Proof of Address</strong> - a water bill, electricity bill, bank document, rent agreement, etc.</li>
                            <li><strong>Proof of Admission</strong> - a letter from your school confirming that you've been accepted into your program or an email from your school confirming your admission.</li>
                            <li><strong>Credit Report</strong></li>
                            <li><strong>Proof of Income</strong> (if applicable)</li>
                            <li><strong>Proof of Savings</strong> (if applicable)</li>
                            <li><strong>Proof of Scholarships or Company Sponsorship</strong> (if applicable)</li>
                        </ol>
                        
                        <Button variant="outline-primary" className='extra-pad' href='#mainForm'>Get Started  <FontAwesomeIcon icon={faArrowRight} /></Button>
                    </Col>
                </Row>
            </Container>
            <Container fluid className='pt-5 section-block prodigy-faq' >
                <Row className='pt-5'> 
                    
                    <Col xs={{offset:0, span:12}} md={{offset:2, span:8}}>
                        <Image style={{display:'block', margin:'auto', marginBottom:'20px'}} src='/images/prodigy/prodigy-faqs.webp' alt="FAQs" />
                        <h2 style={{textAlign:'center', marginBottom:'20px'}}>Frequently Asked Questions</h2>
                        <h3>Can I change my student loan amount after accepting my conditional offer?</h3>
                        <p>You can change your loan amount after you’ve received and accepted conditional approval from us.</p>
                        <ul>
                            <li><strong>Reducing your loan amount</strong> <br />
                            You can reduce your Prodigy Finance loan amount any time before you sign the final loan agreement, which happens when you arrive on campus for the start of class. And, the administration fee will also be reduced accordingly.</li>
                            <li><strong>Increasing your loan amount</strong> <br />
                            You may also request an increase in your Prodigy Finance loan amount; however, it isn’t guaranteed. Our the Prodigy Finance committee will need to approve your new loan amount. Keep in mind that the associated admin fee will also increase.</li>
                        </ul>
                        <h3 className='mt-5'>How do Prodigy Finance loan interest rates work?</h3>
                        <p>There are 3 different types of interest rates that apply to your Prodigy loan. But, it’s critical that while they all apply, they’re not separate interest rates; they’re different ways of looking at your interest costs.</p>
                        <ul>
                        <li><strong>Simple interest rate</strong> <br />
                            This is the interest rate you receive for your loan, plus the Euribor / Libor base rate, which varies every 3 months. For example, if you receive a loan offer of €40 000 at 7.2%, and the 3 month Euribor is 0.12%, your simple interest rate is 7.32% (7.2% + 0.12%). One twelfth (1/12) of this is added to your account balance at the end of each month.</li>
                        <li><strong>Annual effective interest rate</strong> <br />
                        The effective interest rate (EIR) also includes the effect of compounding during your study and grace periods (where you aren’t making payments). For this example, the EIR is 7.62%.</li>
                        <li><strong>APR (annual percentage rate)</strong> <br />
                        While the EIR takes the effect of compounding into account, the APR also takes all fees associated with your loan (ie, administration fees) into account. For this example, the APR of your Prodigy loan would be 8.09%.</li>
                        </ul>
                        <p>Students who are considering different loan options should use the APR for the purposes of comparison.</p>


                        <h3 className='mt-5'>When do the funds get disbursed?</h3>
                        <p>Disbursement dates of Prodigy Finance loans vary from school to school. And, you can rest assured that Prodigy Finance is in continuous communication with every school, and we have agreements in place that allow students to defer payment until the date on which the funds are disbursed. Please note that Prodigy Finance loans cannot be used to pay any acceptance deposits or reservation fees required to secure your place at your school.</p>


                        <h3 className='mt-5'>What can I use the funds for?</h3>
                        <p>Some schools allow funds to be used for living expenses as well as tuition fees. If your loan includes living expenses, we will send all funds to your school. Once tuition fees are paid the school will then transfer living expense funds to you directly. In this case, it is best to reach out to your school's Financial Aid Office to coordinate the times and dates.</p>


                        <h3 className='mt-5'>How long does it take for my funds to reach my school?</h3>
                        <p>Once you have signed your loan agreement and Prodigy Finance has released your funds, it takes between 3 to 5 business days for the funds to arrive in your school’s account.</p>
                        <p>You'll need to allow a few extra days to give your school's admin department the opportunity to allocate our payment to your student account.</p>

                        <h3 className='mt-5'>What happens if I repay my loan early?</h3>
                        <p>You don’t need to make any repayments during the grace period (which lasts for six months after you graduate). However, there are no charges or penalties if you do decide to make early repayments or settle your loan early. Want to start repaying your loan while you’re still studying? No worries there either.</p>
                        
                    </Col>
                </Row>
            </Container>
            {/* <ScheduleNowBanner /> */}
            {/* <Container fluid className={`section-block student-loan-options`}>
            <Row> 
                    <Col md={{offset:1}}>
                        <h2>Student Loan Options</h2>
                    </Col>
                    <Col className='spacer' md={1} />
                </Row>
                <Row className='three-col-row'> 
                    <Col className='mb-5' xs={12} md={4}>
                        <Card className='nomad-card'>
                            <Card.Body>
                                <Card.Title><h3>U.S. Cosigner</h3><hr /></Card.Title>
                                
                                <Card.Text as='div'>
                                A US Cosigner loan option often sees lower interest rates than other loan options, but it does require a US citizen or permanent resident as a cosigner.
                                <ul>
                                    <li>Potentially save thousands on your loan repayment</li>
                                    <li>May defer payment up to six to nine months after graduation  </li>
                                    <li>Can cover up to 100% of cost of attendance</li>

                                </ul>
                                <div className='btn-wrapper'>
                                    <Button size='lg' variant='outline-primary' href='#secondaryForm'>Find Options</Button>
                                </div>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className='mb-5'  xs={12} md={4}>
                        <Card className='nomad-card' >
                            <Card.Body>
                                <Card.Title><h3>No Cosigner</h3> <hr /></Card.Title>
                                <Card.Text as='div'>
                                No Cosigner loan options are a great choice for students enrolled in qualifying programs at most top schools in USA, Canada and the world, and offer competitive interest rates and potentially deferred payments. 
                                <ul>
                                    <li>No cosigner or collateral needed </li>
                                    <li>Flexible repayment terms, including no in-school payment options</li>
                                    <li>Limited to graduate students or 3rd/4th year undergraduate students</li>
                                </ul>
                                <div className='btn-wrapper'>
                                    <Button size='lg' variant='outline-primary' href='#mainForm'>Find Options</Button>
                                </div>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className='mb-5'  xs={12} md={4}>
                        <Card className='nomad-card'>
                            <Card.Body>
                                <Card.Title><h3>India Cosigner</h3><hr /></Card.Title>
                                <Card.Text as='div'>
                                Nomad Credit is partnered with leading Indian lenders and banks and can help you search from a wide range of competitive potential loan options. 
                                <ul>
                                    <li>Cosigner and/or collateral is required </li>
                                    <li>Loan can be taken for the entire academic period of study, not limited to one academic year </li>
                                    <li>Pre visa disbursement options may be available </li>
                                </ul>
                                <div className='btn-wrapper'>
                                    <Button size='lg' variant='outline-primary' href='#mainForm'>Find Options</Button>
                                </div>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container> */}
            <LoanBottomForm landingName="student-loans-landing-prodigy" />
            <Container fluid className='pt-5 section-block prodigy-terms' >
                <Row className='pt-5'> 
                    
                    <Col  xs={{offset:0, span:12}} md={{offset:3, span:6}}>
                    <h4>Terms and conditions</h4>
                    <p>11.06% is the minimum possible Annual Percentage Rate you could be offered. This APR assumes a 4.98% fixed margin rate, a 4.89%* variable base rate (3-month CME Term SOFR as of 6 April 2023), and a 5% administration fee. The actual rate offered will depend on your circumstances, loan amount and term, and may differ from the minimum and/or the average representative APR shown in our representative example above. The average APR for student loans is 14.96%. To qualify, borrowers must meet Prodigy Finance eligibility and underwriting requirements. Prodigy Finance reserves the right to vary or discontinue its student loan product at any time without notice.
                    <br />* Benchmark rates shown on this page are rounded to 2 decimals of a percentage for illustrative purposes. For the actual rate used, click here.</p> 
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default StudentLoansLandingProdigy