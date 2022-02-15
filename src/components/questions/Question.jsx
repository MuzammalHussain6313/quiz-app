
import React, {Component} from "react";
import classes from './Question.module.css'
class Question extends Component {

    constructor(props) {
        super(props);
        this.state= {

        }
    }

    selectionChanged = () => {
    }

    render() {

        return (
            <React.Fragment>
                {this.props.type === 'mcq' && <div className={classes.question}>
                    <h6>Question No. {this.props.questionNo}</h6>
                    <p> {this.props.question}</p>
                    <div>
                        <form>
                            <input className={classes.radioButton} type="radio" name={this.props.questionId} value=""
                                   onChange={this.selectionChanged} checked={this.props.options[0].checked}/> {this.props.options[0].text}
                            <input className={classes.radioButton} type="radio" name={this.props.questionId} value=""
                                   onChange={this.selectionChanged} checked={this.props.options[1].checked}/> {this.props.options[1].text}
                            <input className={classes.radioButton} type="radio" name={this.props.questionId} value=""
                                   onChange={this.selectionChanged} checked={this.props.options[2].checked}/> {this.props.options[2].text}
                            <input className={classes.radioButton} type="radio" name={this.props.questionId} value=""
                                   onChange={this.selectionChanged} checked={this.props.options[3].checked}/> {this.props.options[3].text}
                        </form>
                    </div>
                </div>}
                {this.props.type === 'bool' && <div className={classes.question}>
                    <h6>Question No. {this.props.questionNo}</h6>
                    <p> {this.props.question}</p>
                    <div>
                        <form>
                            <input className={classes.radioButton} type="radio" onChange={this.selectionChanged} name={this.props.questionId} value="true"
                                   checked={false}/> True
                            <input className={classes.radioButton} type="radio" onChange={this.selectionChanged} name={this.props.questionId} value="false"
                                   checked={false}/> False
                        </form>
                    </div>
                </div>}
                {this.props.type === 'fillInBlank' && <div className={classes.question}>
                    <h6>Question No. {this.props.questionNo}</h6>
                    <div> {this.props.question.part1}
                        <input className={`${classes.radioButton} ${classes.blankSpace}`} type="text" name={this.props.questionId} placeholder={"Fill in the blank..."} />
                        {this.props.question.part2}
                    </div>
                </div>}

                {this.props.type === 'short' && <div className={classes.question}>
                    <h6>Question No. {this.props.questionNo}</h6>
                    <div> <p>{this.props.question}</p>
                        <textarea className={`${classes.radioButton} ${classes.textareaField}`} name={this.props.questionId} placeholder={"Type answer..."} />
                    </div>
                </div>}
            </React.Fragment>
        )
    }
}

export default Question;
