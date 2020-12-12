import React, { Component } from "react";
import userImage from '../../../assets/images/userimage.png';

class MessageListItem extends Component {
  constructor(props)
  {
    super(props);
  }

  render() {
    return (
              <div>
              { this.props.messangerList.response_data.map((item, index) => (
                                                                              <li key={index} className="MessangerBlockListItem">
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
