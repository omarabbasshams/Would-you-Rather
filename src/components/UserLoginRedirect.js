
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class UserLoginRedirect extends Component {

  render() {
    const { afterLogin } = this.props;
    return (
      <Redirect to={{
        pathname: '/',
        state: {
          afterLogin
        }
      }} />
    );
  }
}

export default UserLoginRedirect;
