import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import UserImage from  '../../../assets/images/userimage.jpg';
import axios from 'axios';

class Header extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
                    user_image: '',
                    user_name: ''
                 }
  }

  async get_user_info()
  {
      // const url     = "/api/v1/get_loggedin_user_info";
      // const token   = document.querySelector('meta[name="csrf-token"]').content;
      // const body    = {};
      // axios.defaults.headers.post['X-CSRF-Token'] = token;
      // axios.defaults.headers.post['Content-Type'] = 'application/json';
      // var user_data = await axios.post(url, body, {withCredentials: true});
      // var user_data = await axios.post(url, body, { headers: {"content-type": "application/json"}});
      // this.setState({user_image: user_data.data.loggedin_user_image_url, user_name: user_data.data.loggedin_user_info.name});


      const token = document.querySelector('meta[name="csrf-token"]').content;
      const requestOptions = {
        method: 'POST',
        headers: {
                    "X-CSRF-Token": token,
                    'Content-Type': 'application/json'
                },
        body: JSON.stringify({ title: 'React POST Request Example' })
    };
    fetch('/api/v1/get_loggedin_user_info', requestOptions)
        .then(response => response.json())
        .then(user_data => this.setState({user_image: user_data.loggedin_user_image_url, user_name: user_data.loggedin_user_info.name}));
  }

  componentDidMount()
  {
    this.get_user_info();
  }
  render()
  {
    return(
              <div className="HeaderBlock">
                <ul className="HeaderList">

                  <li className="HeaderList__Item HeaderBlock__BackBlock">
                    <Link to="/MessagePage">Back</Link>
                  </li>

                  <li className="HeaderList__Item HeaderBlock__NameBlock">
                    {this.state.user_name }
                  </li>

                  <li className="HeaderList__Item HeaderBlock__ImageBlock">
                    <img className="HeaderList__Image" src={this.state.user_image}/>
                  </li>

                </ul>
              </div>
          )
  }
}

export default Header;
