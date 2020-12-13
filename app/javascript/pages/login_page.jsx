import React, { Component } from "react";
import { Link } from "react-router-dom";

class LoginPage extends Component
{

  // ========== CONSTRUCTOR START ===========
      constructor(props)
      {
        super(props);
        this.state = {
                          email: "",
                          password: "",
                          errors: {
                                    email:'',
                                    password:''
                                  }
                     };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
      }
  // ============ CONSTRUCTOR END ============


  // ========== ONCHANGE START ===========
      onChange(event)
      {
          event.preventDefault();
          this.setState({[event.target.name]: event.target.value });
          this.form_validation(event);
       }
  // =========== ONCHANGE END =============


  // ========== FORM VALIDATION START ===========
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
          case 'password':
            errors.password = value.length === 0 ? 'The field should not be get empty' : '';
            break;
          default:
            break;
        }
        this.setState({errors, [name]: value});
      }
  // ========== FORM VALIDATION START ===========


  // ========== SUBMIT FORM START ===========
      onSubmit(event)
      {

            event.preventDefault();
            this.login_form_component_is_empty('email');
            this.login_form_component_is_empty('password');
            if(this.validateForm(this.state.errors))
            {

            // ================== VARIABLES STARTS ==================
                const url = "/api/v1/user/login";
                const { email, password } = this.state;
                const body = {email, password};
                const token = document.querySelector('meta[name="csrf-token"]').content;
            // ==================  VARIABLES ENDS ==================

            fetch(url, {
              method: "POST",
              headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
              },
              body: JSON.stringify(body)
            })
              .then((response) => {
                if (response.ok) {
                  this.props.setUserLoginStatus(response);
                  this.props.history.push("/MessagePage");
                } else {
                  alert("The email and password is not correct");
                }
              })
              .catch((error) => {
                console.log(error.message);
              });
          }
        }
  // ========== SUBMIT FORM END ===========


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
            case 'password':
              errors.password = this.get_value(component_name).length === 0 ? 'The field should not be get empty' : '';
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
                let login_block =  document.getElementsByClassName("LoginPage__Email");
                let value       =  login_block[0].getElementsByClassName("email_input")[0].value;
                return value;
            }

            if(component_name === "password")
            {
                  let login_block = document.getElementsByClassName("LoginPage__Password");
                  let value       = login_block[0].getElementsByClassName("password_input")[0].value;
                  return value;
            }
        }
  // ==========  GET VALUE ENDS  ===========

  render()
  {
    return (
      <div className="LoginPage">
        <form onSubmit={this.onSubmit}>

          <div className="LoginPage__Email">
            <label>Email</label>
            <input
              className = "form-control email_input"
              name      = "email"
              onChange  = {this.onChange}
              type      =  "email"
            />
            <label className="error">{this.state.errors.email}</label>
          </div>

          <div className="LoginPage__Password">
            <label>Password</label>
            <input
              className =  "form-control password_input"
              name      =  "password"
              onChange  =  {this.onChange}
              type      =  "password"
            />
            <label className="error">{this.state.errors.password}</label>
          </div>

          <div className="LoginPage__SubmitButton">
            <button className="btn btn-primary">LogIn</button>
          </div>

        </form>
      </div>
    );
  }
}

export default LoginPage;
