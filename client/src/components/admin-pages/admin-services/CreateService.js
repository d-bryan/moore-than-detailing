import React from 'react';

// import components
import NavAdmin from '../../navigation/NavAdmin';
import Form from '../../form-component/Form';

export default class CreateService extends React.PureComponent {

  state = {
    serviceName: '',
    price: '',
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
      serviceName,
      price
    } = this.state;
    const newService = {
      adminId,
      serviceName,
      price
    };

    await context.actions.createService(newService, authAdmin)
      .then(errors => {
        if (errors.length) {
          this.setState({ errors: errors });
        } else {
          this.setState({
            serviceName: newService.serviceName,
            price: newService.price,
          });

          this.props.history.push('/admin-services');
        }
      })
      .catch(err => {
        console.error(`CREATE SERVICE: ${err}`);
        this.props.history.push('/error');
      })

  };

  render() {
    const { context } = this.props;
    const {
      serviceName,
      price
    } = this.state;

    return (
      <>

        <NavAdmin 
          context={context}
        />

        <Form 
          id={"create--service--form"}
          c_name={"create--new--form"}
          cancel={this.cancel}
          errors={this.state.errors}
          submit={this.submit}
          submitButtonText="Create"
          elements={() => (
            <>
              <h1>Create New Service Item</h1>
              <label htmlFor="serviceName">Service Name</label>
              <input 
                id="serviceName"
                name="serviceName"
                type="text"
                value={serviceName}
                onChange={this.change}
              />
              <br/>
              <label htmlFor="price">Price (Text Format)</label>
              <input 
                id="price"
                name="price"
                type="text"
                value={price}
                onChange={this.change}
              />
            </>
          )}
        />
      </>
    );
  }

};

// Source App.js