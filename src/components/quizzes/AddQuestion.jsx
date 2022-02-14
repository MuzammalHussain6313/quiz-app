import React, {useRef} from "react";
import classes from './AddQuestion.module.css';

const AddQuestion = (props) => {

    const question = useRef();
    const correctAnswer = useRef();
    const marks = useRef();

    const getReason = useRef();

    const AddQuestion = (event) => {
        event.preventDefault();
        props.sumitQuestion({
            questionId: `id_${Math.random()}`,
            question: question.current.value,
            correctAnswer: correctAnswer.current.value,
            type: 'bool',
            getReason: getReason.current.value,
            marks: marks.current.value
        });
        console.log("Question: ", question.current.value, "correct answer: ", correctAnswer.current.value, "reason: ", getReason.current.value, " -- ", marks.current.value);
    }

    return (
        <React.Fragment>
            <div className={classes.form}>
                { props.type === 'mcq' && <form>

                    <h3 className={classes.questionHeading}>Add Question</h3>

                    <div className={classes.fieldContainer}>
                        <input className={classes.inputField} type="text" id="question"
                               placeholder="Type a question..."/>
                    </div>

                    <div className={classes.fieldContainer}>
                        <input className={classes.inputField} type="text" id="optionA" placeholder="Option A"/>
                    </div>

                    <div className={classes.fieldContainer}>
                        <input className={classes.inputField} type="text" id="optionB" placeholder="Option B"/>
                    </div>

                    <div className={classes.fieldContainer}>
                        <input className={classes.inputField} type="text" id="optionC" placeholder="Option C"/>
                    </div>

                    <div className={classes.fieldContainer}>
                        <input className={classes.inputField} type="text" id="optionD" placeholder="Option D"/>
                    </div>

                    <div className={classes.fieldContainer}>
                        <input className={classes.inputField} type="number" id="marks" placeholder="Marks (1-5)"/>
                    </div>

                    <select className={classes.selectField} name="answer" id="answer" placeholder="Correct Answer">
                        <option value="">-- Select Correct Answer --</option>
                        <option value="a">A</option>
                        <option value="b">B</option>
                        <option value="c">C</option>
                        <option value="d">D</option>
                    </select>

                </form>}

                { props.type === 'fillInBlank' && <form>
                    <div className={classes.fieldContainer}>
                        <input className={classes.inputField} type="text" id="part1"
                               placeholder="Question part before blank space..."/>
                    </div>

                    <div className={classes.fieldContainer}>
                        <input className={classes.inputField} type="text" id="part2"
                               placeholder="Question part after black space..."/>
                    </div>

                    <div className={classes.fieldContainer}>
                        <input className={classes.inputField} type="text" id="answer"
                               placeholder="Type answer for blank space..."/>
                    </div>

                    <div className={classes.fieldContainer}>
                        <input className={classes.inputField} type="number" id="marks" placeholder="Marks (1-5)"/>
                    </div>

                </form>}

                { props.type === 'short' ? <form>
                    <div className={classes.fieldContainer}>
                        <input className={classes.inputField} type="text" id="question"
                               placeholder="Type a question..."/>
                    </div>

                    <div className={classes.fieldContainer}>
                            <textarea rows="4" col="20" className={classes.textareaField} type="text" id="answer"
                                      placeholder="Type correct answer..."/>
                    </div>

                    <div className={classes.fieldContainer}>
                        <input className={classes.inputField} type="number" id="marks" placeholder="Marks (1-5)"/>
                    </div>

                </form> : '' }

                { props.type === 'bool' ? <form onSubmit={AddQuestion}>
                    <div className={classes.fieldContainer}>
                        <input ref={question} minLength={15} className={classes.inputField} type="text" id="question"
                               placeholder="Type a question..."/>
                    </div>

                    <select required={true} ref={correctAnswer} className={classes.selectField} name="answer" id="answer" placeholder="Correct Answer">
                        <option value="">-- Select Correct Option --</option>
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>

                    <div className={classes.fieldContainer}>
                        <input ref={marks} className={classes.inputField} type="number" min={1} max={5} id="marks" placeholder="Marks (1-5)"/>
                    </div>

                    <h4 className={classes.questionHeading}>Do you want to get reason for true or false answer?</h4>
                    <select ref={getReason} className={classes.selectField} name="answer" required={true} id="answer" placeholder="Correct Answer">
                        <option value="">-- Select your choice --</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                    <div className={classes.fieldContainer}>
                        {/*onClick={() => AddQuestion() }*/}
                        <input className={classes.submitButton} type="submit" value={"Submit"}/>
                    </div>
                </form> : "" }
            </div>
        </React.Fragment>
    );
}

export default AddQuestion;
