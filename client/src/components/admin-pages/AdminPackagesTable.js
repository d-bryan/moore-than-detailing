import React from 'react';
import { Link } from 'react-router-dom';

// import components
import NavAdmin from '../navigation/NavAdmin';
import AdminPackageContainer from './admin-packages/AdminPackageContainer';
import AdminPackageHead from './admin-packages/AdminPackageHead';

export default class AdminPackagesTable extends React.PureComponent {

  state = {
    packages: [],
  };

  async componentDidMount() {
    const context = this.props.context;
    await context.actions.generatePackageList()
      .then(packages => {
        this.setState({ packages });
      })
      .catch(err => {
        console.error(`There was an issue retreiving the packages for the admin table: ${err}`);
        this.props.history.push('/error');
      });

  }

  render() {
    const context = this.props.context;
    const authAdmin = context.authenticatedAdmin;
    
    var mapPackageData = this.state.packages.map(d => {
      return (
        <AdminPackageContainer 
          currentAdmin={authAdmin}
          key={d.id}
          id={d.id}
          adminId={d.adminId}
          title={d.title}
          description={d.description}
          estimatedTime={d.estimatedTime}
        />
      );
    });

    return (
      <>

        <NavAdmin 
          context={context}
        />

      <div id="admin--packages--table" className="admin--table--container">
        <h1>Packages</h1>
        <table>
          <thead>
            <tr>
              <AdminPackageHead />
            </tr>
          </thead>
          <tbody>
            { mapPackageData }
          </tbody>
        </table>
      </div>

      <div className="create--new--container">
        <Link to="/admin-packages/create"><button>Create New Package</button></Link>
      </div>


      </>
    );
  }

};

// Source App.js