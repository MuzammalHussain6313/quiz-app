
import React, {Component} from "react";
import {Row, Col} from "react-bootstrap";

class AttemptQuiz extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const params = window.location.pathname;
        var quizId = params.slice(params.lastIndexOf('/')+1)
        console.log(quizId);
        var quizzes = JSON.parse(localStorage.getItem('quizzes'));
    }

    render() {
        return (
            <React.Fragment>
                <div className="body">
                    <Row>
                        <Col md={"9"}>
                            <h3>{this.props.title}</h3>
                            <p>{this.props.date}, {this.props.time}</p>
                        </Col>
                        <Col md={"3"}>
                            <p>Marks: {this.props.totalMarks}</p>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        );
    }
}

export default AttemptQuiz;
