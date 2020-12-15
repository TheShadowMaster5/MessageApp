import React, {Component} from 'react';

class SendMessage extends Component
{

  constructor(props)
  {
      super(props);
  }

  render()
  {
    return(
            <div className="SenderMessage">
              {this.props.message}
            </div>
          )
  }

}

export default SendMessage;
