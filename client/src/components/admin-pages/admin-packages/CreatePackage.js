import React from 'react';

// import components
import NavAdmin from '../../navigation/NavAdmin';
import Form from '../../form-component/Form';


export default class CreatePackage extends React.PureComponent {

  state = {
    title: '',
    description: '',
    estimatedTime: '',
    errors: [],
  };

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  cancel = () => {
    this.props.history.goBack();
  }

  submit = async() => {
    const { context } = this.props;
    const authAdmin = context.authenticatedAdmin.data;
    const adminId = context.authenticatedAdmin.id;
    const {
      title,
      description,
      estimatedTime
    } = this.state;

    const newPackage = {
      title,
      description,
      estimatedTime,
      adminId
    };

    await context.actions.createPackage(newPackage, authAdmin)
      .then(errors => {
        
        if (errors.length) {
          this.setState({ errors: errors });
        } else {
          this.setState({
            title: newPackage.title,
            description: newPackage.description,
            estimatedTime: newPackage.estimatedTime,
          });

          this.props.history.push('/admin-packages');

        }
      })
      .catch(err => {
        console.error(`There was an error creating the package for the admin packages table: ${err}`);
        this.props.history.push('/error');
      });

  }

  render() {
    const context = this.props.context;
    const {
      title,
      description,
      estimatedTime,
    } = this.state;

    return (
      <>

        <NavAdmin 
          context={context}
        />

        <Form 
          id={"create--new--packages--form"}
          c_name={"create--new--form"}
          cancel={this.cancel}
          errors={this.state.errors}
          submit={this.submit}
          submitButtonText="Create"
          elements={() => (
            <>
            <h1>Create New Detailing Package</h1>
            <label htmlFor="title">Title</label>
            <input 
              id="title"
              name="title"
              type="text"
              value={title}
              onChange={this.change}
            />
            <br/>
            <label htmlFor="estimatedTime">Estimated Time</label>
            <input 
              id="estimatedTime"
              name="estimatedTime"
              type="text"
              value={estimatedTime}
              onChange={this.change}
            />
            <br/>
            <label htmlFor="description">Description</label>
            <textarea 
              id="description"
              name="description"
              cols="30"
              rows="10"
              value={description}
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