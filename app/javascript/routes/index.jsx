import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import LoginPage from '../pages/login_page';
import SignupPage from '../pages/signup_page';
import MessagePage from '../pages/message_page';


class Routes extends Component
{
  constructor(props)
  {
      super(props)
  }

  render()
  {
      return(
              <Router>
                    <Switch>

                      <Route
                          exact
                          path="/LoginPage"
                          render={ props =>(<LoginPage {...props} isUserLoggedIn={this.props.isUserLoggedIn}/>)}>
                      </Route>

                      <Route
                          exact
                          path="/SignupPage"
                          render={ props =>(<SignupPage {...props} isUserLoggedIn={this.props.isUserLoggedIn}/>)}>
                      </Route>

                      <Route exact
                             path="/MessagePage"
                             render={ props =>(<MessagePage {...props} isUserLoggedIn={this.props.isUserLoggedIn}/>)}>
                      </Route>

                    </Switch>
              </Router>
             )
    }
  }

  export default Routes;
