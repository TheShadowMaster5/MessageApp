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
    return(
            <div id="messages_block">
                <div id="messages_list">
                { this.props.messages.data.response_data.map((item, index) => (
                                                                                  this.props.messages.data.loggedin_person_user_id === String(item.sender_id) ? <SendMessage message={item.message} key={index}></SendMessage> : <ReceiveMessage message={item.message} key={index}></ReceiveMessage>
                                                                              )
                                                            )
                }
                </div>
                <MessageInput loggedin_person_user_id={this.props.messages.data.loggedin_person_user_id} other_person_user_id={this.props.messages.data.other_person_user_id}></MessageInput>
             </div>
          )
  }

}

export default ShowMessage;
