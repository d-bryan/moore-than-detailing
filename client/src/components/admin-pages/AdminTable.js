import React from 'react';
import { Link } from 'react-router-dom';
import NavAdmin from '../navigation/NavAdmin';

// import components
import AdminTableHead from './admins-table/AdminTableHead';
import AdminTableContainer from './admins-table/AdminTableContainer';


export default class AdminTable extends React.PureComponent {

  state = {
    admins: [],
  };

  async componentDidMount() {
    const context = this.props.context;
    const authAdmin = context.authenticatedAdmin.data;

    await context.actions.getAdminList(authAdmin)
      .then(data => {
        this.setState({
          admins: data
        });
      })
      .catch(err => {
        console.error(`There was an error attempting to fetch the admin data for the table. ${err}`);
        this.props.push('/error');
      });
  }

  render() {
    const context = this.props.context;
    const authAdmin = context.authenticatedAdmin;
    // console.log(authAdmin)
    var mapAdminData = this.state.admins.map(d => {
      return (
        <AdminTableContainer
          admin={authAdmin}
          key={d.id}
          id={d.id}
          firstName={d.firstName}
          lastName={d.lastName}
          emailAddress={d.emailAddress}
          actions={d.id}
        />
      );
    });
    

    return (
      <>

      <NavAdmin 
        context={context}
      />

      <div id="admins--table--container">
        <h1>Administrators</h1>
        <table>
          <thead>
            <AdminTableHead />
          </thead>
          <tbody>
            { mapAdminData }
          </tbody>
        </table>
      </div>

      <div id="create--new--admin--container">
        <Link to="/admin/create"><button>Create New Admin</button></Link>
      </div>

      </>
    );
  }
};

// Source App.js
