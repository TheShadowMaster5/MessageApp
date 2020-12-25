import React, { Component } from "react";
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import userImage from '../../assets/images/userimage.png';

class UserListItem extends Component
{

  constructor(props)
  {
    super(props);
    this.state = {
                    messages: null,
                    sender_user_id: null,
                    receiver_user_id: null
                 }
    this.fetch_messages = this.fetch_messages.bind(this);
  }


  async fetch_messages(event)
  {
     const url = "/api/v1/fetch_messages";
     let receiver_user_id =  parseInt(event.target.parentElement.parentElement.parentElement.getAttribute('data-receiver-user-id'));
     const body = { receiver_user_id };
     var messages = await axios.post(url, body, {withCredentials: true});
     let sender_user_id =  messages.data.current_user_id;
     await this.setState({ messages: messages, sender_user_id: sender_user_id, receiver_user_id: receiver_user_id});
  }


  render()
  {
    return (
              <div className="UserListItemBlock">
                { this.state.messages != null ? <Redirect to={{pathname:'/ShowMessagePage', props:{messages: this.state.messages}}}/> : ''}
                { this.props.messangerList.data.response_data.map((item, index) => (
                                                                                      <li key={item.id} data-receiver-user-id={item.id} className="UserListItem" onClick={this.fetch_messages}>
                                                                                        <div className="UserInfoBlock">

                                                                                          <div className="UserInfoBlock__ImageBlock">
                                                                                            {/*--<img src= {item.image_url != undefined ? item.image_url : userImage}></img>*/}
                                                                                            <img className="UserInfoBlock__Image" src= {userImage}></img>
                                                                                          </div>

                                                                                          <div className="UserInfoBlock__Name">
                                                                                            <span>{item.name}</span>
                                                                                          </div>

                                                                                        </div>
                                                                                      </li>
                                                                                    )
                                                              )
                 }
               </div>
           );
  }

}

export default UserListItem;
