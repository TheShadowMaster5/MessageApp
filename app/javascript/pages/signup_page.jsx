import React, {Component} from 'react';
import axios from 'axios';

class SignupPage extends Component
{

  constructor(props)
  {
      super(props);
      this.state = {
                      email:'',
                      password:'',
                      errors:{
                                email:'',
                                name:'',
                                password:'',
                                confirm_password:''
                             }
                    }
      this.onSubmit = this.onSubmit.bind(this);
      this.onChange = this.onChange.bind(this);
  }

  onChange(event)
  {
      this.setState({ [event.target.name]: event.target.value })
      this.form_validation(event)
  }



  form_validation(onChangeevent)
  {
    const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
    const { name, value } = onChangeevent.target;
    let errors = this.state.errors;

    switch (name)
    {
      case 'email':
        errors.email = value.length === 0 ? 'The field should not be get empty': '';
        errors.email = validEmailRegex.test(value) ? '' : 'The email is invalid';
        break;
      case 'name':
        errors.name = value.length === 0 ? 'The field should not be get empty' : '';
        break;
      case 'password':
        errors.password = value.length === 0 ? 'The field should not be get empty' : '';
        break;
      case 'confirm_password':
        errors.confirm_password = value.length === 0 ? 'The field should not be get empty' : '';
        break;
      default:
        break;
    }
    this.setState({errors, [name]: value});
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
                                                                      }
                                                          )
                                                    .catch(error => {
                                                                          this.props.history.push("/");
                                                                     }
                                                           )
  }

  render()
  {
    return(
            <div className="SignupPage">

                { /*---- If user already logged in the redirect to the message page ----*/}
                    {this.props.isUserLoggedIn ? this.props.history.push('/MessagePage'):''}
                { /*---- If user already logged in the redirect to the message page ----*/}

                { /*---- Signup Form ----*/}
                   <form onSubmit={this.onSubmit}>

                          <div className="SignupPage__Email">
                              <label>Email</label>
                              <input
                                  className = "form-control email_input"
                                  name="email"
                                  onChange={this.onChange}
                                  type="email"
                              />
                              <label className="error">{this.state.errors.email}</label>
                          </div>

                          <div className="SignupPage__Name">
                              <label>Name</label>
                              <input
                                    className = "form-control name_input"
                                    name="name"
                                    onChange={this.onChange}
                              />
                              <label className="error">{this.state.errors.name}</label>
                          </div>

                          <div className="SignupPage__Password">
                              <label>Password</label>
                              <input
                                  className = "form-control password_input"
                                  name="password"
                                  onChange={this.onChange}
                                  type="password"
                              />
                              <label className="error">{this.state.errors.password}</label>
                          </div>

                          <div className="SignupPage__ConfirmPassword">
                              <label>Confirm Password</label>
                              <input
                                  className = "form-control confirm_password_input"
                                  name="confirm_password"
                                  onChange={this.onChange}
                                  type="password"
                              />
                              <label className="error">{this.state.errors.confirm_password}</label>
                          </div>

                          <div className="SignupPage__SubmitButton">
                              <button className="btn btn-primary">Sign Up</button>
                          </div>
                   </form>
                { /*---- Signup Form ----*/}

            </div>
          )
  }
}

export default SignupPage;
