import React, { Component } from 'react';

import DetailingServicesListItem from './DetailingServicesListItem';

export default class DetailingServicesDescription extends Component {

  state = {
    fullDetailPlus: '',
    fullDetail: '',
    interiorDetail: '',
    theBlitz: '',
    exteriorDetail: '',
    basicWash: '',
  }

  componentDidMount () {

    


  }

  render() {
    return (
      <div className="detail--services--description">
        <ul>

        </ul>
      </div>
    );
  }
};