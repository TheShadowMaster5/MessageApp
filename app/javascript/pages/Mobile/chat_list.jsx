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
                      loggedin_person_user_id:'',
                      chat_room_id:''
                    };
  }

  async get_logged_in_user_id()
  {
    const url = "/api/v1/get_loggedin_user_id";
    const body = {};
    const token = document.querySelector('meta[name="csrf-token"]').content;
    axios.defaults.headers.post['X-CSRF-Token'] = token;
    var loggedin_person_user_id = await axios.get(url, body, {withCredentials: true});
    this.setState({ loggedin_person_user_id: loggedin_person_user_id.data.loggedin_person_user_id});
  }

  async get_chat_room_id()
  {
    const url = "/api/v1/get_chat_room_id";
    const body = {};
    const token = document.querySelector('meta[name="csrf-token"]').content;
    axios.defaults.headers.post['X-CSRF-Token'] = token;
    var chat_room_id = await axios.get(url, body, {withCredentials: true});
    this.setState({ chat_room_id : chat_room_id.data.chat_room_id });
  }

  async fetch_messages()
  {
     const url = "/api/v1/fetch_messages";
     const body = {};
     const token = document.querySelector('meta[name="csrf-token"]').content;
     axios.defaults.headers.post['X-CSRF-Token'] = token;
     var messages = await axios.post(url, body, {withCredentials: true});
     this.setState({ messages: messages});
  }


  async componentDidMount()
  {
     await this.get_logged_in_user_id();
     await this.get_chat_room_id();
     await this.fetch_messages();
  }

  render()
  {
      return(
              <div id="MessagePage" data-loggedin_person_user_id={this.state.loggedin_person_user_id} data-chat_room_id={this.state.chat_room_id}>
                  <Header></Header>
                  <div className="MessagePage__Showmessage">
                      { this.state.messages !=="" ? <ShowMessage messages={this.state.messages}></ShowMessage> : "Loading....."}
                  </div>
              </div>
            )
   }
}

export default ChatList;
