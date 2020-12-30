import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import LoginPage from '../pages/Mobile/login_page';
import SignupPage from '../pages/Mobile/signup_page';
import ChatList from '../pages/Mobile/chat_list';
import OtherUserMessageList from '../pages/Mobile/other_user_message_list';
import ContactList from '../pages/Mobile/contact_list';
import ShowMessage from '../components/message/showmessage';
import SettingPage from '../pages/Mobile/setting_page';
import ProfilePage from '../pages/Mobile/profile_page';


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
                             render={ props =>(<OtherUserMessageList  {...props} isUserLoggedIn={this.props.isUserLoggedIn}/>)}>
                      </Route>

                      <Route exact
                             path="/ChatPage"
                             render={ props =>(<ChatList {...props} isUserLoggedIn={this.props.isUserLoggedIn}/>)}>
                      </Route>

                      <Route exact
                             path="/SettingPage"
                             render={ props =>(<SettingPage {...props} isUserLoggedIn={this.props.isUserLoggedIn}/>)}>
                      </Route>

                      <Route exact
                             path="/ProfilePage"
                             render={ props =>(<ProfilePage {...props} isUserLoggedIn={this.props.isUserLoggedIn}/>)}>
                      </Route>
                      <Route exact
                             path="/ContactPage"
                             render={ props =>(<ContactList {...props} isUserLoggedIn={this.props.isUserLoggedIn}/>)}>
                      </Route>
                    </Switch>
              </Router>
             )
    }
  }

  export default Routes;
