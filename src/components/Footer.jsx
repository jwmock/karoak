require('normalize.css/normalize.css')
require('styles/App.css')

import React from 'react'


class Footer extends React.Component {

	componentDidMount(){
		
	}

  render() {
    return (
      <div className="footer">
      Copyright 2017 by HellaCrayDotCom, LLC
      </div>
    );
  }
}

Footer.defaultProps = {
}

export default Footer;
