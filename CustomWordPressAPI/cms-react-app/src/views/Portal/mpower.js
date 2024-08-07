import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import {LoanLandingForm, LoanBottomForm} from '../../components/Forms';
import '../../css/views/secondary.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const StudentLoansLandingMpower = (props) => {

    return(

        <>
            <Container fluid className='secondary-hero section-block  position-relative'>
                
                <Row className='three-col-row'>
                    <Col>
                        <h1 className='hero-header'>Help Fund your Study Abroad Education with Nomad Credit and MPOWER Financing</h1>
                        <p>Nomad Credit prides itself on making study abroad a pain-free process by helping international students find education loan options that best benefit them. The need for an eligible cosigner or collateral are common obstacles for these students. To combat these barriers, Nomad Credit has partnered with MPOWER Financing to help students find the best loan options for their unique needs. Don't let financing hold you back from pursuing your dreams of studying abroad. Let Nomad Credit and MPOWER Financing help you find the best loan options!</p>
                        <Image width={293} height={291} fluid className='mt-5 display-mobile' src={`/images/how-it-works.webp`} />
                    </Col>
                </Row>
                <Container>
                <Row >
                    <Col md={{span:10, offset:1}} >
                        <LoanLandingForm landingName="/student-loans-landing-mpower" />
                    </Col>
                </Row>
                </Container>
                
                <Row className='mt-5 three-col-row'>
                    <Col xs={12}><h2 className='mt-5 mb-5 text-center'>How Does a MPOWER Education Loan Benefit Me?</h2></Col>
                    <Col xs={12} md={6}>
                    
                        <p><strong>Quality Help from A Trusted Leader in the Industry</strong>
                            <ul>
                                <li>Free visa support letters, exclusive career strategy services, and the potential for a conditional loan offer in a matter of days</li>
                                <li>
                                190+ eligible countries of citizenship and 400+ U.S. & Canadian schools supported
                                </li>
                            </ul>
                        </p>
                        <p><strong>Loan Assistance Catered to Your Specific Study Abroad Journey</strong>
                            <ul>
                                <li>Fixed-rate loans from US$2,001 to US$100,000 total</li>
                                <li>
                                No issues if you have study abroad education loans from other lender, you can still apply for an MPOWER education loan
                                </li>
                                

                            </ul>
                        </p>
                        <p><strong>Straightforward Process with No Hassle</strong>
                            <ul>
                                <li>The entire application process for MPOWER Financing is 100% digital, ensuring ease of access around the globe no matter your location</li>
                                <li>
                                It takes just 30 seconds to see if you’re eligible to apply and ~30 minutes to complete the application
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
                        {/* <LoanLandingForm  landingName="student-loans-landing-prodigy"Frequir /> */}
                        <p><strong>MPOWER Financing Education Loan Features At a Glance</strong>
                            <table>
                                <thead>
                                    <th>Feature</th>
                                    <th>Detail</th>
                                </thead>
                                <tbody>
                                    <tr><td>	Loan Amount	</td><td>	Up to $100,000	</td></tr>
                                    <tr><td>	Interest Rate	</td><td>	12.74% Min	</td></tr>
                                    <tr><td>	Interest Rate Type	</td><td>	Fixed	</td></tr>
                                    <tr><td>	Minimum Income	</td><td>	Not Required	</td></tr>
                                    <tr><td>	Repayment	</td><td>	Simple Interest only, during the course & during 6 Month grace period, EMI afterward	</td></tr>
                                    <tr><td>	Processing Fees	</td><td>	5% origination fee	</td></tr>
                                    <tr><td>	Other Charges	</td><td>	No Charges	</td></tr>
                                    <tr><td>	Margin Money	</td><td>	0	</td></tr>
                                    <tr><td>	Loan Tenure	</td><td>	10 years	</td></tr>
                                    <tr><td>	Processing Time	</td><td>	Up to 10 business days	</td></tr>
                                    <tr><td>	Repayment Penalty	</td><td>	No Penalty	</td></tr>
                                </tbody>
                                
                            </table>
                        </p>
                    </Col>
                    
                </Row>
                <Image className='secondary-hero-city' src={`/images/admission-hero-city.webp`}/>
            </Container>
            <Container>
            <Row className='mt-5 three-col-row'>
                <Col xs={12}>
                    <h2 className='mt-5 text-center'>Am I Eligible for an MPOWER Finance Education Loan? </h2>
                    <h3 className='text-center'>
                    Please complete our loan option search to see if you  may be eligible!   </h3>
                        <Button className='extra-pad mt-5 mb-5 mx-auto' style={{display:'block', width:'fit-content'}} href='#mainForm'>Start your Search Now! <FontAwesomeIcon icon={faArrowRight} /> </Button>
                    <p style={{textAlign: 'center'}}> 
                        <strong>MPOWER Financing is proud to support international students from more than 190 countries</strong>
                        <br />
                        <strong>MPOWER Financing currently supports over 400 schools in the U.S. & Canada across all degree types.</strong>
                        <br/>The full list of eligible MPOWER Financing schools can be found <a href="https://www.mpowerfinancing.com/get-a-loan/schools-we-support" target="_blank">here.</a>

                    </p>
                        
                </Col>
            </Row>
            </Container>
            <Container style={{fontSize:'large', textAlign:'center'}} className='section-block'>
                <Row>
                    <Col sm={12} md={4}><Image src='/images/prodigy/prodigy-interest-rate.webp' alt='interest rate sign' /><h2>Interest Rate</h2><p>Starting at 12.74%</p></Col>
                    <Col sm={12} md={4}><Image src='/images/prodigy/prodigy-processing-fees.webp' alt='processing fees' /><h2>Processing Fees</h2><p>Up to 5% <br /><small>added to loan amount</small></p></Col>
                    <Col sm={12} md={4}><Image src='/images/prodigy/prodigy-loan-margin.webp' alt='loan margin' /><h2>Loan Margin</h2><p>0%</p></Col>
                </Row>
            </Container>
            {/* <Testimonials /> */}
            <Container fluid className='easy-process-section section-block prodigy-how' style={{paddingTop:'20px', paddingBottom:'20px'}}>
                <Row className='three-col-row pt-5 pb-5'>
                    <Col xs={12} md={6}>
                        <Image width={578} height={550} fluid src={`/images/prodigy/why-choose-prodigy.webp`} />
                    </Col> 
                    <Col xs={12} md={6}>
                        <h2 className='mt-5 mb-5'>What Are My Next Steps? </h2>

                        <ol>
                            <li>	Get started by registering your interest and telling us more about your study plans. Nomad Credit will help you get everything ready so that applying for funding is effortless.	</li>
                            <li>	Apply for funding and receive a customized quote from MPOWER Financing in exchange for some additional details about your plans.	</li>
                            <li>	Upload your documents to MPOWER Financing’s secure platform.	</li>
                            <li>	Finalize your loan and sign on the dotted line.	</li>
                            <li>	Study first, pay later with MPOWER Financing's flexible repayment options.	</li>

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
                        <p  style={{textAlign:'center'}}>There are quite a few documents that are required to process your MPOWER education loan as a study abroad student - some will need to be uploaded when you apply for your student loan, while others may only be needed later. To ensure a speedy process, it’s best to prepare all your documents early on.</p>
                        <ol>
                            <li>Resume or CV (curriculum vitae)	</li>
                            <li>	Proof of home country address - Utility bill, banking statement, signed lease, letter from the university, other	</li>
                            <li>	3 Standardized test scores (GRE, GMAT, LSAT, MCAT, NBDE)	</li>
                            <li>	English proficiency exam scores (TOEFL / IELTS) or waiver from university	</li>
                            <li>	Admission letter	</li>
                            <li>	Past transcripts and/or diploma from previous universities	</li>
                            <li>	Estimated cost of attendance or program financial summary	</li>
                            <li>	Passport	</li>
                            <li>	Secondary photo ID from your home country; this is in addition to your passport - Driver's license, national ID, voter's ID, other government issued ID	</li>
                            <li>	Supporting evidence for the funds you listed in your application - Bank statements, scholarships, salary evidence, internships	</li>
                            <li>	References	</li>
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
                        <h3>Can MPOWER provide a letter of financial support?</h3>
                        <p><strong>U.S. SCHOOLS</strong></p>
                        <ul>
                        <li>	Upon credit approval, MPOWER is able to issue support letters to assist our applicants with the visa process at no cost. You will need to provide the Support Letter to your school in order to receive the I-20.	</li>
                            <li>	To summarize, you must:	
                            <ol><li>	Receive acceptance to the school and apply for an MPOWER Student Loan	</li>
                            <li>	Receive the Support Letter from MPOWER following your loan’s approval	</li>
                            <li>	Provide the Support Letter to the school and receive the I-20 form	</li>
                            <li>	Include the I-20 form in your visa application with the U.S. government	</li></ol></li>
                            <li>	Note: You must provide MPOWER with the required immigration documentation before your loan can be disbursed	</li>
                        </ul>

                        <p><strong>CANADIAN SCHOOLS</strong></p>
                        <ul>
                            <li>	Your MPOWER loan approval letter can help prove that you have enough funds to support your study abroad education.	</li>
                            <li>	To summarize, you must:	
                            <ol><li>	Receive acceptance to the school and apply for an MPOWER Student Loan	</li>
                            <li>	Receive your MPOWER education loan approval document following your acceptance of loan terms	</li>
                            <li>	Include the loan approval letter in your visa application with the Canadian government.	</li></ol></li>
                            <li>	Note: You must provide MPOWER with the required immigration documentation before your loan can be disbursed	</li>
                        </ul>

                        <h3 className='mt-5'>How can I calculate my student loan payments?</h3>
                        <p>MPOWER has a <a href='https://www.mpowerfinancing.com/get-a-loan/' target="_blank">loan payment calculator</a>. Enter your loan amount, degree type, citizenship status, country of study, and time left until degree completion. Our tool will then calculate your in-school payment, monthly payment after graduation, and any savings you may be eligible for by using our available discount.</p>
                        
                        <h3 className='mt-5'>It’s time for my next MPOWER loan. How do I submit my second application?</h3>
                        <p>Current MPOWER customers can start and submit a second application when you sign in to your MPOWER Dashboard. There is a lifetime borrowing limit of $100,000, and a maximum of $50,000 per academic period. An academic period can be a semester, academic year, quarter, or trimester. For example, a student may choose to borrow $50,000 in their fall semester and an additional $50,000 in their spring semester. Or, a student with 2 years remaining until graduation may choose to borrow $25,000 over each of their 4 academic semesters. You can request funding for all academic periods in one application. Please note that each academic period is reviewed independently.</p>

                        <h3 className='mt-5'>How does MPOWER help me build my U.S. credit history and credit score?</h3>
                        <p>You do not need to have a U.S. credit history or credit score to be approved for an MPOWER no-cosigner, no-collateral loan. It’s important to start building credit in the U.S. for your future–you’ll need it to open a credit card, lease a car, rent an apartment, and get a mortgage. MPOWER helps build your U.S. credit history every time you make an on-time payment on your loan. We report information on your payments monthly to each of the U.S. credit bureaus, which in turn helps to build a credit history for you.</p>

                        <h3 className='mt-5'>Is MPOWER accepting new loan applications?</h3>
                        <p>Once you have signed your loan agreement and Prodigy Finance has released your funds, it takes between 3 to 5 business days for the funds to arrive in your school’s account.</p>
                        <p>Yes, MPOWER is accepting loan applications for past, current, and future semesters. Check your eligibility in 30 seconds <a href='https://registration.mpowerfinancing.com/eligibility' target="_blank">here</a>.</p>

                        <h3 className='mt-5'>Can a student use additional financing with their MPOWER loan?</h3>
                        <p>Yes, getting an MPOWER student loan does not preclude a student from accessing additional financing. That means you can use MPOWER together with other financing sources. We offer competitive, fixed interest rates, visa and career support, and students are pre-approved for the program funding at the time of final decision. Because of these benefits, we often find students choose MPOWER as their preferred lender for international students who want to study and stay in North America after graduating.</p>

                        <h3 className='mt-5'>How long does the application process take?</h3>
                        <p>It takes 30 seconds to check your eligibility, approximately 30 minutes to submit an application, and less than 3 days to receive your conditional offer. We accept loan applications for past, current, and future semesters.</p>
                        
                    </Col>
                </Row>
            </Container>
            <LoanBottomForm landingName="/student-loans-landing-mpower" />
            <Container fluid className='pt-5 section-block prodigy-terms' >
                <Row className='pt-5'> 
                    
                    <Col  xs={{offset:0, span:12}} md={{offset:3, span:6}}>
                    <h4>Terms and conditions</h4>
                    <p>To see MPOWER Financing’s full terms and conditions, please visit <a href='https://www.mpowerfinancing.com/terms-of-service' target="_blank">here</a>.</p> 
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default StudentLoansLandingMpower