import React, { Component } from 'react';

// import components
import NavAdmin from '../navigation/NavAdmin';
import ActionBar from './ActionBar';

export default class DeleteItem extends Component {

  state = {
    bodyOptions: '',
    objKeys: [],
    objProps: [],
  };

  componentDidMount() {
    const locationState = this.props.location.state;
    this.setState({
      bodyOptions: locationState,
    });

    this.setObjectState(locationState)
    
  }

  setObjectState(state) {
    var objKeysArray = [];
    var objPropsArray = [];
    for(const name in state) {
      objKeysArray.push(name);
      objPropsArray.push(state[name]);
    }

    this.setState({
      objKeys: objKeysArray,
      objProps: objPropsArray,
    });

  }

  render() {
    const context = this.props.context;
    const provider = this.props;
    const deletedItem_1 = this.state.objProps[2] || null;
    const deletedItem_2 = this.state.objProps[3] || null;
    var delItemText;

    if (deletedItem_1 !== null && deletedItem_2 !== null) {
      delItemText = `${deletedItem_1} ${deletedItem_2}?`;
    } else if (deletedItem_1 !== null && deletedItem_2 === null) {
      delItemText = `${deletedItem_1}?`;
    } else {
      delItemText = 'this item?'
    }

    return(
      <>

        <NavAdmin 
          context={context}
        />

        <ActionBar 
          provider={provider}
          context={context}
        />

      <div className="admin--delete--item">
        <h1>Delete Item</h1>
        <h3>Are you sure you want to delete { delItemText }</h3>
      </div>


      </>
    );
  }

}

// Source App.js