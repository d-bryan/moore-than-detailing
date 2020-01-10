import React from 'react';
import AdminFooter from './AdminFooter';
import UserFooter from './UserFooter';


export default class Footer extends React.PureComponent {
  render () {

    const { context } = this.props;
    const authAdmin = context.authenticatedAdmin;

    return (
      <>
        {
          (authAdmin) ?
          <AdminFooter />
          :
          <UserFooter />
        }
      </>
    );

  }
}