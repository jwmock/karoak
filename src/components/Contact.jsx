require('normalize.css/normalize.css')
require('styles/App.css')

import React from 'react'


class Contact extends React.Component {

	componentDidMount(){
		
	}

  render() {
    return (
      <div className="contactButton">
      Contact
      </div>
    );
  }
}

Contact.defaultProps = {
}

export default Contact;
