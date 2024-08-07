import { Button, Container, Row, Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import '../css/components/schedule-now-banner.scss';

const ScheduleNowBanner = (props) => {
    let {title, anchor} = props;
    if(!title) title = "Access The BEST Student Loans";
    if(!anchor) anchor = 'mainForm'
    return(
        <Container fluid className='schedule-consultation-section pt-4 pb-4'>
                <Row> 
                    <Col md={{offset:1}}>
                        <p className='schedule-now-header'>{title}</p>
                        <Button variant="outline-light" className='extra-pad' href={`#${anchor}`}>Get Started <FontAwesomeIcon icon={faArrowRight} /></Button>
                    </Col>
                    <Col className='spacer' md={1} />
                </Row>
            </Container>
    )
}

export default ScheduleNowBanner;