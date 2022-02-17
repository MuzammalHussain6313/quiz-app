
import React, {Component} from "react";
import {Row, Col, Button} from "react-bootstrap";
import Question from "../questions/Question";
import classes from './AttemptQuiz.module.css'

class AttemptQuiz extends Component {

    constructor(props) {
        super(props);
        this.state = {
            quiz: {}
        }
    }

    componentDidMount() {
        const params = window.location.pathname;
        var quizId = params.slice(params.lastIndexOf('/')+1);
        var quizzes = JSON.parse(localStorage.getItem('quizzes'));
        var quiz = quizzes.filter((quiz) => quiz.quizId === quizId)[0];
        this.setQuiz(quiz)
    }

    async setQuiz(quiz){
        await this.setState((prevState, props) => (quiz));
    }

    render() {
        return (
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
                            this.state.questions && this.state.questions.map((question, index) => (
                                <Col md={"12"} key={question.quizId}>
                                    { (question.type === 'fillInBlank' || question.type === 'bool') ?
                                        <Question key={question.questionId}
                                            type={question.type}
                                            questionNo={index + 1}
                                            question={question}
                                            marks={question.marks}
                                            options={question.options}/>
                                        : <Question key={question.questionId}
                                            type={question.type}
                                            questionNo={index + 1}
                                            question={question.question}
                                            marks={question.marks}
                                            options={question.options}/>}
                                </Col>
                            ))
                        }
                    </Row>
                    <Row className={classes.buttonRow}>
                        <Col md={"6"}>
                            <Button className={classes.submitButton} onClick={()=> {}}>Submit Quiz</Button>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        );
    }
}

export default AttemptQuiz;
