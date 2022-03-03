
import React, {Component} from "react";
import {Col, Row} from "react-bootstrap";
import classes from './signup.module.css';

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
        this.firstName = React.createRef();
        this.lastName = React.createRef();
        this.email = React.createRef();
        this.password = React.createRef();
    }

    signUp(event) {
        event.preventDefault();
    }

    render() {
        return (
            <React.Fragment>
                <div className="body">
                    <Row>
                        <Col className={classes.center} md={"12"}>
                            <h2>SignUp as student/instructor</h2>
                        </Col>
                        <Col className={classes.center} md={"12"}>
                            <form id={"SignUpForm"} className={classes.form} ref={this.form} onSubmit={(e) => this.signUp(e)}>

                                <div className={classes.fieldContainer}>
                                    <input ref={this.firstname} required={true}
                                           className={classes.inputField} type="text" id="first_name" placeholder="Type first name"/>
                                </div>

                                <div className={classes.fieldContainer}>
                                    <input ref={this.lastName} required={true}
                                           className={classes.inputField} type="text" id="last_name" placeholder="Type last name"/>
                                </div>

                                <div className={classes.fieldContainer}>
                                    <input ref={this.email} required={true}
                                           className={classes.inputField} type="email" id="email" placeholder="your.email@domain.com"/>
                                </div>

                                <div className={classes.fieldContainer}>
                                    <input ref={this.password} required={true} maxLength={20} minLength={6}
                                           className={classes.inputField} type="text" id="password" placeholder="Password (minimum 6 digits)"/>
                                </div>

                                <div className={classes.fieldContainer}>
                                    <input className={classes.submitButton} type="submit" value={"SignUp"}/>
                                </div>

                            </form>
                        </Col>
                    </Row>
                    <Row>
                        <Col className={classes.center} md={"12"}>
                            <p>Already have an account? <a href={"/"}>Login</a></p>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        )
    };
}

export default SignUp;
