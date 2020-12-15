import React,{Component} from 'react';
import axios from 'axios';
import MessageListItem from './messagelistitem';

class Sidebar extends Component
{

    constructor(props)
    {
        super(props);
        this.state = {
                        loading: true,
                        messangerList: []
                     }
    }

    async componentDidMount()
    {
        let messangerList = await this.get_messanger_list();
        this.setState({messangerList: messangerList});
        this.setState({loading: false});
    }

    async get_messanger_list()
    {
      const token = document.querySelector('meta[name="csrf-token"]').content;
      const url   = "/api/v1/fetch_messanger_list";
      axios.defaults.headers.post['X-CSRF-Token'] = token;
      let messangerList = await axios.post(url, {withCredentials:true});
      return messangerList.data;
    }

    render()
    {
      return(
              <div className="Sidebar">
                <ul>
                    {this.state.loading ? "loading...." : <MessageListItem messangerList={this.state.messangerList} fetch_messages={this.props.fetch_messages}> </MessageListItem>}
                </ul>
              </div>
            )
    }
}

export default Sidebar;
