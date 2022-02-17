import React, {Component} from 'react';
import classes from './Quizzes.module.css';
import {Col, Row, Container} from "react-bootstrap";
import Toastify from "../../customUI/showToast/Toastify";

class Quizzes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            quizId: '',
            previousQuizzes: [
                // {
                //     id: '874t5w8f385845t98w',
                //     quizNo: 1,
                //     name: 'Chapter 1',
                //     description: 'This will not included in finals',
                //     questions: [
                //         {
                //             questionId: '8b734t58795897tf4bg78',
                //             question: 'When Pakistan Came into being?',
                //             type: 'mcq',
                //             options: [{checked: false, text: '1847'}, {checked: false, text: '1945'}, {
                //                 checked: false,
                //                 text: '1947'
                //             }, {checked: false, text: '1949'}]
                //         }
                //     ]
                // },
                // {
                //     id: '874t5w8f385845t99w',
                //     quizNo: 2,
                //     name: 'Chapter 2',
                //     description: 'This will included in finals',
                //     questions: []
                // },
                // {
                //     id: '874t5w8f385845t100w',
                //     quizNo: 3,
                //     name: 'Chapter 3',
                //     description: 'For general informations and this will not included in finals.',
                //     questions: []
                // },
                // {
                //     id: '874t5w8f385845t908w',
                //     quizNo: 4,
                //     name: 'chapter 5',
                //     description: 'chapter 5 will added in quizzes but not included in finals',
                //     questions: []
                // }
            ],
            upcomingQuizzes: [],
            toast: {
                show: false,
                text: '',
                type: '' // success | error
            }
        }
    }

    componentDidMount() {
        var quizzes = JSON.parse(localStorage.getItem('quizzes'));
        var previousQuizzes = [];
        var upcomingQuizzes = [];
        if(quizzes.length > 0) {
            quizzes.forEach((quiz) => {
                this.isTimePassed(`${quiz.date} ${quiz.time}`) ? previousQuizzes.push(quiz) : upcomingQuizzes.push(quiz);
            });
        }
        this.setQuizzes(upcomingQuizzes, previousQuizzes);
    }

    async setQuizzes(upcomingQuizzes, previousQuizzes) {
        await this.setState((prevState, props) => ({
            upcomingQuizzes: upcomingQuizzes,
            previousQuizzes: previousQuizzes
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
            this.openQuiz(quiz);
            return
        }
        const varDate = new Date(quiz.date);
        const today = new Date();
        if (varDate.toDateString() === today.toDateString() && this.checkTime(quiz.time)) {
            this.openQuiz(quiz);
        } else {
            this.showToast('Please wait until quiz time start. Thanks', 'error');
        }
    }

    async openQuiz(quiz) {
        await this.setState((prevState, props) => ({
            quizId: quiz.quizId
        }));
        var navigator = document.getElementById("navigate");
        navigator.click();
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
            // if quiz time passed.
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

        return (
            <React.Fragment>
                {
                    <Container className="body">
                        <Row>
                            <Col className={classes.upcomingHeader} md={"12"}>
                                <h3>Upcoming quizzes</h3>
                            </Col>
                            {
                                this.state.upcomingQuizzes.length > 0 ? this.state.upcomingQuizzes.map((quiz, index) => (
                                    <Col md="6" key={quiz.quizId} onClick={() => this.attemptQuiz(quiz, false)}>
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
                                    <Col md="6" key={quiz.quizId} onClick={() => this.attemptQuiz(quiz, true)}>
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
                    </Container>
                }
                { this.state.toast.show &&
                    <Toastify
                        type={this.state.toast.type}
                        show={this.state.toast.show}
                        text={this.state.toast.text}
                        delay={3000}/>
                }
                <a id={"navigate"} href={`/quizzes/${this.state.quizId}`}/>
            </React.Fragment>
        )
    };
}

export default Quizzes;
