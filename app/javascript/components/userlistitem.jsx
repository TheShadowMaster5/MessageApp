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
  }

  render()
  {
    return (
              <div className="UserListItemBlock">
                { this.props.messangerList.data.response_data.map((item, index) => (
                                                                                      <li key={item.id} data-receiver-user-id={item.id} className="UserListItem" onClick={this.props.clickOnMessangerList}>
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
