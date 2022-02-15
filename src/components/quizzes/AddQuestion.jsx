import React, {Component} from "react";
import classes from './AddQuestion.module.css';

class AddQuestion extends Component {

    constructor(props) {
        super(props);
        this.question = React.createRef();
        this.correctAnswer = React.createRef();
        this.marks = React.createRef();
        this.getReason = React.createRef();
        this.optionA = React.createRef();
        this.optionB = React.createRef();
        this.optionC = React.createRef();
        this.optionD = React.createRef();
        this.part1 = React.createRef();
        this.part2 = React.createRef();
    }

    AddQuestion = async (event) => {
        event.preventDefault();
        var question = {};
        if(this.props.type === 'bool'){
            question.questionId = `id_${Math.random()}`;
            question.question = this.question.current.value;
            question.correctAnswer = this.correctAnswer.current.value;
            question.type = 'bool';
            question.getReason = this.getReason.current.value;
            question.marks = this.marks.current.value
        } else if(this.props.type === 'mcq'){
            question.questionId = `id_${Math.random()}`;
            question.question = this.question.current.value;
            question.correctAnswer = this.correctAnswer.current.value;
            question.type = 'mcq';
            question.options = [{text: this.optionA.current.value, checked: false}, {text: this.optionB.current.value, checked: false},
                {text: this.optionC.current.value, checked: false}, {text: this.optionD.current.value, checked: false}];
            question.marks = this.marks.current.value
        } else if(this.props.type === 'fillInBlank'){
            question.questionId = `id_${Math.random()}`;
            question.part1 = this.part1.current.value;
            question.part2 = this.part2.current.value;
            question.correctAnswer = this.correctAnswer.current.value;
            question.type = 'fillInBlank';
            question.marks = this.marks.current.value
        } else if(this.props.type === 'short'){
            question.questionId = `id_${Math.random()}`;
            question.question = this.question.current.value;
            question.correctAnswer = this.correctAnswer.current.value;
            question.type = 'short';
            question.marks = this.marks.current.value
        }

        this.props.sumitQuestion(question);
        await this.setState( {
        }, () => {});
    }

    render() {
        return (
            <React.Fragment>
                <div className={classes.form}>
                    { this.props.type === 'mcq' && <form onSubmit={this.AddQuestion}>

                        <h3 className={classes.questionHeading}>Add Question</h3>

                        <div className={classes.fieldContainer}>
                            <input required={true} ref={this.question} className={classes.inputField} type="text" id="question"
                                   placeholder="Type a question..."/>
                        </div>

                        <div className={classes.fieldContainer}>
                            <input required={true} ref={this.optionA} className={classes.inputField} type="text" id="optionA" placeholder="Option A"/>
                        </div>

                        <div className={classes.fieldContainer}>
                            <input required={true} ref={this.optionB} className={classes.inputField} type="text" id="optionB" placeholder="Option B"/>
                        </div>

                        <div className={classes.fieldContainer}>
                            <input required={true} ref={this.optionC} className={classes.inputField} type="text" id="optionC" placeholder="Option C"/>
                        </div>

                        <div className={classes.fieldContainer}>
                            <input required={true} ref={this.optionD} className={classes.inputField} type="text" id="optionD" placeholder="Option D"/>
                        </div>

                        <div className={classes.fieldContainer}>
                            <input required={true} ref={this.marks} className={classes.inputField} min={1} max={2} type="number" id="marks" placeholder="Marks (1-5)"/>
                        </div>

                        <select required={true} ref={this.correctAnswer} className={classes.selectField} name="answer" id="answer" placeholder="Correct Answer">
                            <option value="">-- Select Correct Answer --</option>
                            <option value="a">A</option>
                            <option value="b">B</option>
                            <option value="c">C</option>
                            <option value="d">D</option>
                        </select>
                        <div className={classes.fieldContainer}>
                            <input className={classes.submitButton} type="submit" value={"Submit"}/>
                        </div>

                    </form>}

                    { this.props.type === 'fillInBlank' && <form onSubmit={this.AddQuestion}>
                        <div className={classes.fieldContainer}>
                            <input required={true} minLength={10} ref={this.part1} className={classes.inputField} type="text" id="part1"
                                   placeholder="Question part before blank space..."/>
                        </div>

                        <div className={classes.fieldContainer}>
                            <input required={true} minLength={10} ref={this.part2} className={classes.inputField} type="text" id="part2"
                                   placeholder="Question part after black space..."/>
                        </div>

                        <div className={classes.fieldContainer}>
                            <input required={true} minLength={1} ref={this.correctAnswer} className={classes.inputField} type="text" id="answer"
                                   placeholder="Type answer for blank space..."/>
                        </div>

                        <div className={classes.fieldContainer}>
                            <input required={true} ref={this.marks} className={classes.inputField} type="number" id="marks" placeholder="Marks (1-5)"/>
                        </div>

                        <div className={classes.fieldContainer}>
                            <input className={classes.submitButton} type="submit" value={"Add question"}/>
                        </div>

                    </form>}

                    { this.props.type === 'short' ? <form  onSubmit={this.AddQuestion}>
                        <div className={classes.fieldContainer}>
                            <input required={true} ref={this.question} className={classes.inputField} type="text" id="question"
                                   placeholder="Type a question..."/>
                        </div>

                        <div className={classes.fieldContainer}>
                                <textarea required={true} ref={this.correctAnswer} rows="4" col="20" className={classes.textareaField} id="answer"
                                          placeholder="Type correct answer..."/>
                        </div>

                        <div className={classes.fieldContainer}>
                            <input required={true} ref={this.marks} className={classes.inputField} type="number" id="marks" placeholder="Marks (1-5)"/>
                        </div>

                        <div className={classes.fieldContainer}>
                            <input className={classes.submitButton} type="submit" value={"Add question"}/>
                        </div>

                    </form> : '' }

                    { this.props.type === 'bool' ? <form onSubmit={this.AddQuestion}>
                        <div className={classes.fieldContainer}>
                            <input required={true} ref={this.question} minLength={15} className={classes.inputField} type="text" id="question"
                                   placeholder="Type a question..."/>
                        </div>

                        <select required={true} ref={this.correctAnswer} className={classes.selectField} name="answer" id="answer" placeholder="Correct Answer">
                            <option value="">-- Select Correct Option --</option>
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>

                        <div className={classes.fieldContainer}>
                            <input required={true} ref={this.marks} className={classes.inputField} type="number" min={1} max={5} id="marks" placeholder="Marks (1-5)"/>
                        </div>

                        <h4 className={classes.questionHeading}>Do you want to get reason for true or false answer?</h4>
                        <select ref={this.getReason} className={classes.selectField} name="answer" required={true} id="answer" placeholder="Correct Answer">
                            <option value="">-- Select your choice --</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                        <div className={classes.fieldContainer}>
                            <input className={classes.submitButton} type="submit" value={"Add question"}/>
                        </div>
                    </form> : "" }
                </div>
            </React.Fragment>
        )
    };
}

export default AddQuestion;
