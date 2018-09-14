import React from 'react';
import { connect } from 'react-redux';

const AuthorizationComponent = 
(roles) => 
{
  class ComponentWithAuthorization extends React.Component {
    constructor(props) {
      super(props)
    }
    
    render() {
      const { children=null } = this.props;
      const { role } = (this.props.authorization && this.props.authorization.user) || {};

      if (roles.includes(role)) {
        return children;
      } else {
        return null;
      }
    }
   
  }

    const mapStateToProps = (state, ownProps) => {
        const { authorization } = state;
        return {
            authorization
        };
    }

  return connect(
     mapStateToProps)
     (ComponentWithAuthorization);
}

  export default AuthorizationComponent;
