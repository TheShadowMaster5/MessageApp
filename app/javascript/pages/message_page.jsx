import React, {Component} from 'react';

// --------------- Components ---------------
import Sidebar from '../components/sidebar/sidebar'
import ShowMessage from '../components/message/showmessage';
import SendMessage from '../components/sidebar/sendmessage';
import Header from '../components/header';
// --------------- Components ---------------

import axios from 'axios'
class MessagePage extends Component
{

  constructor(props)
  {
      super(props);
      this.state = {
                      messages: '',
                      sender_user_id:'',
                      receiver_user_id:''

                    };
      this.fetch_messages = this.fetch_messages.bind(this);
  }

  async fetch_messages()
  {
     const url = "/api/v1/fetch_messages";
     let receiver_user_id =  parseInt(event.target.parentElement.parentElement.getAttribute('data-receiver-user-id'));
     const body = { receiver_user_id };
     var messages = await axios.post(url, body, {withCredentials: true});
     let sender_user_id =  messages.data.current_user_id;
     await this.setState({ messages: messages, sender_user_id: sender_user_id, receiver_user_id: receiver_user_id});
  }


  componentDidMount()
  {

  }

  render()
  {
    return(
            <div id="MessagePage" data-sender-user-id={this.state.sender_user_id}>
                <Header></Header>
                <Sidebar className="MessagePage__Sidebar" fetch_messages={this.fetch_messages}></Sidebar>
                <div className="MessagePage__Showmessage">
                    { this.state.messages != "" ? <ShowMessage messages={this.state.messages}></ShowMessage> : "Nothing"}
                    <SendMessage sender_user_id={this.state.sender_user_id} receiver_user_id={this.state.receiver_user_id}></SendMessage>
                </div>
            </div>
          )
  }
}

export default MessagePage;
