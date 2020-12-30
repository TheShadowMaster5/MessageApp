import React, {Component} from 'react';
import {Link} from 'react-router-dom';
class Footer extends Component
{

  constructor(props)
  {
    super(props)
  }

  render()
  {
    return(
      <div className = "Footer">
          <ul className = "Footer__List">
            <li className="Footer__ListItem">
              <Link to="/ProfilePage">Profile</Link>
            </li>
            <li className="Footer__ListItem">
              <Link to="/MessagePage">Chat</Link>
            </li>
            <li className="Footer__ListItem">
              <Link to="/SettingPage">Setting</Link>
            </li>
            <li className="Footer__ListItem">
              <Link to="/ContactPage">Contact</Link>
            </li>
          </ul>
      </div>
    )
  }
}

export default Footer;
