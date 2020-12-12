import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class LoginPage extends Component
{
  constructor(props)
  {
    super(props)
    this.state = {
                    email:'',
                    password:''
                 }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }


  onChange(event)
  {
    this.setState( { [event.target.name] : event.target.value});
  }

  onSubmit(event)
  {
      event.preventDefault();
      const url = "/api/v1/user/login";
      const {email, password} = this.state;

      const body = {
                      email,
                      password
                   }

      const token = document.querySelector('meta[name="csrf-token"]').content;

      fetch(url, {
                        method: "POST",
                        headers: {
                                    "X-CSRF-Token": token,
                                    "Content-Type": "application/json"
                                  },
                        body: JSON.stringify(body)
                      })
            .then(response => {
                                  if (response.ok)
                                  {
                                      this.props.setUserLoginStatus(response);
                                      this.props.history.push("/MessagePage");
                                  }
                                  else
                                  {
                                    alert("The email and password is not correct")
                                  }
                              })
            .catch(error => {
                              console.log(error.message);
                            });
  }

  render()
  {
    return(
            <div>
              <form onSubmit={this.onSubmit}>

                    <div>
                        <label>Email</label>
                        <input name="email" onChange={this.onChange}/>
                    </div>

                    <div>
                        <label>Password</label>
                        <input name="password" onChange={this.onChange}/>
                    </div>

                    <div>
                        <button>LogIn</button>
                    </div>
              </form>
            </div>
          )
  }
}

export default LoginPage;
