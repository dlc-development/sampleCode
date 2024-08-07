import { Container, Row, Col,} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const Spinner = () => {
    return(
        <Container fluid className=' pt-5 pb-5'>
            <Row> 
                <Col>
                    <div style={{textAlign:'center'}}>
                        <h1>Please wait, loading...</h1>
                        <FontAwesomeIcon icon={faSpinner} spin={true} size="2xl" />
                    </div>

                </Col>
            </Row>
        </Container>
    )
}

export default Spinner