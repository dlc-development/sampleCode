import {useEffect, useState} from 'react';
import {Nav, Container, Row, Col, Button, Form, Image} from 'react-bootstrap/';
import {FacebookOutlined, TwitterOutlined,InstagramOutlined, LinkedinOutlined} from '@ant-design/icons'
import {FooterForm} from './Forms';
import '../css/components/footer.scss';

const Footer = (props) => {
    const [isLanding, setIsLanding] = useState(false);
    const setThisLanding = (torf) => {
        setIsLanding(torf)
    }
    // const thisContext = useContext(props.ThemeContext);
    const thisContext = props.context;
    useEffect(() => {
        if(!thisContext.landingPages) return;
        if(thisContext.landingPages.includes(window.location.pathname)){
        setThisLanding(true);
    }
    }, []);
    const urlParams = new URLSearchParams(window.location.search);
    const fromLanding = urlParams.get('fromLanding');

    if(fromLanding) return(<p></p>);

    return(
        <Container className='footer' style={{paddingTop:'50px'}}>
            {isLanding ? '' : <a id="whatsappclick" href="https://wa.me/919209462807?text=%20I'm%20interested%20in%20Nomad%20Credit's%20help" target="_blank" style={{position: 'fixed', right:'20px', bottom:'20px', width:'50px', height:'50px'}}><Image id="whatsappimg" style={{width:'50px', height:'50px'}} src='/images/whatsapp-icon.png' /></a>}
            
            <Row className={`${isLanding ? 'hidden' : ''}`}>
                <Col xs={12} md={2} className='pb-5'>
                    <span className='footer-title'>Products</span>
                    <Nav className="flex-column">
                        <Nav.Link href="/student-loans">Student Loans</Nav.Link>
                        <Nav.Link href="/admissions">Admissions</Nav.Link>
                    </Nav>
                </Col>
                <Col xs={12} md={2} className='pb-5'>
                    <span className='footer-title'>Company</span>
                    <Nav className="flex-column">
                        <Nav.Link href="/faqs">FAQs</Nav.Link>
                        <Nav.Link href="https://blog.nomadcredit.com/" target='_blank'>Blog</Nav.Link>
                        <Nav.Link href="/how-it-works">How it Works</Nav.Link>
                        <Nav.Link href="/partners">Partners</Nav.Link>
                        <Nav.Link href="/testimonials">Testimonials</Nav.Link>
                    </Nav>
                </Col>
                <Col xs={12} md={2} className='pb-5'>
                    <span className='footer-title'>Support</span>
                    <Nav className="flex-column">
                        <Nav.Link href="/contact-us">Contact Us</Nav.Link>
                        {/* <Nav.Link href="/site-map">Sitemap</Nav.Link> */}
                        {/*<Nav.Link href="https://heapanalytics.com/?utm_source=badge" target='_blank'>Heap Analytics</Nav.Link>*/}
                    </Nav>
                </Col>
                <Col xs={12} md={6}>
                    <FooterForm />
                </Col>
            </Row>
            <Row className='footer-bottom'>
                <Col xs={12} md={6} className={`footer-bottom-left ${isLanding ? 'hidden' : ''}`}>
                
                    <Nav>
                        <Nav.Link href="https://www.facebook.com/nomadcredit/" target='_blank'> <FacebookOutlined/></Nav.Link>
                        <Nav.Link href="https://twitter.com/nomadcredit" target='_blank'> <TwitterOutlined /></Nav.Link>
                        <Nav.Link href="https://www.instagram.com/nomadcredit/" target='_blank'> <InstagramOutlined /></Nav.Link>
                        <Nav.Link href="https://www.linkedin.com/company/nomadcredit/" target='_blank'> <LinkedinOutlined /></Nav.Link>
                        
                    </Nav>
                </Col>
                <Col xs={12} className={`${isLanding ? '' : 'hidden'}`} style={{textAlign:'center'}}>
                    <Image  alt='Small Nomad Credit Logo' style={{maxWidth:'200px', margin:'auto'}} fluid={true} src="/images/logo-2.0.webp"/>
                </Col>
                <Col xs={12} md={isLanding ? 12 : 6} className={`footer-bottom-right`} >  
                    <Nav className={` ${isLanding ? 'justify-content-center' : 'justify-content-end'}`}>
                        <Nav.Link href="/privacy"> Privacy Policy</Nav.Link>
                        <Nav.Link href="/terms">Terms of Use</Nav.Link>
                        <Nav.Link href='/'>© Nomad Credit {(new Date()).getFullYear()}</Nav.Link>
                        <Nav.Link >33 W. Ontario, Chicago, IL 60654</Nav.Link>
                    </Nav>
                </Col>
            </Row>
      </Container>


//       <Container className='footer' style={{paddingTop:'50px'}}>
//       <Row className={`${isLanding ? 'hidden' : ''}`}>
//           <Col xs={12} md={2} className='pb-5'>
//               <span className='footer-title'>Products</span>
//               <Nav className="flex-column">
//                   <Nav.Link href="/student-loans">Student Loans</Nav.Link>
//                   <Nav.Link href="/admissions">Admissions</Nav.Link>
//               </Nav>
//           </Col>
//           <Col xs={12} md={2} className='pb-5'>
//               <span className='footer-title'>Company</span>
//               <Nav className="flex-column">
//                   <Nav.Link href="/faq">FAQs</Nav.Link>
//                   <Nav.Link href="https://blog.nomadcredit.com/" target='_blank'>Blog</Nav.Link>
//                   <Nav.Link href="/how-it-works">How it Works</Nav.Link>
//                   <Nav.Link href="/partners">Partners</Nav.Link>
//                   <Nav.Link href="/testimonials">Testimonials</Nav.Link>
//               </Nav>
//           </Col>
//           <Col xs={12} md={2} className='pb-5'>
//               <span className='footer-title'>Support</span>
//               <Nav className="flex-column">
//                   <Nav.Link href="/contact-us">Contact Us</Nav.Link>
//                   <Nav.Link href="/sitemap">Sitemap</Nav.Link>
//                   {/*<Nav.Link href="https://heapanalytics.com/?utm_source=badge" target='_blank'>Heap Analytics</Nav.Link>*/}
//               </Nav>
//           </Col>
//           <Col xs={12} md={6}>
//               <FooterForm />
//           </Col>
//       </Row>
//       <Row className='footer-bottom'>
//           <Col xs={12} md={6} className={`footer-bottom-left ${isLanding ? 'hidden' : ''}`}>
          
//               <Nav>
//                   <Nav.Link href="https://www.facebook.com/nomadcredit/" target='_blank'> <FacebookOutlined/></Nav.Link>
//                   <Nav.Link href="https://twitter.com/nomadcredit" target='_blank'> <TwitterOutlined /></Nav.Link>
//                   <Nav.Link href="https://www.instagram.com/nomadcredit/" target='_blank'> <InstagramOutlined /></Nav.Link>
//                   <Nav.Link href="https://www.linkedin.com/company/nomadcredit/" target='_blank'> <LinkedinOutlined /></Nav.Link>
                  
//               </Nav>
//           </Col>
//           <Col xs={12} className={`${isLanding ? '' : 'hidden'}`} style={{textAlign:'center'}}>
//               <Image style={{maxWidth:'200px', margin:'auto'}} fluid={true} src="/images/logo-2.0.webp"/>
//           </Col>
//           <Col xs={12} md={isLanding ? 12 : 6} className={`footer-bottom-right`} >  
//               <Nav className={` ${isLanding ? 'justify-content-center' : 'justify-content-end'}`}>
//                   <Nav.Link href="/privacy"> Privacy Policy</Nav.Link>
//                   <Nav.Link href="/terms">Terms of Use</Nav.Link>
//                   <Nav.Link href='/'>© Nomad Credit {(new Date()).getFullYear()}</Nav.Link>
//                   <Nav.Link >33 W. Ontario, Chicago, IL 60654</Nav.Link>
//               </Nav>
//           </Col>
//       </Row>
// </Container>
      )
}

export default Footer;