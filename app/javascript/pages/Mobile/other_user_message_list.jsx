// This page contains the message which the logged in user received from the other user
//  or the messages the current user send to the other users


import React, { Component } from "react";
import axios from 'axios';
import MessageListItem from '../../components/sidebar/messagelistitem';
import userImage from '../../../assets/images/userimage.png';

class OtherUserMessageList extends Component
{

  constructor(props)
  {
    super(props);
    this.state = {
                    messengersList: ''
                 }
    this.list_item_onclick_operations = this.list_item_onclick_operations.bind(this)
  }

  componentDidMount()
  {
    this.fetch_messengerslist();
  }


  async fetch_messengerslist()
  {
     const url = "/api/v1/fetch_messanger_list";
     const body =  {};
     const token = document.querySelector('meta[name="csrf-token"]').content;
     axios.defaults.headers.post['X-CSRF-Token'] = token;
     var messenger_list = await axios.post(url, body, {withCredentials: true});
     await this.setState({ messengersList: messenger_list});
  }


  async list_item_onclick_operations(event)
  {
      var is_id_set             =  await this.set_other_user_id(event);
      var is_chat_room_created  =  await this.create_chat_room();

      if (is_id_set && is_chat_room_created)
      {
          this.props.history.push('/ChatPage');
      }
      else
      {
          this.remove_other_user_id();
          this.destroy_chat_room();
          this.props.history.push('/MessagePage');
      }
  }


  async set_other_user_id(event)
  {
    const url = "/api/v1/set_other_user_id";
    var other_person_user_id =  parseInt(event.target.parentElement.parentElement.dataset.receiverUserId);
    const body =  {other_person_user_id: other_person_user_id};
    const token = document.querySelector('meta[name="csrf-token"]').content;
    axios.defaults.headers.post['X-CSRF-Token'] = token;
    var is_other_user_set = await axios.post(url, body, {withCredentials: true});
    return is_other_user_set;
  }

  async destroy_other_user_id()
  {
    const url = "/api/v1/fetch_messanger_list";
    const body =  {};
    const token = document.querySelector('meta[name="csrf-token"]').content;
    axios.defaults.headers.post['X-CSRF-Token'] = token;
    var is_other_user_destroy = await axios.post(url, body, {withCredentials: true});
    return is_other_user_destroy;
  }

  async create_chat_room()
  {
    const url = "/api/v1/create_chat_room";
    const body =  {other_user_id: ""};
    const token = document.querySelector('meta[name="csrf-token"]').content;
    axios.defaults.headers.post['X-CSRF-Token'] = token;
    var is_chat_room_created = await axios.post(url, body, {withCredentials: true});
    return is_chat_room_created
  }

  async destroy_chat_room()
  {
    const url = "/api/v1/fetch_messanger_list";
    const body =  {other_user_id: ""};
    const token = document.querySelector('meta[name="csrf-token"]').content;
    axios.defaults.headers.post['X-CSRF-Token'] = token;
    var is_chat_room_destroyed = await axios.post(url, body, {withCredentials: true});
    return is_chat_room_destroyed;
  }


  render()
  {
    return (
              <div className="OtherUserMessageListPage">
                {this.state.messengersList === "" ? "Loading...." : <MessageListItem messengerList={this.state.messengersList.data} list_item_onclick_operations={this.list_item_onclick_operations}/>}
              </div>
           );
  }

}

export default OtherUserMessageList;
