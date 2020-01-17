import React from 'react';
import { Link } from 'react-router-dom';

// import components
import NavAdmin from '../navigation/NavAdmin';
import AdminReviewHead from './admin-reviews/AdminReviewHead';
import AdminReviewContainer from './admin-reviews/AdminReviewContainer';

export default class AdminReviewsTable extends React.PureComponent {

  state = {
    reviews: [],
  };

  async componentDidMount() {
    const { context } = this.props;

    await context.actions.generateReviewList()
      .then(reviews => {
        this.setState({ reviews: reviews });
      })
      .catch(err => {
        console.error(`ADMIN REVIEWS TABLE: ${err}`);
        this.props.history.push('/error');
      });

  }

  render() {
    const { context } = this.props;
    const authAdmin = context.authenticatedAdmin;
    var mapReviewData = this.state.reviews.map(d => {
      return(
        <AdminReviewContainer 
          currentAdmin={authAdmin}
          key={d.id}
          id={d.id}
          adminId={d.adminId}
          customerFirstName={d.customerFirstName}
          customerLastName={d.customerLastName}
          customerReview={d.customerReview}
          customerRating={d.customerRating}
        />
      );
    });
    return (
      <>

        <NavAdmin 
          context={context}
        />


      <div id="admin--reviews--table" className="admin--table--container">
        <h1>Customer Reviews</h1>
        <table>
          <thead>
            <tr>
              <AdminReviewHead />
            </tr>
          </thead>
          <tbody>
            { mapReviewData }
          </tbody>
        </table>
      </div>

      <div className="create--new--container">
        <Link to="/admin-reviews/create"><button>Create New Review</button></Link>
      </div>

      </>
    );
  }

};

// Source App.js

