import React, {Component} from 'react';
import Footer from '../../components/Mobile/footer';
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
        if(is_user_logout.data.is_user_logged_out)
        {
            this.props.history.push('/LoginPage');
        }
    }

    render()
    {
      return(
              <div className="SettingPage">
                <button className="SettingPage__Logout"onClick={this.logout}>Logout</button>
                <div className="SettingPage__Footer">
                  <Footer></Footer>
                </div>
              </div>
            )
    }
}

export default SettingPage;
