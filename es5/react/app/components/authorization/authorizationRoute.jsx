import React from 'react';
import { connect } from 'react-redux';

const AuthorizationRoute = 
(roles) =>
(WrappedComponent) => {

  class RouteWithAuthorization extends React.Component {
    constructor(props) {
      super(props)
    }
    
    render() {
      const { role } = (this.props.authorization && this.props.authorization.user) || {};
      
      if (roles.includes(role)) {
        return <WrappedComponent {...this.props} />
      } else {
        return <h1>Страница не найдена!</h1>
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
     (RouteWithAuthorization);
}

  export default AuthorizationRoute;
