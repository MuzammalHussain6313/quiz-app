
import React, {Component} from "react";
import {Col, Row} from "react-bootstrap";
import classes from './login.module.css';
import {bindActionCreators} from "redux";
import {setLogin} from "../../store/actions/actions";
import {connect} from "react-redux";
import {login, saveUser} from "../../api";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
        this.email = React.createRef();
        this.password = React.createRef();
    }

    async login(event) {
        event.preventDefault();
        await login({
            email: this.email.current.value,
            password: this.password.current.value
        }).then(async (res) => {
            if(res !== ""){
                await saveUser(res).then((response) => {
                    localStorage.setItem('isLoggedIn', JSON.stringify(true));
                    this.props.setLogin(true);
                    window.open('/quizzes', '_self');
                    // document.getElementById("home").click();
                });
            }
        });
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
                            <p>New to Quiz-app? <a href={"/signup"}>Create an account</a></p>
                        </Col>
                    </Row>
                    <a id={"home"} href={"/quizzes"}/>
                </div>
            </React.Fragment>
        )
    };
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.quizReducer.isLoggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setLogin: (isLogin) => setLogin(isLogin),
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
