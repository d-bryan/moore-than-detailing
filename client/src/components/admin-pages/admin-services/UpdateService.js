import React from 'react';

// import components
import NavAdmin from '../../navigation/NavAdmin';
import Form from '../../form-component/Form';

export default class UpdateServie extends React.PureComponent {

  state = {
    id: '',
    adminId: '',
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
    const {
      id,
      adminId,
      serviceName,
      price,
    } = this.state;
    const updatedService = {
      adminId,
      serviceName,
      price,
    };

    await context.actions.updateService(id, updatedService, authAdmin)
      .then(errors => {
        if (errors.length) {
          this.setState({ errors: errors });
        } else {
          this.setState({
            serviceName: updatedService.serviceName,
            price: updatedService.price,
          });

          this.props.history.push('/admin-services');
        }
      })
      .catch(err => {
        console.error(`UPDATE SERVICE: ${err}`);
        this.props.history.push('/error');
      })

  };

  async componentDidMount() {
    const { context } = this.props;

    await context.actions.generateServiceDetail(this.props.match.params.id)
      .then(service => {
        if (service === null) {
          console.info(`LOCATE SERVICE: ${service}`);
          this.props.history.push('/not-found');
        } else {
          this.setState({
            id: service.id,
            adminId: service.adminId,
            serviceName: service.serviceName,
            price: service.price,
          })
        }
      })
      .catch(err => {
        console.error(`UPDATE REVIEW: ${err}`);
        this.props.history.push('/error');
      });

      console.log(this.state)
  };

  render() {
    const { context } = this.props;
    const {
      serviceName,
      price
    } = this.state;

    return(
      <>

        <NavAdmin 
          context={context}
        />

        <Form
          id={"update--service--form"}
          c_name={"admin--update--form"}
          cancel={this.cancel}
          errors={this.state.errors}
          submit={this.submit}
          submitButtonText="Update"
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