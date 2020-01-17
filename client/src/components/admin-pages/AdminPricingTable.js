import React from 'react';
import { Link } from 'react-router-dom';

// import components
import NavAdmin from '../navigation/NavAdmin';
import AdminPricingHead from './admin-pricing/AdminPricingHead';
import AdminPricingContainer from './admin-pricing/AdminPricingContainer';

export default class AdminPricingTable extends React.PureComponent {

  state = {
    pricing: [],
  };

  async componentDidMount() {
    const { context } = this.props;
    
    await context.actions.generatePriceList()
      .then(pricing => {
        this.setState({ pricing: pricing });
      })
      .catch(err => {
        console.error(`ADMIN PRICING TABLE: ${err}`);
        this.props.history.push('/error', { error: 'There was an issue retrieving the data from the database' });
      })

  }

  render() {
    const { context } = this.props;
    const authAdmin = context.authenticatedAdmin;
    var mapPricingData = this.state.pricing.map(d => {
      return (
        <AdminPricingContainer 
          currentAdmin={authAdmin}
          key={d.id}
          id={d.id}
          vehicleSize={d.vehicleSize}
          fullDetailPlus={d.fullDetailPlus}
          fullDetail={d.fullDetail}
          interiorDetail={d.interiorDetail}
          theBlitz={d.theBlitz}
          exteriorDetail={d.exteriorDetail}
          basicWash={d.basicWash}
        />
      );
    });

    return (
      <>

        <NavAdmin 
          context={context}
        />

      <div id="admin--pricing--table" className="admin--table--container">
        <h1>Pricing</h1>
        <table>
          <thead>
            <tr>
              <AdminPricingHead />
            </tr>
          </thead>
          <tbody>
            { mapPricingData }
          </tbody>
        </table>
      </div>

      <div className="create--new--container">
        <Link to="/admin-pricing/create"><button>Create New Pricing</button></Link>
      </div>


      </>
    );
  }
};

// Source App.js