import React, {  useEffect } from 'react';
import {Button, Container, Navbar, Nav, Image} from 'react-bootstrap';
import logo from './logo-2.0.webp';
import '../css/components/Topnav.scss';

const Topnav = (props) => {
      const searchParams = new URLSearchParams(window.location.search);
      let btnStyle = { padding:'8px 50px'};
      let logoStyle = {};
      let {loggedin} = props;
      btnStyle = { padding:'8px 50px', marginTop:'30px'};
      logoStyle ={margin:'auto'};
      const dashboard = searchParams.get("dashboard")
      const mydocs = searchParams.get("mydocs")
    

      return(
        <Navbar className="top-nav"  expand="lg">
          <Container className=''>
            <Navbar.Brand className={loggedin ? '' : 'landing-logo'} style={logoStyle}><Image fluid={true}  alt='Nomad Credit Logo' src={logo} width={200} height={74}/></Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <div style={{width:'85%'}} className={loggedin ? '':'d-none'}>
            <Navbar.Collapse id={`basic-navbar-nav`} >
              <Nav className={`me-auto`}>
                  <Nav.Link href="#" className='mobile-link' onClick={(e) => {
                    e.preventDefault()
                  fetch(`/signout.php`)
                  .then(response => response.json())
                  .then(response => {
                      response = response.data;
                      window.location.href = '/app?sign_in=true'
                  })
                  .catch(error => {
                      console.log('error', ""+error);
                  });
                }}>Log Out</Nav.Link>
                  {/* <Nav.Link href="/contact-us">Contact Us</Nav.Link> */}
                  <Nav.Link active={dashboard} href="/app?dashboard=true">Dashboard</Nav.Link>
                  {/* <Nav.Link href="/faqs">FAQs</Nav.Link> */}
                  <Nav.Link active={mydocs} href="/app?mydocs=true">My Docs</Nav.Link>
                  {/* <Nav.Link  href="/blog" target='_blank'>Articles</Nav.Link> */}
              </Nav>
            </Navbar.Collapse>
              </div>
            <Nav className='top-nav-login'>
                  {/* {window.seshName ? 
                  <Button style={btnStyle} href='/sign-up' variant="outline-danger" size="lg">Sign Out</Button> :
                  <Button style={btnStyle} href='/sign-up' variant="outline-danger" size="lg">Sign Up</Button>
                } */}
                <Button style={btnStyle} className={loggedin ? '':'d-none'} href='' onClick={(e) => {
                  e.preventDefault()
                  fetch(`/signout.php`)
                  .then(response => response.json())
                  .then(response => {
                      response = response.data;
                      window.location.href = '/app?sign_in=true'
                  })
                  .catch(error => {
                      console.log('error', ""+error);
                  });
                }} variant="outline-danger" size="lg">Sign Out</Button>
                </Nav>
          </Container>
        </Navbar>
      )
      
      



}

export default Topnav
