import React, { Component } from "react";
import axios from 'axios';
import userImage from '../../../assets/images/userimage.png';

class MessageListItem extends Component
{

  constructor(props)
  {
    super(props);
  }


  render()
  {
    return (
              <div className="MessageItem">
                { this.props.messangerList.response_data.map((item, index) => (
                                                                                <li key={item.user_id} data-receiver-user-id={item.user_id} className="MessangerBlockListItem" onClick={this.props.fetch_messages}>
                                                                                  <div className="MessangerBlock">
                                                                                    <div className="MessangerBlock__Image">
                                                                                      <img src= {item.image_url != undefined ? item.image_url : userImage}></img>
                                                                                    </div>
                                                                                    <div className="MessangerBlock__Name">{item.name}</div>
                                                                                    <div className="MessangerBlock__Time">{item.time}</div>
                                                                                    <div className="MessangerBlock__Message">{item.message}</div>
                                                                                    <div className="MessangerBlock__UnseenMessageCount">{item.unseen_message_count}</div>
                                                                                  </div>
                                                                                </li>
                                                                              )
                                                              )
                 }
               </div>
           );
  }

}

export default MessageListItem;
