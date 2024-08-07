import { Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import '../css/components/Hero.scss';

const Hero = () => {
    return(
        <Container className='hero-wrpper' fluid={true}>
        <div className="hero" style={{backgroundImage:'url("/images/home-hero.webp")'}}>
            <div className='hero-caption'>
                <p><strong>FIND THE RIGHT UNIVERSITY & STUDENT LOAN OPTIONS</strong></p>
                <h1 className='hero-header'>International Study Abroad Experts</h1>
                <div className="mobile-image mobile-hero" style={{backgroundImage:'url("/images/home-hero.webp")'}}></div>
                <Button href='#mainForm' className='extra-pad mobile-btn' size='lg'>Get Started</Button>
                <p className='mb-5'>Nomad Credit is here to guide international students on their study abroad journey to the U.S. or around the world, matching them with the right universities for their individual needs and  helping them discover great education loan options to support their goals.</p>
                <Button href='#mainForm' className='extra-pad desktop-btn' size='lg'>Get Started</Button>
            </div>
            
        <div style={{backgroundImage:'url("/images/hero-footer.webp")'}} className='hero-footer'>
            <div className='hero-footer-text'>
                <span className='hero-footer-text-item'><FontAwesomeIcon icon={faCheck} /> Simple and quick</span> 
                <span className='hero-footer-text-item'><FontAwesomeIcon icon={faCheck} /> Smart and personalized</span> 
                <span className='hero-footer-text-item'><FontAwesomeIcon icon={faCheck} /> Great customer service</span> 
            </div>
        </div>
        </div>
        </Container>
        
        
    )
}
export default Hero;