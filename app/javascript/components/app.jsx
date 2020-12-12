import React, {Component} from 'react';
import Routes from '../routes/index.jsx';
import axios from 'axios';

class App extends Component
{

  constructor(props)
  {
    super(props);
    this.state = {
                    isUserLoggedIn: false
                 }

    this.setUserLoginStatus = this.setUserLoginStatus.bind(this);
  }

  componentDidMount()
  {
    this.is_user_loggedIn();
  }

  setUserLoginStatus(data)
  {
    this.setState(state => ({isUserLoggedIn: !state.is_user_loggedIn}))
  }

  is_user_loggedIn()
  {
    const token = document.querySelector('meta[name="csrf-token"]').content;
    const url   = "/api/v1/user/is_signed_in";
    axios.defaults.headers.post['X-CSRF-Token'] = token;
    axios.post(url, {withCredentials:true}).then(response => {
                                                                  if(response.data.is_user_logged_in)
                                                                  {
                                                                     this.setState({isUserLoggedIn: true})
                                                                  }

                                                             })
                                            .catch(error =>  {
                                                                 alert("error")
                                                             })
  }

  render()
  {
    return(
            <Routes setUserLoginStatus ={this.setUserLoginStatus} isUserLoggedIn = {this.state.isUserLoggedIn}/>
          )
  }
}

export default App;
