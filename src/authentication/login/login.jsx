
import React, {Component} from "react";
import {Col, Row} from "react-bootstrap";
import classes from './login.module.css';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
        this.email = React.createRef();
        this.password = React.createRef();
    }

    login(event) {
        event.preventDefault();
    }

    render() {
        return (
            <React.Fragment>
                <div className="body">
                    <Row>
                        <Col className={classes.center} md={"12"}>
                            <h2>Login as student/instructor</h2>
                        </Col>
                        <Col className={classes.center} md={"12"}>
                            <form id={"loginForm"} className={classes.form} ref={this.form} onSubmit={(e) => this.login(e)}>
                                <div className={classes.fieldContainer}>
                                    <input ref={this.email} required={true}
                                           className={classes.inputField} type="email" id="email" placeholder="your.email@domain.com"/>
                                </div>

                                <div className={classes.fieldContainer}>
                                    <input ref={this.password} required={true} maxLength={20} minLength={6}
                                           className={classes.inputField} type="text" id="password" placeholder="Password (minimum 6 digits)"/>
                                </div>

                                <div className={classes.fieldContainer}>
                                    <input className={classes.submitButton} type="submit" value={"Login"}/>
                                </div>
                            </form>
                        </Col>
                    </Row>
                    <Row>
                        <Col className={classes.center} md={"12"}>
                            <p>New to Quiz-app? <a href={"/sign-up"}>Create an account</a></p>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        )
    };
}

export default Login;
