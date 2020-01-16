import React from 'react';
import Form from '../form-component/Form';
import NavUser from '../navigation/NavUser';
import { Helmet } from 'react-helmet'

export default class SignIn extends React.PureComponent {

  state = {
    emailAddress: '',
    password: '',
    errors: [],
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

  submit = async () => {
    const { context } = this.props;
    const from = '/admin-dashboard' || { from: this.props.history.goBack() };
    const { 
      emailAddress, 
      password
     } = this.state;

    console.log(from);

    await context.actions.signIn(emailAddress, password)
      .then(errors => {

        if (errors.length) {
          this.setState({ errors: [errors] });
        } else {
          this.props.history.push(from);
          console.log(`Successful login`);
        }

        // if (admin === null) {
        //   this.setState(() => {
        //     return { errors: [ 'We could not locate that user' ] };
        //   });
        // } else {
        //   this.props.history.push(from);
        //   console.log(`Successful login for username: ${admin.firstName}`);
        // }
      })
      .catch(err => {
        console.error(`There was an issue attempting to login the administrator: ${err}`);
        this.props.history.push('/error');
      })
    
    
  }

  cancel = () => {
    this.props.history.push('/');
  }

  render() {
    const {
      emailAddress,
      password
    } = this.state;

    return(
      <>

      <Helmet>
        <title>Admin Login | Moore Than Detailing</title>
        <meta name="description" content="Administrative Login page for Moore Than Detailing."/>
        <meta property="og:title" content="Admin Login | Moore Than Detailing"/>
        <meta property="og:description" content="Administrative Login page for Moore Than Detailing."/>
        <meta property="og:type" content="website"/>
        <meta property="og:url" content="https://www.moorethandetailing.com/admin-login"/>
        <meta property="og:image" content="../../website-mockups-assets/logo-grey-text.png"/>
        <meta name="keywords" content="Administrative, Login, Moore Than Detailing"/>
      </Helmet>

      <NavUser />

      <Form
        id="login--page"
        cancel={this.cancel}
        errors={this.state.errors}
        submit={this.submit}
        submitButtonText="Login"
        elements={() => (
          <>
            <h1>Login to View Administrative Resources</h1>
            <div className="admin--input--container">
              <label htmlFor="emailAddress">Enter your username</label>
              <input 
                id="emailAddress"
                name="emailAddress"
                type="text"
                value={emailAddress}
                onChange={this.change}
              />
              <br/>
              <label htmlFor="password">Enter your password</label>
              <input 
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={this.change}
              />
            </div>
          </>
        )}
      />

      </>
    );
  }
};
