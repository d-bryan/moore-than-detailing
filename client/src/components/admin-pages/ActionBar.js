import React, { Component } from 'react';
import { 
  Link
} from 'react-router-dom';


export default class ActionBar extends Component {


  deleteAdmin = async () => {
    const authAdmin = this.props.context.authenticatedAdmin.data;
    const context = this.props.context;
    const provider = this.props.provider;
    const paramsID = provider.match.params.id;
    
    if (authAdmin && paramsID) {
    
      await context.actions.deleteAdmin(authAdmin, paramsID)
      .then(errors => {
        if (errors.length) {
          provider.history.push('/error');
        } else {
          provider.history.goBack();
        }
      })
      .catch(err => {
        console.error(`There was an error deleting the administrative user: ${err}`);
        provider.history.push('/error');
      });

    } else {
      provider.history.push('/forbidden');
    }
    
  }

  deletePackage = async () => {
    const authAdmin = this.props.context.authenticatedAdmin.data;
    const context = this.props.context;
    const provider = this.props.provider;
    const paramsID = provider.match.params.id;

    if (authAdmin && paramsID) {

      await context.actions.deletePackage(paramsID, authAdmin)
        .then(errors => {
          if (errors.length) {
            provider.history.push('/error');
          } else {
            provider.history.goBack();
          }
        })
        .catch(err => {
          console.error(`There was an error deleting the package from the administrative package table: ${err}`);
          provider.history.push('/error');
        })

    } else {
      provider.history.push('/forbidden');
    }

  }

  deletePricingItem = async () => {
    const authAdmin = this.props.context.authenticatedAdmin.data;
    const context = this.props.context;
    const provider = this.props.provider;
    const paramsID = provider.match.params.id;

    if (authAdmin && paramsID) {

      await context.actions.deletePriceItem(paramsID, authAdmin)
        .then(errors => {
          if (errors.length) {
            provider.history.push('/error');
          } else {
            provider.history.goBack();
          }
        })
        .catch(err => {
          console.error(`DELETE PRICING ITEM: ${err}`);
          provider.history.push('/error');
        })

    } else {
      provider.history.push('/forbidden');
    }
  }





// } else if (path === '/admin/:id/delete') {
  
// } else if (path === '/admin-pricing') {

// } else if (path === '/admin-customer-reviews') {

// } else if (path === '/admin-services-table') {
  render() {
    var buttonOptions;
    const path = this.props.provider.match.path;
    const prop = this.props.provider;
    console.log(prop)
    
    console.log(path)

    
    if (path === '/admin/:id/delete') {
      buttonOptions = (
        <>
          <Link to="/admin-table"><button>Cancel</button></Link>
          <button type="submit" onClick={this.deleteAdmin} >Delete</button>
        </>
      );
    } else if (path === '/admin-packages/:id/delete') {
      buttonOptions = (
        <>
          <Link to="/admin-packages"><button>Cancel</button></Link>
          <button type="submit" onClick={this.deletePackage} >Delete</button>
        </>
      );
    } else if (path === '/admin-pricing/:id/delete') {
      buttonOptions = (
        <>
          <Link to="/admin-pricing"><button>Cancel</button></Link>
          <button type="submit" onClick={this.deletePricingItem} >Delete</button>
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
          </div>
        </div>
      </div>
    );
  }
};

// Source DeleteItem.js