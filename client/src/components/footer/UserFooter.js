import React from 'react'
import WordMarkLogo from '../../website-mockups-assets/word-mark-grey-text.png';

const UserFooter = () => {
  return (
    <div className="footer--container bounds">
      <div className="footer--moore--than--detailing--desc">
        <img id="footer--logo" className="grid-33" src={WordMarkLogo} alt="Moore Than Detailing Logo" />
        <p className="footer--text middle--footer--text grid-33">295-D Bucheimer Road<br/>Frederick MD, 21701<br/><a href="tel:240-626-1777">240-626-1777</a></p>
   
        <p className="footer--text middle--footer--text grid-33">&copy; 2019 Moore Than Detailing<br/>All rights Reserved<br/></p>
      </div>
      <div className="attribute--container">
        <p id="attribute" className="footer--text">Website Design and Development by<br/><a href="mailto:dylan.g.bryan@gmail.com?subject=I%20would%20like%20to%20speak%20you%20about%20my%20website...&body=Hello%20Dylan,%0d%0a%0d%0aMy%20name%20is%20(YOUR%20NAME)%20and%20I%20believe%20you%20can%20help%20me%20with%20my%20website.">Dylan Bryan</a></p>  
      </div>
    </div>
  );
};

export default UserFooter;