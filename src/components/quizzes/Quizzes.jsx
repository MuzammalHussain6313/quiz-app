
import React, {Component} from 'react';
import classes from './Quizzes.module.css';
import {Col, Row, Container} from "react-bootstrap";
import Toastify from "../../customUI/showToast/Toastify";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import {getQuizzes} from "../../api";
import {setQuizList} from "../../store/actions/actions";
import attemptQuiz from "./AttemptQuiz";
import routeNames from "../../routes/routNames";


class Quizzes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            previousQuizzes: [],
            upcomingQuizzes: [],
            toast: {
                show: false,
                text: '',
                type: '' // success | error
            },
            redirect: false,
            path: '/',
            loading: true
        }
    }

    componentDidMount() {
        this.loadQuizzes();
    }

    async loadQuizzes() {
        var quizzes = await getQuizzes();
        console.log(quizzes.length);
        if(quizzes.length> 0) {
            await this.props.setQuizzes(quizzes);
            this.setPreviousUpcomingQuizzes(quizzes);
        } else {
            await this.setState((prevState, props) => ({
                loading: false
            }));
        }

    }

    async setPreviousUpcomingQuizzes(quizzes){
        var previousQuizzes = [];
        var upcomingQuizzes = [];
        quizzes.forEach((quiz) => {
            this.isTimePassed(`${quiz.date} ${quiz.time}`) ? previousQuizzes.push(quiz) : upcomingQuizzes.push(quiz);
        });
        await this.setState((prevState, props) => ({
            upcomingQuizzes: upcomingQuizzes,
            previousQuizzes: previousQuizzes,
            loading: false
        }));
    }

    isTimePassed(quizDateTime) {
        var quizTime = new Date(quizDateTime);
        var quizTimestamp = quizTime.getTime();
        var nowTimestamp = Date.now();
        if (quizTimestamp + 600000 < nowTimestamp) {
            return true;
        }
        return false
    }

    async attemptQuiz(quiz, isPrevious) {
        if(isPrevious) {
            this.openQuiz(quiz, 1);
            return
        }
        const varDate = new Date(quiz.date);
        const today = new Date();
        if (varDate.toDateString() === today.toDateString() && this.checkTime(quiz.time)) {
            this.openQuiz(quiz, 0);
        } else {
            this.showToast('Please wait until quiz time start. Thanks', 'error');
        }
    }

    async openQuiz(quiz, isPrevious) {
        await this.setState((prevState, props) => ({
            redirect: true,
            path: `${routeNames.user.quizzes}/${isPrevious}${quiz.key}`
        }));
    }


    checkTime(time) {
        const qhours = parseInt(time.split(':')[0]);
        const qmins = parseInt(time.split(':')[1]);
        const d = new Date(); // current time
        const hours = d.getHours();
        const mins = d.getMinutes();
        if (hours === qhours && (mins >= qmins && mins <= qmins + 10)) {
            return true;
        } else if (hours === qhours && !(mins >= qmins && mins <= qmins + 10)) {
            return false;
        }
    }

    showToast = async (text, type) => {
        if(!this.state.toast.show){
            await this.setState((prevState, props) => ({
                toast: { show : true, text : text, type : type }
            }));
            setTimeout(async () => {
                await this.setState((prevState, props) => ({
                    toast: { show : false, text : '', type : '' }
                }));
            }, 3000);
        }
    }

    render() {

        return this.state.redirect ? <Navigate to={this.state.path} /> : (
            <React.Fragment>
                { this.state.loading ?  <p style={{paddingTop : '200px'}}>Loading...</p> :
                    (<Container className="body">
                        <Row>
                            <Col className={classes.upcomingHeader} md={"12"}>
                                <h3>Upcoming quizzes</h3>
                            </Col>
                            {
                                this.state.upcomingQuizzes.length > 0 ? this.state.upcomingQuizzes.map((quiz, index) => (
                                    <Col md="6" key={quiz.key} onClick={() => this.attemptQuiz(quiz, false)}>
                                        <div className={classes.listItem}>
                                            <h5>Quiz No.{index}: {quiz.title}</h5>
                                            <p>Date: {quiz.date} | Time: {quiz.time}</p>
                                        </div>
                                    </Col>
                                )) : <Col md={"12"}>
                                    <h5 className={classes.noData}>No quiz found</h5>
                                </Col>
                            }
                        </Row>
                        <Row>
                            <Col className={classes.upcomingHeader} md={"12"}>
                                <h3>Previous Quizzes</h3>
                            </Col>
                            {
                                this.state.previousQuizzes.length > 0 ? this.state.previousQuizzes.map((quiz, index) => (
                                    <Col md="6" key={quiz.key} onClick={() => this.attemptQuiz(quiz, true)}>
                                        <div className={classes.listItem}>
                                            <h5>Quiz No.{index}: {quiz.title}</h5>
                                            <p>Date: {quiz.date} | Time: {quiz.time}</p>
                                        </div>
                                    </Col>
                                )) : <Col md={"12"}>
                                    <h5 className={classes.noData}>No quiz found</h5>
                                </Col>
                            }
                        </Row>
                    </Container>)
                }
                { this.state.toast.show &&
                    <Toastify
                        type={this.state.toast.type}
                        show={this.state.toast.show}
                        text={this.state.toast.text}
                        delay={3000}/>
                }
            </React.Fragment>
        )
    };
}

const mapStateToProps = (state) => {
    return {
        quizzes: state.quizReducer.quizzes
    }
}

const mapDispatchToProps = (dispatch) => {

    return bindActionCreators({
        setQuizzes: (list) => setQuizList(list),
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Quizzes);
