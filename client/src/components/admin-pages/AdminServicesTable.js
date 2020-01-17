import React from 'react';
import { Link } from 'react-router-dom';

// import components
import NavAdmin from '../navigation/NavAdmin';
import AdminServiceHead from './admin-services/AdminServiceHead';
import AdminServiceContainer from './admin-services/AdminServiceContainer';

export default class AdminServicesTable extends React.PureComponent {

  state = {
    services: [],
  };

  async componentDidMount() {
    const { context } = this.props;

    await context.actions.generateServiceList()
      .then(services => {
        this.setState({ services: services });
      })
      .catch(err => {
        console.error(`ADMIN SERVICES TABLE: ${err}`);
        this.props.history.push('/error');
      });
      
  }

  render() {
    const { context } = this.props;
    const authAdmin = context.authenticatedAdmin;
    var mapServiceData = this.state.services.map(d => {
      return (
        <AdminServiceContainer 
          currentAdmin={authAdmin}
          key={d.id}
          id={d.id}
          adminId={d.adminId}
          serviceName={d.serviceName}
          price={d.price}
        />
      );
    });

    return (
      <>

        <NavAdmin 
          context={context}
        />

      <div id="admin--services--table--container" className="admin--table--container">
        <h1>Services</h1>
        <table>
          <thead>
            <tr>
              <AdminServiceHead />
            </tr>
          </thead>
          <tbody>
            { mapServiceData }
          </tbody>
        </table>
      </div>

      <div className="create--new--container">
        <Link to="/admin-services/create"><button>Create New Service</button></Link>
      </div>


      </>
    );
  }


};

// Source App.js