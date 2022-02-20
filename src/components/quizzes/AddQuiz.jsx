import React, {Component} from "react";
import classes from './AddQuiz.module.css';
import AddQuestion from '../quizzes/AddQuestion';
import Question from "../questions/Question";
import {Col, Row} from "react-bootstrap";
import Toastify from "../../customUI/showToast/Toastify";
import {state} from "../../api";


class AddQuiz extends Component{

    constructor(props) {
        super(props);
        this.state = {
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
        this.title = React.createRef();
        this.date = React.createRef();
        this.time = React.createRef();
        this.totalMarks = React.createRef();
    }

    componentDidMount() {
        console.log('state' , state);
    }

    addQuiz(event) {
        event.preventDefault();
        if(this.state.questions.length === 0){
            this.showToast('No question added to the quiz. Please add questions to add quiz.', 'error');
            return;
        } else if(this.state.marks !== parseInt(this.totalMarks.current.value)) {
            this.showToast('The total of marks of questions should be equal to quiz marks.', 'error');
            return;
        }

        var quiz = {
            quizId: `quizId_${Math.random()}`,
            title: this.title.current.value,
            totalMarks: this.totalMarks.current.value,
            date: this.date.current.value,
            time: this.time.current.value,
            questions: this.state.questions
        };
        var quizzes = JSON.parse(localStorage.getItem('quizzes'));
        if (quizzes) {
            quizzes.push(quiz);
        } else {
            quizzes = [quiz];
        }
        localStorage.setItem('quizzes', JSON.stringify(quizzes));
        this.goToHome();
    }

    async showHideQuestions() {
        await this.setState( {
            showQuestions: !this.state.showQuestions
        }, () => {});
    }

    async addQuestion(question) {
        await this.setState( {
            questions: [...this.state.questions, question],
            marks: this.state.marks + parseInt(question.marks)
        }, () => {});
        console.log(this.state);
        await this.setState( {
            type: ''
        }, () => {
        });
    }

    typeChanged = event => {
        this.setState({ type: event.target.value });
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

    getMinDate() {
        var month = `${new Date().getMonth()+1 >= 10 ? new Date().getMonth()+1:`0${new Date().getMonth()+1}`}`;
        var date = `${new Date().getDate() >= 10 ? new Date().getDate():`0${new Date().getDate()}`}`;
        return `${new Date().getFullYear()}-${month}-${date}`;
    }

    getMaxDate() {
        var month = `${new Date().getMonth()+1 >= 10 ? new Date().getMonth()+1:`0${new Date().getMonth()+1}`}`;
        var date = `${new Date().getDate() >= 10 ? new Date().getDate():`0${new Date().getDate()}`}`;
        return `${new Date().getFullYear() + 1}-${month}-${date}`;
    }

    getTotalMarks() {
        var sum = 0;
        this.state.questions.forEach((question) => {
            sum += parseInt(question.marks);
        });
        return sum;
    }

    goToHome(){
        var navigator = document.getElementById("navigate");
        navigator.click();
    }

    render (){
        return (
            <div className="body">
                <h2>Add New Quiz</h2>
                <form id={"quizForm"} className={classes.form} ref={this.form} onSubmit={this.addQuiz.bind(this)}>
                    <div className={classes.fieldContainer}>
                        <input ref={this.title} required={true} maxLength={50} minLength={10} className={classes.inputField} type="text" id="quizTitle" placeholder="Quiz Title"/>
                    </div>

                    <div className={classes.fieldContainer}>
                        <input ref={this.totalMarks} required={true} max={100} min={5} className={classes.inputField} type="number" id="marks" placeholder="Total Marks"/>
                    </div>

                    <div className={classes.fieldContainer}>
                        <input ref={this.date} required={true} max={this.getMaxDate()} min={this.getMinDate()} className={classes.inputField} type="date" id="date" placeholder="Date"/>
                    </div>

                    <div className={classes.fieldContainer}>
                        <input ref={this.time} required={true} className={classes.inputField} type="time" id="time" placeholder="Start Time"/>
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
                                { (question.type === 'fillInBlank' || question.type === 'bool') ? <Question key={question.questionId}
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
                            </div>
                            )
                        )
                    }
                    <Row>
                        <Col xs={"9"}><h6>Total marks</h6></Col>
                        <Col xs={"3"} className={classes.marksCol}><p>{this.getTotalMarks()}</p></Col>
                    </Row>
                </div>}
                { this.state.toast.show &&
                    <Toastify
                        type={this.state.toast.type}
                        show={this.state.toast.show}
                        text={this.state.toast.text}
                        delay={3000}/>
                }
                <a id={"navigate"} href={"/"}/>
            </div>
        );
    }
}

export default AddQuiz;
