import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Userlist from '../../components/userlistitem';
import axios from 'axios';

class ContactList extends Component
{

  constructor(props)
  {
      super(props);
      this.state = {
                      userlist: null,
                    };
  }

  async fetch_userslist()
  {
     const url = "/api/v1/fetch_userlist";
     const body =  {};
     const token = document.querySelector('meta[name="csrf-token"]').content;
     axios.defaults.headers.post['X-CSRF-Token'] = token;
     var messages = await axios.post(url, body, {withCredentials: true});
     let sender_user_id =  messages.data.current_user_id;
     await this.setState({ userlist: messages});
  }


  componentDidMount()
  {
    this.fetch_userslist();
  }

  render()
  {
    return(
            <div id="UserListPage" data-sender-user-id={this.state.sender_user_id}>
              <div className="UserListPage__SearchInputBlock">
                <input className="UserListPage__SearchInput"></input>
              </div>
              {this.state.userlist != null ? <Userlist messangerList={this.state.userlist}></Userlist> : ''}
            </div>
          )
  }
}

export default ContactList;
