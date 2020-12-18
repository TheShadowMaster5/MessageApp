import React, {Component} from 'react';
import {Link} from 'react-router-dom';
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
      this.setState({ [event.target.name]: event.target.value });
      this.form_validation(event);
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
      this.login_form_component_is_empty('email');
      this.login_form_component_is_empty('name');
      this.login_form_component_is_empty('password');
      this.login_form_component_is_empty('confirm_password');
      const url = "/api/v1/user/signup";
      const token = document.querySelector('meta[name="csrf-token"]').content;
      const body = {
                      email: this.state.email,
                      password: this.state.password
                   }
      if(this.validateForm(this.state.errors))
      {
        axios.defaults.headers.post['X-CSRF-Token'] = token;
        axios.post( url, body, {withCredentials:true}).then(response => {
                                                                            this.props.history.push("/MessagePage");
                                                                        }
                                                            )
                                                      .catch(error => {
                                                                            this.props.history.push("/SignupPage");
                                                                       }
                                                             )
      }
  }

  // ========== VALIDATE FORM START ===========
      validateForm(errors)
      {
        let valid = true;
        Object.values(errors).forEach(val => val.length > 0 && (valid = false));
        return valid;
      }
  // ========== VALIDATE FORM END ===========

  // ========== FORM VALIDATION STARTS===========
        login_form_component_is_empty(component_name)
        {
          let errors = this.state.errors;
          let value = "";

          switch (component_name)
          {
            case 'email':
              errors.email = this.get_value(component_name).length === 0 ? 'The field should not be get empty': '';
              break;
            case 'name':
              errors.name = this.get_value(component_name).length === 0 ? 'The field should not be get empty': '';
              break;
            case 'password':
              errors.password = this.get_value(component_name).length === 0 ? 'The field should not be get empty' : '';
              break;
            case 'confirm_password':
              errors.confirm_password = this.get_value(component_name).length === 0 ? 'The field should not be get empty' : '';
              break;
            default:
              break;
          }

          this.setState({errors, [name]: value});

        }
  // ========== FORM VALIDATION END ===========

  // ========== GET VALUE STARTS ===========
        get_value(component_name)
        {
            if(component_name === "email")
            {
                let login_block =  document.getElementsByClassName("SignupPage__Email");
                let value       =  login_block[0].getElementsByClassName("email_input")[0].value;
                return value;
            }

            if(component_name === "name")
            {
                  let login_block = document.getElementsByClassName("SignupPage__Name");
                  let value       = login_block[0].getElementsByClassName("name_input")[0].value;
                  return value;
            }

            if(component_name === "password")
            {
                  let login_block = document.getElementsByClassName("SignupPage__Password");
                  let value       = login_block[0].getElementsByClassName("password_input")[0].value;
                  return value;
            }

            if(component_name === "confirm_password")
            {
                  let login_block = document.getElementsByClassName("SignupPage__ConfirmPassword");
                  let value       = login_block[0].getElementsByClassName("confirm_password_input")[0].value;
                  return value;
            }
        }
  // ==========  GET VALUE ENDS  ===========
  render()
  {
    return(
            <div className="SignupPage">

                { /*---- If user already logged in the redirect to the message page ----*/}
                    {this.props.isUserLoggedIn ? this.props.history.push('/MessagePage'):''}
                { /*---- If user already logged in the redirect to the message page ----*/}

                { /*---- Signup Form ----*/}
                    <div className="SignupPage__Header">Create Account</div>
                { /*---- Signup Form ----*/}

                { /*---- Signup Form ----*/}
                   <form onSubmit={this.onSubmit} className="SignupPage__Form">

                          <div className="SignupPage__Email">
                              { /*<label>Email</label>*/}
                              <input
                                  className = "email_input"
                                  name="email"
                                  onChange={this.onChange}
                                  placeholder = "Email"
                                  type="email"
                              />
                              <label className="error">{this.state.errors.email}</label>
                          </div>

                          <div className="SignupPage__Name">
                              { /*<label>Name</label>*/}
                              <input
                                    className = "name_input"
                                    name="name"
                                    onChange={this.onChange}
                                    placeholder = "Name"
                              />
                              <label className="error">{this.state.errors.name}</label>
                          </div>

                          <div className="SignupPage__Password">
                              { /*<label>Password</label>*/}
                              <input
                                  className = "password_input"
                                  name="password"
                                  onChange={this.onChange}
                                  placeholder = "Password"
                                  type="password"
                              />
                              <label className="error">{this.state.errors.password}</label>
                          </div>

                          <div className="SignupPage__ConfirmPassword">
                              { /*<label>Confirm Password</label>*/}
                              <input
                                  className = "confirm_password_input"
                                  name="confirm_password"
                                  onChange={this.onChange}
                                  placeholder = "Confirm Password"
                                  type="password"
                              />
                              <label className="error">{this.state.errors.confirm_password}</label>
                          </div>

                          <div className="SignupPage__SubmitButton">
                              <button>Sign Up</button>
                              <span className="SignupPage__LoginLinkSection">Already have an account?<Link to="/LoginPage" className="LoginPage__SignupLink">Login</Link></span>
                          </div>
                   </form>
                { /*---- Signup Form ----*/}

            </div>
          )
  }
}

export default SignupPage;
