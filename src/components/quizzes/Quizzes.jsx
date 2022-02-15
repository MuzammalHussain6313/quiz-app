import React, {Component} from 'react';
import classes from './Quizzes.module.css';
import {Col, Row, Container} from "react-bootstrap";

class Quizzes extends Component{

    constructor(props) {
        super(props);
        this.state ={
            quizzes: [
                {
                    id: '874t5w8f385845t98w',
                    quizNo: 1,
                    name: 'Chapter 1',
                    description: 'This will not included in finals',
                    questions: [
                        {
                            questionId: '8b734t58795897tf4bg78',
                            question: 'When Pakistan Came into being?',
                            type: 'mcq',
                            options: [{checked: false, text: '1847'}, {checked: false, text: '1945'}, {
                                checked: false,
                                text: '1947'
                            }, {checked: false, text: '1949'}]
                        }
                    ]
                },
                {
                    id: '874t5w8f385845t99w',
                    quizNo: 2,
                    name: 'Chapter 2',
                    description: 'This will included in finals',
                    questions: []
                },
                {
                    id: '874t5w8f385845t100w',
                    quizNo: 3,
                    name: 'Chapter 3',
                    description: 'For general informations and this will not included in finals.',
                    questions: []
                },
                {
                    id: '874t5w8f385845t908w',
                    quizNo: 4,
                    name: 'chapter 5',
                    description: 'chapter 5 will added in quizzes but not included in finals',
                    questions: []
                }
            ]
        }
    }

    render() {

        return (
            <React.Fragment>
                {
                    <Container>
                        <Row>
                            {this.state.quizzes.map((quiz) => (
                                <Col md="6" key={quiz.id}>
                                    <div className={classes.listItem}>
                                        <h3>Quiz No.{quiz.quizNo}: {quiz.name}</h3>
                                        <p>{quiz.description}</p>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                }
            </React.Fragment>
        )
    };
}

export default Quizzes;
