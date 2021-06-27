
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from './Nav';
import UserLoginRedirect from './UserLoginRedirect';
import Option from './Option';

import { handleAnswer } from '../actions/shared';

import { getPercentVotes, formatQuestion } from '../utils/helpers';

class Questions extends Component {

  handleClick = (answer) => {
    const { dispatch, qid } = this.props;
    dispatch(handleAnswer(qid, answer));
  }

  render() {

    // Redirect to login page if app is in logged out state
    if (this.props.loggedOut) {
      return <UserLoginRedirect afterLogin={`/questions/${this.props.qid}`}/>
    }

    const { question } = this.props;
    // If question does not exist, display message
    if (question === null) {
      return (
        <div className='question-page'>
          <Nav />
          <p>This question does not exist!</p>
        </div>
      );
    }

    const { hasAnswered, authorName, authorAvatar, optionOne, optionTwo,
      answer, optionOneVotes, optionTwoVotes } = question;
    const totalVotes = optionOneVotes + optionTwoVotes;
    const optionOnePerc = getPercentVotes(optionOneVotes, totalVotes);
    const optionTwoPerc = getPercentVotes(optionTwoVotes, totalVotes);

    return (
      <div className='question-page'>
        <Nav />
        <img className='big-avatar' alt='big avatar' src={require('../avatar/' + authorAvatar)}/>
        <span className='author-prompt'>{authorName} asks</span>
        <h2>Would you rather ...</h2>

        {
          hasAnswered && <div>
            <Option
              chosen={answer === 'optionOne'}
              optionText={optionOne}
              optionPerc={optionOnePerc}
              optionVotes={optionOneVotes}
              totalVotes={totalVotes}
            />
            <Option
              chosen={answer === 'optionTwo'}
              optionText={optionTwo}
              optionPerc={optionTwoPerc}
              optionVotes={optionTwoVotes}
              totalVotes={totalVotes}
            />
          </div>
        }

        {
          !(hasAnswered) && <div>
            <div className='option-open' onClick={() => this.handleClick('optionOne')}>
              {optionOne}?
            </div>
            <div className='option-open' onClick={() => this.handleClick('optionTwo')}>
              {optionTwo}?
            </div>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = ({authedUser, questions, users}, props) => {
  const { id } = props.match.params;
  const question = questions[id];
  return {
    loggedOut: authedUser === null,
    qid: id,
    question: question ? formatQuestion(question, users, authedUser) : null
  }
};

export default connect(mapStateToProps)(Questions);
