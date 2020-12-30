import React, { Component } from "react";

import SendMessage from './sendmessage';
import ReceiveMessage from './receivemessage';
import MessageInput from '../sidebar/messageinput';
import axios from 'axios';

class ShowMessage extends Component
{

  constructor(props)
  {
    super(props);
  }


  render()
  { 
    if(this.props.messages!== "" && this.props.messages.data.response_data.length > 0)
    {
        return(
                <div id="messages_block">
                    <div id="messages_list">
                    { this.props.messages.data.response_data.map((item, index) => (
                                                                                      this.props.messages.data.loggedin_person_user_id === String(item.sender_id) ? <SendMessage message={item.message} key={index}></SendMessage> : <ReceiveMessage message={item.message} key={index}></ReceiveMessage>
                                                                                  )
                                                                )
                    }
                    </div>
                    <MessageInput></MessageInput>
                 </div>
              )
    }
    else
    {
      return(
              <div id="messages_block">
                  <MessageInput></MessageInput>
              </div>
            )
    }
  }

}

export default ShowMessage;
