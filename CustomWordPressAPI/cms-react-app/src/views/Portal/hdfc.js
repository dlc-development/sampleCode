import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import {LoanLandingForm, LoanBottomForm} from '../../components/Forms';
import '../../css/views/secondary.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

 
const StudentLoansLandingHDFC = (props) => {

    return(

        <>
            <Container fluid className='secondary-hero section-block  position-relative'>
                
                <Row className='three-col-row'>
                    <Col>
                        <h1 className='hero-header'>Help Fund your Study Abroad Education with Nomad Credit and HDFC Credila</h1>
                        <p>Nomad Credit prides itself on making study abroad a pain-free process by helping international students find education loan options that best benefit them. The education loan process can be confusing for many, as it’s difficult to understand if a cosigner or collateral is needed for your specific journey. To combat these issues, Nomad Credit has partnered with HDFC Credila to help students find the best loan options for their unique needs. Don't let financing hold you back from pursuing your dreams of studying abroad. Let Nomad Credit and HDFC Credila help you find the best loan options!</p>
                        <p></p>
                        
                        <Image width={293} height={291} fluid className='mt-5 display-mobile' src={`/images/how-it-works.webp`} />
                    </Col>
                </Row>
                <Row className='mt-5 mb-5'>
                    <Col md={{span:10, offset:1}}>
                        <LoanLandingForm  landingName="/student-loans-landing-hdfc" />
                    </Col>
                </Row>
                <Row className='mt-5 three-col-row'>
                    <Col xs={12}><h2 className='mt-5 mb-5 text-center'>How Does an HDFC Credila Student Loan Benefit Me?</h2></Col>
                    <Col xs={12} md={6}>
                    
                        <strong>Quality Help from A Trusted Leader in the Industry</strong>
                            <ul>
                                <li>	HDFC Credila has made cumulative disbursements of over USD 1 Billion	</li>
                                <li>	HDFC has funded thousands of students pursuing their study abroad higher education across 59+ countries, 4,100+ institutes, and 2700+ courses	</li>
                            </ul>
                        <strong>Loan Assistance Catered to Your Specific Study Abroad Journey</strong>
                            <ul>
                                <li>	Up to 100% finance covering tuition fee & living costs	</li>
                                <li>	Can receive student loan sanction even before admission confirmation	</li>
                                <li>	HDFC Credila education loan interest rates are competitive in the market	</li>
                            </ul>
                        
                        <strong>Straightforward Process with No Hassle</strong>
                            <ul>
                                <li>	Quick and hassle-free process with online and doorstep service offered	</li>
                                <li>	Easy EMIs with repayment tenure up to 15 years	</li>
                            </ul>
                       <strong>Free Assistance from Nomad Credit</strong>
                            <ul>
                                <li>Nomad Credit will assist you in your entire loan process completely free of charge</li>
                            </ul>
                        
                        <Image width={578} height={436} fluid className='mt-5 display-desktop' src={`/images/how-it-works.webp`} />
                    </Col>
                    <Col >
                        <strong>HDFC Credila Education Loan Features At a Glance</strong>
                            <table>
                                <thead>
                                    <tr>
                                    <th>Feature</th>
                                    <th>Detail</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>	Loan Amount	</td><td>	100% COE	</td></tr>
                                    {/* <tr><td>	Interest Rate	</td><td>	13.30% base rate + spread	</td></tr> */}
                                    <tr><td>	Interest Rate Type	</td><td>	Floating	</td></tr>
                                    <tr><td>	Minimum Income	</td><td>	Not Required	</td></tr>
                                    <tr><td>	Repayment	</td><td>	Flexible repayment options are available
	</td></tr>
                                    <tr><td>	Processing Fees	</td><td>	Maximum 1.25% of the loan amount	</td></tr>
                                    <tr><td>	Other Charges	</td><td>	No charges	</td></tr>
                                    <tr><td>	Margin Money	</td><td>	0	</td></tr>
                                    <tr><td>	Loan Tenure	</td><td>	Up to 15 years	</td></tr>
                                    <tr><td>	Processing Time	</td><td>	Around 10 days	</td></tr>
                                    <tr><td>	Prepayment Penalty	</td><td>	No Penalty for partial prepayment and complete Loan Foreclosure.	</td></tr>
                                </tbody>
                                
                            </table>
                    </Col>
                    
                </Row>
                
                <Image className='secondary-hero-city' src={`/images/admission-hero-city.webp`}/>
            </Container>
            <Container>
            <Row className='mt-5 three-col-row'>
                <Col xs={12}>
                    <h2 className='mt-5 text-center'>Am I eligible for a HDFC Credila Education Loan?</h2>
                    <h3 className='text-center'>
                    Please complete our loan option search to see if you  may be eligible!  </h3>
                        <Button className='extra-pad mt-5 mb-5 mx-auto' style={{display:'block', width:'fit-content'}} href='#mainForm'>Start your Search Now! <FontAwesomeIcon icon={faArrowRight} /> </Button>
                    
                        <strong>Study Abroad Student Loan Eligibility</strong>
                        <ul>
                            <li>	Borrower must be an Indian citizen.	</li>
                            <li>	Co-applicants(s) must be an Indian citizen.	</li>
                            <li>	Co-borrower(s) must have a bank account in any bank in India with cheque writing facilities.	</li>
                            <li>	Confirmed admission in the colleges before disbursement.	</li>
                            <li>	Borrower and Co-applicant(s) to meet HDFC Credila’s credit and underwriting norms as applicable from time to time.	</li>
                        </ul>
                    
                        <strong>Co-applicant Requirements</strong>
                        <ul>
                            <li>	It is mandatory to bring in an earning co-applicant(s) based in India to support the Education Loan application.	</li>
                            <li>	Co-applicant (s) may be any of the following relatives, viz Father / Mother / Brother / Sister (married) /Spouse, where such co-applicant’s income would be considered in determining the loan eligibility per HDFC Credila’s credit and underwriting norms;	</li>
                            <li>	Co-applicant’s liability is co extensive with the Student;	</li>
                            <li>	Co-applicant(s) to provide documentary proof to establish their relationship with the student, to the satisfaction of HDFC Credila;	</li>
                            {/* <li>	In case the collateral to be provided is not provided by one of the above relatives, then the collateral could be provided by one of the following relatives provided they are brought into the arrangement as Co-applicant(s) viz: Father-in-law; Mother-in-law; Sister-in-law; Brother-in-law; Maternal or Paternal Uncle or Aunt, Grandparents & First Cousins.	</li> */}
                            <li>	Up to 100% of other expenses including living and hostel expenses, traveling expenses, examination fees, library/laboratory fees; purchase of books / equipment’s/instruments/uniforms; purchase of computers / laptops considered necessary for completion of the course as evaluated by HDFC Credila.	</li>
                        </ul>
                    
                        
                </Col>
            </Row>
            </Container>
            <Container style={{fontSize:'large', textAlign:'center'}} className='section-block'>
                <Row>
                    {/* <Col  sm={12} md={6}><Image src='/images/prodigy/prodigy-interest-rate.webp' alt='interest rate sign' /><h2>Interest Rate</h2><p>13.30% base rate + spread</p></Col> */}
                    {/* <Col><Image src='/images/prodigy/prodigy-processing-fees.webp' alt='processing fees' /><h2>Processing Fees</h2><p>around 1-2% <br /><small>of your total loan amount</small></p></Col> */}
                    {/* <Col  sm={12} md={6}><Image src='/images/prodigy/prodigy-loan-margin.webp' alt='loan margin' /><h2>Margin Money</h2><p>0%</p></Col> */}
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
                            <li>	Send us the required documents needed to process your loan option and Nomad will organize and send your file to HDFC	</li>
                            <li>	A Nomad Education Loan Manager will provide you updates of when your loan is successfully logged in and sanctioned	</li>
                            <li>	Pay any necessary sanction fees and await disbursement	</li>
                            <li>	Study first, pay later with HDFC Credila’s flexible repayment options.	</li>
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
                        There are quite a few documents that are required to process your HDFC student loan for study abroad. To ensure a speedy process, it’s best to prepare all your documents early on. 
                        </p>
                        
                        <p><strong>One Passport Size Photograph</strong> - Applicant and Co-Applicant
                            
                        </p>

                       <strong>Photo ID</strong> - Applicant and Co-Applicant (Any one of the following)
                            <ul>
                                <li>	Permanent Account Number (PAN) Card, and Form 60, for those who do not have PAN Card	</li>
                                <li>	Passport	</li>
                                <li>	Driving License	</li>
                                <li>	Aadhaar Card	</li>
                                <li>	Voter's ID Card	</li>
                            </ul>
                        

                        <strong>Residence Proof</strong> - Applicant and Co-Applicant (Any one of the following)
                            <ul>
                                <li>	Passport	</li>
                                <li>	Driving License	</li>
                                <li>	Aadhaar Card	</li>
                                <li>	Voter's ID Card	</li>
                            </ul>
                        

                        <strong>Academic Documents of Student</strong>
                            <ul>
                                <li>	Marksheet/Certificate of 12th Exam	</li>
                                <li>	Marksheet / Certficate for Graduation / Higher Education	</li>
                                {/* <li>	Marksheet of Any Entrance Exam Taken e.g. CAT, CET, etc. (If applicable)	</li> */}
                                <li>	GRE/GMAT/TOEFL/IELTS, etc. Marksheets (If applicable)	</li>
                                <li>	Scholarship Documents (if applicable)	</li>
                            </ul>
                            

                        <p><strong> Proof Of Admission (If available)</strong>
                            <br />
                            Admission Letter from the Institute on its Letterhead with Institute’s Address
                        </p>

                        <p><strong> Last 6 Months Bank Statements of Co-Applicant</strong>
                            <br />
                            (If more than one bank account, provide copies of all) Make sure to include the bank statements of the Bank Account where Salary or Business/Professional receipts are credited every month.
                        </p>

                       <strong> Income Proof of Co-Applicant</strong>
                            <ul>
                                <li>	In case of Salaried Employee (All the following)	
                                    <ol>
                                        <li>	Latest 3 Salary Slips or Salary Certificate on Employer's Letterhead	</li>
                                        <li>	Last 2 year's Form 16 from Employer or Last 2 Year's Income Tax Returns	</li>
                                        <li>	Any Other Income Proof That is Not Reflected in the Above Documents	</li>
                                    </ol>
                                </li>
                                <li>In case of Self Employed or Professional (All the following)	
                                    <ol>
                                        <li>	Last 2 Year's Income Tax Returns	</li>
                                        <li>	Last 2 Year's Certified Financial Statements or Provisional Financial Statements Duly Certified by CA	</li>
                                        <li>	Proof Of Office (any one of the following, Lease Deed, Utility Bill, Title Deed, etc.)	</li>
                                        <li>	Any Other Income Proof That is Not Reflected in the Above Documents	</li>
                                    </ol>
                                </li>
                            </ul>
                        

                        <strong>If Collateral - Immovable Property (Residential, Commercial and Non Agricultural Land)</strong>
                            <ul>
                                <li>	Property Title Deed	</li>
                                <li>	7 / 12 extracts in case of land	</li>
                                <li>	Registered Sale Agreement Along With Society Share Certificate	</li>
                                <li>	Original Registration receipt for the above agreement	</li>
                                <li>	Allotment Letter By Municipal Corporation / Authorized Govt. Authority Like MHADA, CIDCO, etc. Please add HUDA, DDA, JDA, GIDC etc	</li>
                                <li>	Previous Chain of Sale Deed establishing title	</li>
                                <li>	Latest Maintenance bill along with Receipts issued by builder/ society,	</li>
                                <li>	Latest Property tax bill along with receipts,	</li>
                                <li>	NOC for mortgage from society/builder,	</li>
                                <li>	Approved building plan	</li>
                                <li>	Encumbrance certificates as on date etc	</li>
                            </ul>
                            <strong>Fixed deposits receipts with certain banks can also be taken as collateral</strong>
                        {/* <Button variant="outline-primary" className='extra-pad' href='#mainForm'>Get Started  <FontAwesomeIcon icon={faArrowRight} /></Button> */}
                    </Col>
                </Row>
            </Container>
            <Container fluid className='pt-5 section-block prodigy-faq' >
                <Row className='pt-5'> 
                    
                    <Col xs={{offset:0, span:12}} md={{offset:2, span:8}}>
                        <Image style={{display:'block', margin:'auto', marginBottom:'20px'}} src='/images/prodigy/prodigy-faqs.webp' alt="FAQs" />
                       

                        <h2 style={{textAlign:'center', marginBottom:'20px'}}>Frequently asked Questions</h2>
                        <p>Please see some of HDFC Credila’s FAQ’s below. For a full list of FAQ’s, please visit <a href='https://www.hdfccredila.com/faqs/faqs.html' target='_blank'>here</a></p>
                        <h3>What is the best way to finance higher education?</h3>
                        <p>Some of the common ways of funding higher education is through using family savings, borrowing from friends and relatives, selling assets like land, gold etc. or taking an education loan . Earlier, it was believed that only people from the middle-income group choose to fund their education through student/education loans. With benefits of an education loan coming to the fore and specialists like HDFC Credila offering doorstep service, many affluent families are also opting for an education loan and availing of exclusive benefits like:</p>
                        <ul>
                            <li>	Income Tax benefits under section 80E of IT Act	</li>
                            <li>	Opportunity for students to take their own financial responsibilities	</li>
                            <li>	Preserving their family savings	</li>
                            <li>	Building a good credit history	</li>       
                        </ul>
                        <p>Hence, education loans have clear advantages over using personal finance</p>
                        <h3 className='mt-5'>Who should opt for an education loan and why?</h3>
                        <p>Ans: Usually, middle-income group people apply for education loans. However, because of:</p>
                        <ul>
                            <li>	Rapidly rising costs of education	</li>
                            <li>	Income tax benefit under 80E of IT act	</li>
                            <li>	Students wanting to take their own financial responsibilities to preserve the parents savings	</li>
                            <li>	build positive credit history	</li>
                        </ul>
                        <p>Even affluent families are going for education loan for their student’s abroad studies</p>


                        {/* <h3 className='mt-5'>How is the economic scenario affecting the loan market? Fewer loans to hand over or fewer loans to take?</h3>
                        <p>With such a young population and one of the largest pool of students coupled with rising cost of education is only fueling the demand of education loans in India</p> */}

                        <h2 className='mt-5'>Repayment terms</h2>
                        <h3 className='mt-5'>When do I start paying my EMI?</h3>
                        <p>HDFC Credila's unique education loan offers the flexibility of paying only interest (PEMI) during the course period and principle plus interest (EMI) after the completion of studies and grace period.</p>

                        <h3 className='mt-5'>How do you decide on repayment period?</h3>
                        <p>
                            The repayment periods are generally driven by our evaluation of the student's potential earning capability and risks we perceive in extending any particular loan.
                            At HDFC Credila, we understand that students want to start repaying loans immediately after they get a job. However, they may find higher EMI's (due to shorter repayment periods) at the start of their careers, very challenging. Thus we offer longer tenure to facilitate smooth transition of student from campus to corporate. This way they can start their earning and professional lives with positive credit histories that help them to take other loans in future.
                        </p>

                        <h3 className='mt-5'>How is interest calculated?</h3>
                        <p>
                            Interest may be calculated on daily, monthly or yearly reducing principle basis
                        </p>
                        
                    </Col>
                </Row>
            </Container>
            
            <LoanBottomForm landingName="/student-loans-landing-hdfc" />
            <Container fluid className='pt-5 section-block prodigy-terms' >
                <Row className='pt-5'> 
                    <Col  xs={{offset:0, span:12}} md={{offset:3, span:6}}>
                    <h4>Terms and conditions</h4>
                    <p>To see HDFC Credila’s full terms and conditions, please visit <a target="_blank" href="https://www.hdfccredila.com/about/fair-practice-code.html">click here.</a></p> 
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default StudentLoansLandingHDFC