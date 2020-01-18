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
    
      await context.actions.deleteAdmin(paramsID, authAdmin)
      .then(errors => {
        if (errors.length) {
          provider.history.push('/error');
        } else {
          provider.history.goBack();
        }
      })
      .catch(err => {
        console.error(`DELETE ADMIN: ${err}`);
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
          console.error(`DELETE PACKAGE: ${err}`);
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

  deleteReview = async () => {
    const authAdmin = this.props.context.authenticatedAdmin.data;
    const context = this.props.context;
    const provider = this.props.provider;
    const paramsID = provider.match.params.id;

    if (authAdmin && paramsID) {

      await context.actions.deleteReview(paramsID, authAdmin)
        .then(errors => {
          if (errors.length) {
            provider.history.push('/error');
          } else {
            provider.history.goBack();
          }
        })
        .catch(err => {
          console.error(`DELETE REVIEW: ${err}`);
          provider.history.push('/error');
        })

    } else {
      provider.history.push('/forbidden');
    }
  }

  deleteService = async () => {
    const authAdmin = this.props.context.authenticatedAdmin.data;
    const context = this.props.context;
    const provider = this.props.provider;
    const paramsID = provider.match.params.id;

    if (authAdmin && paramsID) {

      await context.actions.deleteService(paramsID, authAdmin)
        .then(errors => {
          if (errors.length) {
            provider.history.push('/error');
          } else {
            provider.history.goBack();
          }
        })
        .catch(err => {
          console.error(`DELETE SERVICE: ${err}`);
          provider.history.push('/error');
        })

    } else {
      provider.history.push('/forbidden');
    }
  }

  deleteGallery = async () => {
    const authAdmin = this.props.context.authenticatedAdmin.data;
    const context = this.props.context;
    const provider = this.props.provider;
    const paramsID = provider.match.params.id;

    if (authAdmin && paramsID) {

      await context.actions.deleteGalleryItem(paramsID, authAdmin)
        .then(errors => {
          if (errors.length) {
            provider.history.push('/error');
          } else {
            provider.history.goBack();
          }
        })
        .catch(err => {
          console.error(`DELETE GALLERY ITEM: ${err}`);
          provider.history.push('/error');
        })

    } else {
      provider.history.push('/forbidden');
    }
  }

  render() {
    var buttonOptions;
    const path = this.props.provider.match.path;
    
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
    } else if (path === '/admin-reviews/:id/delete') {
      buttonOptions = (
        <>
          <Link to="/admin-reviews"><button>Cancel</button></Link>
          <button type="submit" onClick={this.deleteReview} >Delete</button>
        </>
      );
    } else if (path === '/admin-services/:id/delete') {
      buttonOptions = (
        <>
          <Link to="/admin-services"><button>Cancel</button></Link>
          <button type="submit" onClick={this.deleteService} >Delete</button>
        </>
      );
    } else if (path === '/admin-gallery/:id/delete') {
      buttonOptions = (
        <>
          <Link to="/admin-gallery"><button>Cancel</button></Link>
          <button type="submit" onClick={this.deleteGallery} >Delete</button>
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