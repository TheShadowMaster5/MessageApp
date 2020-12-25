import React, {Component} from 'react';
import axios from 'axios';

class SettingPage extends Component
{
    constructor(props)
    {
        super(props);
        this.logout = this.logout.bind(this);
    }

    async logout()
    {
        const url = "/api/v1/user/logout";
        const body = "";
        const token = document.querySelector('meta[name="csrf-token"]').content;
        axios.defaults.headers.delete['X-CSRF-Token'] = token;
        var is_user_logout = await axios.delete( url, body, {withCredentials: true});
        if(is_user_logout)
        {
            this.props.history.push('/LoginPage');
        }
    }

    render()
    {
      return(
              <div>
                <button onClick={this.logout}>Logout</button>
              </div>
            )
    }
}

export default SettingPage;
