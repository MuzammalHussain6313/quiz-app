
import React from "react";
import classes from "../quizzes/AddQuestion.module.css";

const Question = (props) => {

    const  selectionChanged = () => {
    }
    return (
      <React.Fragment>
          { props.type === 'mcq' && <div>
              <h6>Question No. {props.questionNo}</h6>
              <p> {props.question}</p>
              <div>
                  <form>
                      <input type="radio" name={props.questionId} value="" checked={props.option.checked}/> {props.option.text}
                      <input type="radio" name={props.questionId} value="" checked={props.option.checked}/> {props.option.text}
                      <input type="radio" name={props.questionId} value="" checked={props.option.checked}/> {props.option.text}
                      <input type="radio" name={props.questionId} value="" checked={props.option.checked}/> {props.option.text}
                  </form>
              </div>
          </div> }
          { props.type === 'bool' && <div>
              <h6>Question No. {props.questionNo}</h6>
              <p> {props.question}</p>
              <div>
                  <form>
                      <input type="radio" onChange={selectionChanged} name={props.questionId} value="true" checked={false}/> True
                      <input type="radio" onChange={selectionChanged} name={props.questionId} value="false" checked={false}/> False
                  </form>
              </div>
          </div> }
      </React.Fragment>
    );
}

export default Question;
