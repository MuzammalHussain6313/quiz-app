import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {setQuizList} from "../../store/actions/actions";
import {connect} from "react-redux";

class NotFound extends Component {
    render() {
        return (
            <div className="notFound">
                Opps ! 404 page not found
            </div>
        )
    };
}
const mapStateToProps = (state) => {
    debugger
    return {
        quizList: state.quizReducer.quizzes
    }
}
const mapDispatchToProps = (dispatch) => {

    return bindActionCreators({
        setQuizzes: (list) => setQuizList(list),
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NotFound);
