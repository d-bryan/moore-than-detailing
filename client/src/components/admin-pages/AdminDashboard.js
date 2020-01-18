import React from 'react';
import { Link } from 'react-router-dom';

// import components
import NavAdmin from '../navigation/NavAdmin';

export default class AdminDashboard extends React.PureComponent {

  state = {

  }

  componentDidMount() {

  }

  render() {

    return (
    <>

      <NavAdmin 
        context={this.props.context}
      />

      <div id="admin--dashboard--container">
        <div className="bounds grid-100">
          <div className="admin--dashboard grid-33">
            <section>
              <h2>View Current Items In Database</h2>
              <Link to="/admin-table"><button>Admin List</button></Link>
              <Link to="/admin-gallery"><button>Image List</button></Link>
              <Link to="/admin-packages"><button>Detail Packages Table</button></Link>
              <Link to="/admin-pricing"><button>Detail Pricing Table</button></Link>
              <Link to="/admin-reviews"><button>Customer Reviews Table</button></Link>
              <Link to="/admin-services"><button>Additional Services Table</button></Link>
            </section>
            <section>
              <h2>Create New Items</h2>
              <Link to="/admin/create"><button>Create New Admin</button></Link>
              <Link to="/admin-gallery/create"><button>Upload Image</button></Link>
              {/* <Link to="/admin-packages/create"><button>Create New Package</button></Link> */}
              <Link to="/admin-pricing/create"><button>Create Detail Pricing</button></Link>
              <Link to="/admin-reviews/create"><button>Create New Customer Review</button></Link>
              <Link to="/admin-services/create"><button>Create New Service</button></Link>
            </section>
          </div>
        </div>
      </div>



    </>    
    );
  }
};

// Source App.js
