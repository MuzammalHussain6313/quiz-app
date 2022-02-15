
import classes from './Toastify.module.css'
import React, { useState } from 'react';
import {Row, Col, ToastContainer, Toast, CloseButton} from 'react-bootstrap';

function Toastify(props) {
    const [show, setShow] = useState(props.show);

    return (
        <Row>
            <Col xs={12}>
                <ToastContainer className={`${classes.container}`} position='top-center'>
                    {props.type === 'success' && <Toast className={classes.success} onClose={() => setShow(false)} show={show} delay={props.delay} autohide>
                        <Toast.Body>{props.text}
                            <CloseButton onClick={() => setShow(false)} className={classes.rightPosition}/>
                        </Toast.Body>
                    </Toast>}
                   
                    {props.type === 'error' && <Toast className={classes.error} onClose={() => setShow(false)} show={show} delay={props.delay} autohide>
                        <Toast.Body>{props.text}
                            <CloseButton onClick={() => setShow(false)} className={classes.rightPosition}/>
                        </Toast.Body>
                    </Toast>}

                    {props.type === 'warning' && <Toast className={classes.warning} onClose={() => setShow(false)} show={show} delay={props.delay} autohide>
                        <Toast.Body>{props.text}
                            <CloseButton onClick={() => setShow(false)} className={classes.rightPosition}/>
                        </Toast.Body>
                    </Toast>}
                </ToastContainer>
            </Col>  
        </Row>
    );
}

export default Toastify;