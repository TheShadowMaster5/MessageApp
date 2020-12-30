import React, {Component} from 'react';
import Footer from '../../components/Mobile/footer';
import DefaultUserImage from '../../../assets/images/userdefault.jpg';
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
                        avatar: '',
                        errors: {
                                    name: '',
                                    email: '',
                                    mobile_number:''
                                }

                     }
        this.onChange = this.onChange.bind(this);
        this.openFileMenu = this.openFileMenu.bind(this);
        this.submitform = this.submitform.bind(this);
    }

    async get_profile_data()
    {
        const url = "/api/v1/get_profile_data";
        var profile_data = await axios.get(url);
        this.setState({
                        name: profile_data.data.name,
                        email: profile_data.data.email,
                        //--- We use or operator because the mobile number is not mandatory field during signup
                        //--- So the react gives error on assigning null value to the state -----------
                        mobile_number: profile_data.data.mobile_number||'',
                        // ----------------------------------------------------------------------------
                        avatar: profile_data.data.image_url
                      })
    }

    openFileMenu()
    {
        document.getElementsByClassName('ProfileForm__FileInput')[0].click();
    }

    componentDidMount()
    {
        this.get_profile_data();
    }


    onChange(event)
    {
      if(event.target.name==="avatar")
      {
          let avatar_image = URL.createObjectURL(event.target.files[0]);
          this.setState({ [event.target.name]: event.target.files[0], avatar: avatar_image})
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
              <div className="ProfilePage">
                <form className="ProfileForm" onSubmit={this.submitform} encType="multipart/form-data">

                    <div className="ProfileForm__ImageBlock" onClick={this.openFileMenu}>

                      <img className="ProfileForm__Image" src={this.state.avatar!==''?this.state.avatar: DefaultUserImage}/>
                      <div className="ProfileForm__Edit"></div>

                      <input
                                className="ProfileForm__FileInput"
                                type="file"
                                name="avatar"
                                onChange={this.onChange}
                      />
                    </div>

                    <div className="ProfileForm__Name">
                      <input
                            name="name"
                            onChange={this.onChange}
                            placeholder="Name"
                            value = {this.state.name !==''? this.state.name: ''}
                      />
                      <label className="error">{this.state.errors.password}</label>
                    </div>

                    <div className="ProfileForm__Email">
                      <input
                          name="email"
                          onChange={this.onChange}
                          placeholder="Email"
                          value = {this.state.email !==''? this.state.email: ''}
                      />
                      <label className="error">{this.state.errors.password}</label>
                    </div>

                    <div className="ProfileForm__Contact">
                      <input
                          name="mobile_number"
                          onChange={this.onChange}
                          placeholder="Contact"
                          value = {this.state.mobile_number !==''? this.state.mobile_number: ''}
                      />
                      <label className="error">{this.state.errors.password}</label>
                    </div>


                    <div className="ProfileForm__SubmitButtonBlock">
                      <button className="ProfileForm__SubmitButton">Submit</button>
                    </div>
                </form>

                <div className="ProfilePage__Footer">
                    <Footer></Footer>
                </div>
              </div>
            )
    }
}

export default ProfilePage;
