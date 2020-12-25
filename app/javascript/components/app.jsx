import React, {Component} from 'react';
import Routes from '../routes/index.jsx';
import axios from 'axios';

class App extends Component
{

  constructor(props)
  {
    super(props);
    this.state = {
                    isUserLoggedIn: null
                 }
  }

  async componentDidMount()
  {
    var is_user_loggedIn = await this.is_user_loggedIn();
    this.setState({isUserLoggedIn: is_user_loggedIn});
  }


  async is_user_loggedIn()
  {
    const token = document.querySelector('meta[name="csrf-token"]').content;
    const url   = "/api/v1/user/is_signed_in";
    axios.defaults.headers.post['X-CSRF-Token'] = token;
    var is_user_loggedIn = await axios.post(url, {withCredentials:true});
    return is_user_loggedIn.data.is_user_logged_in;
  }


  render()
  {
    return(
            <div>
             <Routes isUserLoggedIn ={this.state.isUserLoggedIn}></Routes>
            </div>
          )
  }
  
}

export default App;
