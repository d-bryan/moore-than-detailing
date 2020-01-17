import React from 'react';

// import components
import NavAdmin from '../../navigation/NavAdmin';
import Form from '../../form-component/Form';

export default class CreateAdmin extends React.PureComponent {

  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
    errors: [],
  };

  cancel = () => {
    this.props.history.goBack();
  }

  submit = async () => {
    const { context } = this.props;
    const authAdmin = context.authenticatedAdmin.data;

    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword
    } = this.state;

    const newAdmin = {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword
    }

    await context.actions.createAdmin(newAdmin, authAdmin)
      .then(errors => {
        if (errors.length) {
          this.setState({ errors: errors });
        } else {
          this.setState({
            firstName: newAdmin.firstName,
            lastName: newAdmin.lastName,
            emailAddress: newAdmin.emailAddress,
            password: newAdmin.password,
            confirmPassword: newAdmin.confirmPassword
          });

          this.props.history.push('/admin-table');
        
        }
        
      })
      .catch(err => {
        console.error(`There was an error creating the new administrative user: ${err}`);
        this.props.history.push('/error');
      })
    
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  render() {
    const context = this.props.context;
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword
    } = this.state;

    return (
      <>

        <NavAdmin 
          context={context}
        />

        <Form 
          id={"create--new--admin--form"}
          c_name={"create--new--form"}
          cancel={this.cancel}
          errors={this.state.errors}
          submit={this.submit}
          submitButtonText="Create"
          elements={() => (
            <>
              <h1>Create New Administrator</h1>
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={firstName}
                onChange={this.change}
              />
              <br/>
              <label htmlFor="lastName">Last Name</label>
              <input 
                id="lastName"
                name="lastName"
                type="text"
                value={lastName}
                onChange={this.change}
              />
              <br/>
              <label htmlFor="emailAddress">Email Address</label>
              <input 
                id="emailAddress"
                name="emailAddress"
                type="text"
                value={emailAddress}
                onChange={this.change}
              />
              <br/>
              <label htmlFor="password">Password</label>
              <input 
                id="create-password"
                name="password"
                type="password"
                value={password}
                onChange={this.change}
              />
              <br/>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input 
                id="create-password-confirm"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
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