import React, {Component} from 'react';

class ReceiveMessage extends Component
{

  constructor(props)
  {
      super(props);
  }

  render()
  {
    return(
            <div className="ReceiverMessage">
              {this.props.message}
            </div>
          )
  }

}

export default ReceiveMessage;
