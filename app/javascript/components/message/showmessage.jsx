import React, { Component } from "react";

import SendMessage from './sendmessage';
import ReceiveMessage from './receivemessage';
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
            <div id="messages_list">
                { this.props.messages.data.response_data.map((item, index) => (
                                                                                  this.props.messages.data.current_user_id === item.sender_id ? <SendMessage message={item.message} key={index}></SendMessage> : <ReceiveMessage message={item.message} key={index}></ReceiveMessage>
                                                                              )
                                                            )
                }
             </div>
          )
  }

}

export default ShowMessage;
