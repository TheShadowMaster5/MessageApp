import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Userlist from '../../components/userlistitem';
import Footer from '../../components//Mobile/footer';
import axios from 'axios';

class ContactList extends Component
{

  constructor(props)
  {
      super(props);
      this.state = {
                      userlist: null,
                    };
        this.onClickTasks = this.onClickTasks.bind(this);
  }

  async fetch_userslist()
  {
     const url = "/api/v1/fetch_userlist";
     const body =  {};
     const token = document.querySelector('meta[name="csrf-token"]').content;
     axios.defaults.headers.post['X-CSRF-Token'] = token;
     var messages = await axios.post(url, body, {withCredentials: true});
     let sender_user_id =  messages.data.current_user_id;
     await this.setState({ userlist: messages});
  }

  async onClickTasks(event)
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
    var other_person_user_id =  parseInt(event.target.closest('li').dataset.receiverUserId);
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
    const body =  {};
    const token = document.querySelector('meta[name="csrf-token"]').content;
    axios.defaults.headers.post['X-CSRF-Token'] = token;
    var is_chat_room_created = await axios.post(url, body, {withCredentials: true});
    return is_chat_room_created.data.is_chat_room_present
  }

  async destroy_chat_room()
  {
    const url = "/api/v1/destroy_chat_room";
    const body =  {};
    const token = document.querySelector('meta[name="csrf-token"]').content;
    axios.defaults.headers.post['X-CSRF-Token'] = token;
    var is_chat_room_destroyed = await axios.post(url, body, {withCredentials: true});
    return is_chat_room_destroyed;
  }


  componentDidMount()
  {
    this.fetch_userslist();
  }

  render()
  {
    if(this.state.userlist !== null && this.state.userlist.data.response_data.length >0)
    {
    return(
            <div id="UserListPage" data-sender-user-id={this.state.sender_user_id}>
              <div className="UserListPage__SearchInputBlock">
                <input className="UserListPage__SearchInput"></input>
              </div>
                <Userlist messangerList={this.state.userlist} clickOnMessangerList={this.onClickTasks}></Userlist>
              <div className="UserListPage__Footer">
                <Footer></Footer>
              </div>
            </div>
          )
    }
    else
    {
      return(
                <div id="UserListPage">
                    <div className="UserListPage__OnlyFirstUser">No Other User Has Been Registered Yet</div>
                    <div className="UserListPage__Footer">
                      <Footer></Footer>
                    </div>
                </div>

            )
    }
  }
}

export default ContactList;
