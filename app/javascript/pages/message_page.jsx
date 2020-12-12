import React, {Component} from 'react';

// --------------- Components ---------------
import Sidebar from '../components/sidebar/sidebar'
import SendMessage from '../components/sidebar/sendmessage';
// --------------- Components ---------------

import axios from 'axios'
class MessagePage extends Component
{

  constructor(props)
  {
      super(props);
  }

  componentDidMount()
  {

  }

  render()
  {
    return(
            <div>
                <Sidebar></Sidebar>
                <SendMessage></SendMessage>
            </div>
          )
  }
}

export default MessagePage;
