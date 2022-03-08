
import React, {Component} from "react";
import {Col, Row} from "react-bootstrap";
import classes from './signup.module.css';
import {signUp} from "../../api";

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
        this.firstName = React.createRef();
        this.lastName = React.createRef();
        this.email = React.createRef();
        this.password = React.createRef();
        this.role = React.createRef();
    }

    async signUp(event) {
        event.preventDefault();
        console.log({
            firstName: this.firstName.current.value,
            lastName: this.lastName.current.value,
            email: this.email.current.value,
            password: this.password.current.value,
            role: this.role.current.value
        });
        await signUp({
            firstName: this.firstName.current.value,
            lastName: this.lastName.current.value,
            email: this.email.current.value,
            password: this.password.current.value,
            role: this.role.current.value
        }).then(() => {
            console.log('jdjkljklds');
            document.getElementById("login").click();
        });
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
                                    <input ref={this.firstName} required={true}
                                           className={classes.inputField} type="text" id="first_name" placeholder="First name"/>
                                </div>

                                <div className={classes.fieldContainer}>
                                    <input ref={this.lastName} required={true}
                                           className={classes.inputField} type="text" id="last_name" placeholder="Last name"/>
                                </div>

                                <div className={classes.fieldContainer}>
                                    <select required={true} ref={this.role} className={classes.inputField} name="role" id="role" placeholder="Select role">
                                        <option value="">-- Select Role --</option>
                                        <option value="teacher">Teacher</option>
                                        <option value="student">Student</option>
                                    </select>
                                </div>

                                <div className={classes.fieldContainer}>
                                    <input ref={this.email} required={true}
                                           className={classes.inputField} type="email" id="email" placeholder="email"/>
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
                            <p>Already have an account? <a id={"login"} href={"/"}>Login</a></p>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        )
    };
}

export default SignUp;
