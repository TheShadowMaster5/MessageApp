import React, { Component } from "react";
import axios from 'axios';
import Footer from '../Mobile/footer';
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

                <div className="MessageItem__SearchInput">
                  <input></input>
                </div>

                <div className="MessageItem__Items">
                { this.props.messengerList.response_data.map((item, index) => (
                                                                                <li key={item.user_id} data-receiver-user-id={item.user_id} className="MessageItem__MessangerBlock MessangerBlockListItem" onClick={this.props.list_item_onclick_operations}>
                                                                                  <div className="MessangerBlock">

                                                                                    <div className="MessangerBlock__Image">
                                                                                      <img src= {item.image_url != undefined ? item.image_url : userImage}></img>
                                                                                    </div>

                                                                                    <div className="MessangerBlock__Name">{item.name}</div>

                                                                                    <div className="MessangerBlock__Time-Count">
                                                                                      <div className="MessangerBlock__Time">{item.date}</div>
                                                                                      {item.unseen_message_count==0 ? "" : <div className="MessangerBlock__UnseenMessageCount">{item.unseen_message_count}</div>}
                                                                                    </div>

                                                                                    <div className="MessangerBlock__Message">{item.message}</div>

                                                                                  </div>
                                                                                </li>
                                                                              )
                                                              )
                 }
                 </div>

                 <div className="MessageItem__Footer">
                    <Footer/>
                 </div>
               </div>
           );
  }

}

export default MessageListItem;
