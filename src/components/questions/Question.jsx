
import React, {Component} from "react";
import classes from './Question.module.css'
import {Col, Row} from "react-bootstrap";
class Question extends Component {

    constructor(props) {
        super(props);
        this.state= {
        };
    }

    componentDidMount() {
    }

    updateAnswer(event){
        this.props.updateAnswer(this.props.index, event.target.value);
    }

    mcqSelectionChanged = async (index, event) => {
        const { name, value } = event.target;
        await this.setState({
            [name]: value
        });
        this.props.updateAnswer(this.props.index, this.state[`${this.props.type}`]);
    };

    boolSelectionChanged = async (event) => {
        const { name, value } = event.target;
        await this.setState({
            [name]: value
        });
        this.props.updateAnswer(this.props.index, this.state[`${this.props.type}`]);
    };

    saveReason = (event) => {
        this.props.updateReason(this.props.index, event.target.value);
    }

    render() {

        return (
            <React.Fragment>
                <Row>
                    <Col xs={"9"}><h6>Question No. {this.props.questionNo}</h6></Col>
                    <Col xs={"3"} className={classes.marksCol}><p>Marks: {this.props.marks}</p></Col>
                </Row>
                {this.props.type === 'mcq' && <div className={classes.question}>
                    <p> {this.props.question}</p>
                    <div>
                        <form>
                            {
                                this.props.options.map((option, index) => (
                                    <div>
                                        <input className={classes.radioButton}
                                            type="radio" id={option.text} name={this.props.type}
                                            value={option.text} onChange={this.mcqSelectionChanged.bind(this, index)} /> {option.text}
                                    </div>
                                ))
                            }
                        </form>
                    </div>
                </div>}
                {this.props.type === 'bool' && <div className={classes.question}>
                    <p>{this.props.question.question}</p>
                    <div>
                        <form>
                            <input className={classes.radioButton}
                                type="radio" id={"true"} name={this.props.type}
                                value={"true"} onChange={this.boolSelectionChanged.bind(this)} /> True
                            <input className={classes.radioButton}
                                type="radio" id={"false"} name={this.props.type}
                                value={"false"} onChange={this.boolSelectionChanged.bind(this)} /> False
                        </form>
                    </div>
                    { this.props.question.getReason === true && <div>
                        <p>Give the reason for your answer.</p>
                        <textarea onChange={this.saveReason.bind(this)} className={`${classes.radioButton} ${classes.textareaField}`} name={this.props.questionId} placeholder={"Type answer..."} />
                    </div>}
                </div>}
                {this.props.type === 'fillInBlank' && <div className={classes.question}>
                    <div> {this.props.question.part1}
                        <input onChange={this.updateAnswer.bind(this)} className={`${classes.radioButton} ${classes.blankSpace}`} type="text" name={this.props.questionId} placeholder={"Fill in the blank..."} />
                        {this.props.question.part2}
                    </div>
                </div>}

                {this.props.type === 'short' && <div className={classes.question}>
                    <div> <p>{this.props.question}</p>
                        <textarea onChange={this.updateAnswer.bind(this)} className={`${classes.radioButton} ${classes.textareaField}`} name={this.props.questionId} placeholder={"Type answer..."} />
                    </div>
                </div>}
            </React.Fragment>
        )
    }
}

export default Question;
