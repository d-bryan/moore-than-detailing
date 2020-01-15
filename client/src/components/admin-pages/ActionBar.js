import React, { Component } from 'react';
import { 
  Link,
  Redirect
} from 'react-router-dom';


export default class ActionBar extends Component {


  deleteAdmin = async (props) => {
    const authAdmin = this.props.context.authenticatedAdmin.data;
    const context = this.props.context;
    const provider = this.props.provider;
    const paramsID = provider.match.params.id;
    
    console.log("delete")
    if (authAdmin && paramsID) {
    
      await context.actions.deleteAdmin(authAdmin, paramsID)
      .then(errors => {
        if (errors.length) {
          provider.history.push('/error');
        } else {
          provider.history.push('/admin-table');
        }
      })
      .catch(err => {
        console.error(`There was an error deleting the administrative user: ${err}`);
        this.props.history.push('/error');
      });

    } else {
      this.props.history.push('/forbidden');
    }

    
  }





// } else if (path === '/admin/:id/delete') {
  
// } else if (path === '/admin-pricing') {

// } else if (path === '/admin-customer-reviews') {

// } else if (path === '/admin-services-table') {
  render() {
    var buttonOptions;
    const path = this.props.provider.match.path;
    
    console.log(path)


    if (path === '/admin/:id/delete') {
      buttonOptions = (
        <>
          <Link to="/admin-table"><button>Cancel</button></Link>
          <button type="submit" onClick={this.deleteAdmin} >Delete</button>
        </>
      );
    } else {
      buttonOptions = (
        <Link to="/admin-dashboard"><button>Dashboard</button></Link>
      );
    }




    return (
      <div className="actions--bar">
        <div className="bounds">
          <div className="grid-100 actions--button--container">
  
          { buttonOptions }
  
            {/* <button>Create</button>
            <button>Delete</button>
            <button>Update</button>
            <button>Cancel</button> */}
          </div>
        </div>
      </div>
    );
  }
};

// Source AdminTable.js, AdminDetailPackages.js, AdminDetailPricing.js, AdminCustomerReviews.js, AdminAdditionalServices.js