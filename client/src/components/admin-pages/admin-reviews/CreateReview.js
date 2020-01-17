import React from 'react';

// import components
import NavAdmin from '../../navigation/NavAdmin';
import Form from '../../form-component/Form';

export default class CreateReview extends React.PureComponent {

  state = {
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
    const adminId = context.authenticatedAdmin.id;
    const {
      customerFirstName,
      customerLastName,
      customerReview,
      customerRating,
    } = this.state;
    const newReview = {
      adminId,
      customerFirstName,
      customerLastName,
      customerReview,
      customerRating,
    };

    await context.actions.createReview(newReview, authAdmin)
      .then(errors => {
        if (errors.length) {
          this.setState({ errors: errors});
        } else {
          this.setState({
            customerFirstName: newReview.customerFirstName,
            customerLastName: newReview.customerLastName,
            customerReview: newReview.customerReview,
            customerRating: newReview.customerRating,
          });

          this.props.history.push('/admin-reviews');
        }
      })
      .catch(err => {
        console.error(`CREATE ADMIN REVIEW: ${err}`);
        this.props.history.push('/error');
      });

  };

  render() {
    const { context } = this.props;
    const {
      customerFirstName,
      customerLastName,
      customerReview,
      customerRating,
    } = this.state;
    return (
      <>

        <NavAdmin 
          context={context}
        />

        <Form 
          id={"create--new--reviews--form"}
          c_name={"create--new--form"}
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
