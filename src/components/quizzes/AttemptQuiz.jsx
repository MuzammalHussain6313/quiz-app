
import React, {Component} from "react";
import {Row, Col, Button} from "react-bootstrap";
import Question from "../questions/Question";
import classes from './AttemptQuiz.module.css'
import Toastify from "../../customUI/showToast/Toastify";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import {addAttemptedQuizzes} from "../../api";

class AttemptQuiz extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toast: {
            show: false,
                text: '',
                type: '' // success | error
            },
            redirect: false,
            path: '/',
            quizId: '',
            quiz: {},
            isPrevious: true,
        }
    }

    componentDidMount() {
        const params = window.location.pathname;
        var quizId = params.slice(params.lastIndexOf('/')+1);
        this.setIsPrevious(parseInt(quizId[0]));
        quizId = params.slice(params.lastIndexOf('/')+2);
        var quizzes = this.props.quizzes;
        if(quizzes.length > 0) {
            var quiz = quizzes.filter((quiz) => quiz.key === quizId)[0];
            quiz.questions.forEach((question) => {
                if (question.type === 'bool' && question?.getReason === true) {
                    question['answer'] = '';
                    question['reason'] = '';
                } else {
                    question['answer'] = '';
                }
            });
            this.setQuiz(quiz);
        }
    }

    async setIsPrevious(value){
        await this.setState((prevState, props) => ({
            isPrevious: value === 1 ? true : false
        }));
    }

    async updateAnswer(index, answer){
        var questions = this.state.quiz.questions;
        questions[index].answer = answer;
        await this.setState((prevState, props) => ({
            questions: questions
        }));
    }

    async updateReason(index, reason){
        var questions = this.state.quiz.questions;
        questions[index].reason = reason;
        await this.setState((prevState, props) => ({
            questions: questions
        }));
    }

    async setQuiz(quiz){
        await this.setState((prevState, props) => ({quiz: quiz}));
    }

    async submitQuiz(){
        this.state.quiz.questions.forEach((question, index) => {
           if(question.answer === ''){
               this.showToast(`Please write answer for question no.${index+1}`, 'error');
               return;
           } else if(question.type === 'bool' && question.reason === ''){
               this.showToast(`Please give a reason for your answer on question no.${index+1}`, 'error');
               return;
           }
        });
        console.log("questions with answers: ", this.state);
        await addAttemptedQuizzes(this.state.quiz).then(() => {
            this.goToHome();
        });
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

    async goToHome(){
        await this.setState((prevSate, props) => ({
            redirect: true,
            path: '/quizzes'
        }))
    }

    render() {
        return this.state.redirect ? <Navigate to={this.state.path} /> : (
            <React.Fragment>
                <div className="body">
                    <Row className={classes.header}>
                        <Col md={"9"}>
                            <h4>{this.state.title}</h4>
                            <p>{this.state.date}, {this.state.time}</p>
                        </Col>
                        <Col className={classes.marksContainer} md={"3"}>
                            <h5>Marks: {this.state.totalMarks}</h5>
                        </Col>
                    </Row>
                    <Row className={classes.questions}>
                        {
                            this.state.quiz.questions && this.state.quiz.questions.map((question, index) => (
                                <Col md={"12"} key={question.quizId}>
                                    {   (question.type === 'fillInBlank') ?
                                        <Question key={question.questionId}
                                            type={question.type}
                                            questionNo={index + 1}
                                            question={question}
                                            marks={question.marks}
                                            index={index}
                                            updateAnswer={this.updateAnswer.bind(this)}
                                        />
                                        : (question.type === 'bool') ?
                                        <Question key={question.questionId}
                                            type={question.type}
                                            questionNo={index + 1}
                                            question={question}
                                            index={index}
                                            marks={question.marks}
                                            updateAnswer={this.updateAnswer.bind(this)}
                                            updateReason={this.updateReason.bind(this)}
                                        />
                                        : (question.type === 'short') ?
                                        <Question key={question.questionId}
                                              type={question.type}
                                              questionNo={index + 1}
                                              question={question.question}
                                              index={index}
                                              marks={question.marks}
                                              updateAnswer={this.updateAnswer.bind(this)}
                                        />
                                        :<Question key={question.questionId}
                                            type={question.type}
                                            questionNo={index + 1}
                                            question={question.question}
                                            marks={question.marks}
                                            index={index}
                                            options={question.options}
                                            updateAnswer={this.updateAnswer.bind(this)}
                                        />
                                    }
                                </Col>
                            ))
                        }
                    </Row>
                    <Row className={classes.buttonRow}>
                        <Col md={"6"}>
                            { !this.state.isPrevious && <Button className={classes.submitButton} onClick={()=> {this.submitQuiz()}}>Submit Quiz</Button>}
                        </Col>
                    </Row>
                </div>
                { this.state.toast.show && <Toastify
                    type={this.state.toast.type}
                    show={this.state.toast.show}
                    text={this.state.toast.text}
                    delay={3000}/>
                }
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        quizzes: state.quizReducer.quizzes
    }
}

const mapDispatchToProps = (dispatch) => {

    return bindActionCreators({
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AttemptQuiz);
