import React, {Component} from 'react';

// --------------- Components ---------------
import Sidebar from '../../components/sidebar/sidebar'
import ShowMessage from '../../components/message/showmessage';
import Header from '../../components/Mobile/header';
// --------------- Components ---------------

import axios from 'axios'
class ChatList extends Component
{

  constructor(props)
  {
      super(props);
      this.state = {
                      messages: '',
                      other_person_user_id:''
                    };
  }

  async fetch_messages()
  {
     const url = "/api/v1/fetch_messages";
     const body = {};
     const token = document.querySelector('meta[name="csrf-token"]').content;
     axios.defaults.headers.post['X-CSRF-Token'] = token;
     var messages = await axios.post(url, body, {withCredentials: true});
     await this.setState({ messages: messages});
  }


  async componentDidMount()
  {
     await this.fetch_messages();
  }

  render()
  {
    if(this.state.messages != "" )
    {
      return(
              <div id="MessagePage" data-loggedin-person-user-id={this.state.messages.data.loggedin_person_user_id}>
                  <Header></Header>
                  <div className="MessagePage__Showmessage">
                      <ShowMessage messages={this.state.messages}></ShowMessage>
                  </div>
              </div>
            )
    }
    else
    {
      return(
                <div>NO message</div>
            )
    }
  }
}

export default ChatList;
