import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Header extends Component
{
  constructor(props)
  {
    super(props);

    this.user_logout = this.user_logout.bind(this);
  }

  user_logout()
  {
    const token = document.querySelector('meta[name="csrf-token"]').content;
    const url = "/api/v1/user/logout";
    axios.defaults.headers.delete['X-CSRF-Token'] = token;
    axios.delete(url, {withCredentials:true}).then(response => {
                                                                  if(response.data.is_user_logged_out)
                                                                  {
                                                                     this.setState({isUserLoggedIn: false})
                                                                     this.props.history.push('/LoginPage')
                                                                  }

                                                             })
                                            .catch(error =>  {
                                                                 alert("error");
                                                                 console.log(error);
                                                             })

  }

  render()
  {
    return(
              <div>
                <ul>
                  <li>Name</li>
                  <li>
                    <button onClick={this.user_logout}>Log Out</button>
                  </li>
                </ul>
              </div>
          )
  }
}

export default Header;
