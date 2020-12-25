import React, {Component} from 'react';
import axios from 'axios';

class ProfilePage extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
                        name: '',
                        email: '',
                        mobile_number:'',
                        avatar: ''

                     }
        this.onChange = this.onChange.bind(this);
        this.submitform = this.submitform.bind(this);
    }

    onChange(event)
    {
      if(event.target.name==="avatar")
      {
          this.setState({ [event.target.name]: event.target.files[0]})
      }
      else
      {
          this.setState({ [event.target.name]: event.target.value})
      }
    }

    async submitform(event)
    {
         event.preventDefault();
         const url = "/api/v1/update_profile";
         const body = {
                        'user':{
                                    name: this.state.name,
                                    email: this.state.email,
                                    mobile_number: this.state.mobile_number
                                }
                      } ;
         const token = document.querySelector('meta[name="csrf-token"]').content;
         axios.defaults.headers.post['X-CSRF-Token'] = token;
         var is_data_updated = await axios.post( url, body, {withCredentials:true});


          const form = new FormData();
          const headers = {
                              headers: {
                                          'accept': 'application/json',
                                          'Content-Type': 'multipart/form-data'
                                        }
                          }
          form.append('user[avatar]', this.state.avatar );
          axios.post(url, form, { headers: headers })

     }

    render()
    {
      return(
              <div>
                <form className="ProfileForm" onSubmit={this.submitform} encType="multipart/form-data">

                    <div className="ProfileForm__Image">
                      <input type="file" name="avatar" onChange={this.onChange}/>
                    </div>

                    <div className="ProfileForm__Name">
                      <label>Name</label>
                      <input name="name" onChange={this.onChange}/>
                    </div>

                    <div className="ProfileForm__Email">
                      <label>Email</label>
                      <input name="email" onChange={this.onChange}/>
                    </div>

                    <div className="ProfileForm__Contact">
                      <label>Contact</label>
                      <input name="mobile_number" onChange={this.onChange}/>
                    </div>


                    <div>
                      <button className="btn btn-primary">Submit</button>
                    </div>
                </form>
              </div>
            )
    }
}

export default ProfilePage;
