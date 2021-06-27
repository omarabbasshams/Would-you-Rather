
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { prepareLeaderBoard } from '../utils/helpers';

import Nav from './Nav';
import UserLoginRedirect from './UserLoginRedirect';

import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";


const LeaderTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#00897B',
    color: theme.palette.common.white,
    fontWeight: 500,
    fontSize: 14
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

class Userboard extends Component {

  render() {

    // Redirect to login page if app is in logged out state
    if (this.props.loggedOut) {
      return <UserLoginRedirect afterLogin='/Userboard'/>
    }

    const { Userboard } = this.props;

    return (
      <div className='leaderboard'>
        <Nav />
        <div className='leaderboard-table'>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <LeaderTableCell>Users</LeaderTableCell>
                  <LeaderTableCell numeric>Questions</LeaderTableCell>
                  <LeaderTableCell numeric>Answers</LeaderTableCell>
                  <LeaderTableCell numeric>Score</LeaderTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Userboard.map(User => {
                  return (
                    <TableRow key={User.id}>
                      <LeaderTableCell component="th" scope="row">
                        <img
                          alt='avatar'
                          src={require('../avatar/' + User.avatarURL)}
                          className='small-avatar'
                        />
                        <span className='Leader-name'>{User.name}</span>
                      </LeaderTableCell>
                      <LeaderTableCell numeric>{User.questions.length}</LeaderTableCell>
                      <LeaderTableCell numeric>{Object.keys(User.answers).length}</LeaderTableCell>
                      <LeaderTableCell numeric>{User.score}</LeaderTableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ users, authedUser }) => ({
    loggedOut: authedUser === null ,
    Userboard : prepareLeaderBoard(users)
});

export default connect(mapStateToProps)(Userboard);
