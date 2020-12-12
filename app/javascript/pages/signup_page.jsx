import React, {Component} from 'react';
import axios from 'axios';

class SignupPage extends Component
{

  constructor(props)
  {
      super(props);
      this.state = {
                            email:'',
                            password:''
                      }
      this.onSubmit = this.onSubmit.bind(this);
      this.onChange = this.onChange.bind(this);
  }

  onChange(event)
  {
      this.setState({ [event.target.name]: event.target.value })
  }

  onSubmit(event)
  {
      event.preventDefault();
      const url = "/api/v1/user/signup";
      const token = document.querySelector('meta[name="csrf-token"]').content;
      const body = {
                      email: this.state.email,
                      password: this.state.password
                   }
      axios.defaults.headers.post['X-CSRF-Token'] = token;
      axios.post( url, body, {withCredentials:true}).then(response => {
                                                                          this.props.history.push("/MessagePage");
                                                            })
                                                   .catch(error => {
                                                                                    this.props.history.push("/");
                                                                    })
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
                          <label>Confirm Password</label>
                          <input name="confirm_password"/>
                      </div>

                      <div>
                          <button>Sign Up</button>
                      </div>
                </form>
            </div>
          )
  }
}

export default SignupPage;
