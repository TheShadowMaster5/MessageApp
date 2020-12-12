import React,{Component} from 'react';
import axios from 'axios';

class SendMessage extends Component
{

  // ===========================================================================
      constructor(props)
      {
        super(props);
        this.state = {
                        message:"",
                        receiver_id:1,
                        sender_id:2
                     }
        this.sendMessage    = this.sendMessage.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
      }
  // ===========================================================================


  // ===========================================================================
      handleOnChange(event)
      {
        this.setState({[event.target.name]: event.target.value})
      }
  // ===========================================================================


  // ===========================================================================
      sendMessage(event)
      {
          event.preventDefault();
          const url = "/api/v1/send_message";
          const {message, receiver_id, sender_id} = this.state;
          const body = {
                          'user':{
                                    message,
                                    receiver_id,
                                    sender_id
                                  }
                       }
          const token = document.querySelector('meta[name="csrf-token"]').content;
          axios.defaults.headers.post['X-CSRF-Token'] = token;
          axios.post(url, body, {withCredentials:true});
      }
  // ===========================================================================


  // ===========================================================================
      render()
      {
        return(
                  <div>
                    <form onSubmit={this.sendMessage}>
                        <input type="hidden" name="sender_id"  value="1"/>
                        <input type="hidden" name="receiver_id" value="1"/>
                        <input name="message" onChange={this.handleOnChange}/>
                        <button type="submit">Send</button>
                    </form>
                  </div>
              )
      }
  // ===========================================================================
}

export default SendMessage;
