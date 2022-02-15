import React, {Component, createRef} from "react";
import classes from './AddQuiz.module.css';
import AddQuestion from '../quizzes/AddQuestion';
import Question from "../questions/Question";

import {Col, Row} from "react-bootstrap";
import Toastify from "../../customUI/showToast/Toastify";

class AddQuiz extends Component{

    constructor(props) {
        super(props);
        this.state ={
            type: '',
            questions: [],
            showQuestions: false,
            marks: 0,
            toast: {
                show: false,
                text: '',
                type: '' // success | error
            }
        };
        this.questionType = React.createRef();
        this.form = React.createRef();
        this.totalMarks = React.createRef();
    }

    addQuiz() {
        if(this.state.questions.length === 0){
            this.showToast('No question added to the quiz. Please add questions to add quiz.', 'error');
        } else if(this.state.marks !== this.totalMarks.current.value) {
            this.showToast('The total of marks of questions should be equal to quiz marks.', 'error');
        }
    }

    async showHideQuestions() {
        await this.setState( {
            showQuestions: !this.state.showQuestions
        }, () => {});
    }

    async addQuestion(question) {
        await this.setState( {
            questions: [...this.state.questions, question],
            marks: this.state.markks + question.marks
        }, () => {});
        await this.setState( {
            type: ''
        }, () => {
        });
    }

    typeChanged = event => {
        this.setState({ type: event.target.value });
    }

    showToast = (text, type) => {
        if(!this.state.toast.show){
            this.setState((prevState, props) => ({
                toast: { show : true, text : text, type : type }
            }));
            // setTimeout(() => {
            //     this.setState((prevState, props) => ({
            //         toast: { show : false, text : '', type : '' }
            //     }));
            // }, 3000);
        }
    }

    render (){
        return (
            <div>
                <h2>Add New Quiz</h2>
                <form id={"quizForm"} className={classes.form} ref={this.form} onSubmit={this.addQuiz.bind(this)}>
                    <div className={classes.fieldContainer}>
                        <input required={true} maxLength={50} minLength={10} className={classes.inputField} type="text" id="quizTitle" placeholder="Quiz Title"/>
                    </div>

                    <div className={classes.fieldContainer}>
                        <input ref={this.totalMarks} required={true} max={100} min={5} className={classes.inputField} type="number" id="marks" placeholder="Total Marks"/>
                    </div>

                    <div className={classes.fieldContainer}>
                        <input required={true} max={`${new Date().getFullYear() + 1}-${new Date().getMonth()}-${new Date().getDate()}`} min={new Date()} className={classes.inputField} type="date" id="date" placeholder="Date"/>
                    </div>

                    <div className={classes.fieldContainer}>
                        <input required={true} className={classes.inputField} type="time" id="time" placeholder="Start Time"/>
                    </div>

                    <div className={classes.fieldContainer}>
                        <select value={this.state.type} onChange={this.typeChanged} className={classes.inputField} name="questionType" id="time"
                                placeholder="Question Type">
                            <option value="">-- Select --</option>
                            <option value="mcq">MCQs</option>
                            <option value="fillInBlank">Fill in the blanks</option>
                            <option value="short">Short Questions</option>
                            <option value="bool">True / False</option>
                        </select>
                    </div>

                    <div className={classes.fieldContainer}>
                        <input className={classes.submitButton} type="submit" value={"Add Quiz"}/>
                    </div>

                </form>

                {this.state.type !== '' && <AddQuestion sumitQuestion={this.addQuestion.bind(this)} type={this.state.type}/>}

                {this.state.questions.length>0 && <div className={classes.questions}>
                    <Row>
                        <Col><h3>Questions Preview: </h3></Col>
                        <Col className={classes.iconCol}>
                            { this.state.showQuestions && <img className={classes.icons} onClick={this.showHideQuestions.bind(this)} src="/icons/down.svg" alt="image" />}
                            { !this.state.showQuestions && <img className={classes.icons} onClick={this.showHideQuestions.bind(this)} src="/icons/forward.svg" alt="image" />}
                        </Col>
                    </Row>
                    { this.state.showQuestions &&
                        this.state.questions.map((question, index) => (
                            <div>
                                { question.type === 'fillInBlank' ? <Question key={question.questionId}
                                    type={question.type}
                                    questionNo={index + 1}
                                    question={question}
                                    options={question.options}/>
                                : <Question key={question.questionId}
                                    type={question.type}
                                    questionNo={index + 1}
                                    question={question.question}
                                    options={question.options}/>}
                            </div>
                            )
                        )
                    }
                </div>}
                { this.state.toast.show &&
                    <Toastify
                        type={this.state.toast.type}
                        show={this.state.toast.show}
                        text={this.state.toast.text}
                        delay={3000}/>}
            </div>
        );
    }
}

export default AddQuiz;
