import React from 'react';

// import components
import NavAdmin from '../../navigation/NavAdmin';
import Form from '../../form-component/Form';

export default class UpdateReview extends React.PureComponent {

  state = {
    id: '',
    adminId: '',
    customerFirstName: '',
    customerLastName: '',
    customerReview: '',
    customerRating: '',
    errors: [],
  };

  cancel = () => {
    this.props.history.goBack();
  };

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  };

  submit = async () => {
    const { context } = this.props;
    const authAdmin = context.authenticatedAdmin.data;
    const {
      id,
      adminId,
      customerFirstName,
      customerLastName,
      customerReview,
      customerRating,
    } = this.state;
    const updatedReview = {
      adminId,
      customerFirstName,
      customerLastName,
      customerReview,
      customerRating,
    };

    await context.actions.updateReview(id, updatedReview, authAdmin)
      .then(errors => {
        if (errors.length) {
          this.setState({ errors: errors });
        } else {
          this.setState({
            customerFirstName: updatedReview.customerFirstName,
            customerLastName: updatedReview.customerLastName,
            customerReview: updatedReview.customerReview,
            customerRating: updatedReview.customerRating,
          });

          this.props.history.push('/admin-reviews');
        }
      })
      .catch(err => {
        console.error(`UPDATE REVIEW: ${err}`);
        this.props.history.push('/error');
      });

  };

  async componentDidMount() {
    const { context } = this.props;

    await context.actions.generateReviewDetail(this.props.match.params.id)
      .then(review => {
        if (review === null) {
          console.info(`LOCATE REVIEW: ${review}`);
          this.props.history.push('/not-found');
        } else {
          this.setState({
            id: review.id,
            adminId: review.Admin.id,
            customerFirstName: review.customerFirstName,
            customerLastName: review.customerLastName,
            customerReview: review.customerReview,
            customerRating: review.customerRating,
          });
        }
      })
      .catch(err => {
        console.error(`UPDATE REVIEW: ${err}`);
        this.props.history.push('/error');
      });

      console.log(this.state);

  }

  render() {
    const { context } = this.props;
    const {
      customerFirstName,
      customerLastName,
      customerReview,
      customerRating,
    } = this.state;

    return(
      <>

        <NavAdmin 
          context={context}
        />

        <Form 
          id={"update--reviews--form"}
          c_name={"admin--update--form"}
          cancel={this.cancel}
          errors={this.state.errors}
          submit={this.submit}
          submitButtonText="Create"
          elements={() => (
            <>
              <h1>Create New Customer Review</h1>
              <label htmlFor="customerFirstName">Customer First Name</label>
              <input 
                id="customerFirstName"
                name="customerFirstName"
                type="text"
                value={customerFirstName}
                onChange={this.change}
              />
              <br/>
              <label htmlFor="customerLastName">Customer Last Name</label>
              <input 
                id="customerLastName"
                name="customerLastName"
                type="text"
                value={customerLastName}
                onChange={this.change}
              />
              <br/>
              <label htmlFor="customerRating">Customer Rating</label>
              <select 
                id="customerRating"
                name="customerRating"
                type="number"
                value={customerRating}
                onChange={this.change}
              >
                <option type="number" value="1">1</option>
                <option type="number" value="2">2</option>
                <option type="number" value="3">3</option>
                <option type="number" value="4">4</option>
                <option type="number" value="5">5</option>
              </select>
              <br/>
              <label htmlFor="customerReview">Customer Review</label>
              <textarea
                id="customerReview"
                name="customerReview"
                cols="30" 
                rows="10"
                value={customerReview}
                onChange={this.change}
              ></textarea>
            </>
          )}
        />

      </>
    );
  }

};

// Source App.js
