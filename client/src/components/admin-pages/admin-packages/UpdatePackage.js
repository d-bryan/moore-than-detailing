import React from 'react';

// import components
import NavAdmin from '../../navigation/NavAdmin';
import Form from '../../form-component/Form';


export default class UpdatePackage extends React.PureComponent {

  state = {
    id: '',
    adminId: '',
    title: '',
    description: '',
    estimatedTime: '',
    firstName: '',
    lastName: '',
    emailAddress: '',
    errors: []
  };

  cancel = () => {
    this.props.history.goBack();
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
    const authAdmin = context.authenticatedAdmin.data;
    const {
      id,
      adminId,
      title,
      estimatedTime,
      description
    } = this.state;

    const updatedPackage = {
      adminId,
      title,
      estimatedTime,
      description
    };

    await context.actions.updatePackage(id, updatedPackage, authAdmin)
      .then(errors => {
        if (errors.length) {
          this.setState({ errors: errors })
        } else {
          this.setState({
            title: updatedPackage.title,
            estimatedTime: updatedPackage.estimatedTime,
            description: updatedPackage.description
          })

          this.props.history.push('/admin-packages');

        }
      })
      .catch(err => {
        console.error(`UPDATE PACKAGE ADMIN: ${err}`);
        this.props.history.push('/error');
      })

  }

  async componentDidMount() {
    const { context } = this.props;

    await context.actions.generatePackageDetail(this.props.match.params.id)
      .then(pkg => {
        if (pkg === null) {
          console.info(`The package does not exist: ${pkg}`);
          this.props.history.push('/not-found');
        } else {
          this.setState({
            id: pkg.id,
            adminId: pkg.Admin.id,
            title: pkg.title,
            description: pkg.description,
            estimatedTime: pkg.estimatedTime,
            firstName: pkg.Admin.firstName,
            lastName: pkg.Admin.lastName,
            emailAddress: pkg.Admin.emailAddress,
          })
        }
      })
      .catch(err => {
        console.error(`There was an issue attempting to retrieve the package for updating: ${err}`);
        this.props.history.push('/error');
      });

  }

  render() {
    const { context } = this.props;


    return (
      <>
        
        <NavAdmin 
          context={context}
        />

        <Form 
          id={"update--package--form"}
          c_name={"admin--update--form"}
          cancel={this.cancel}
          errors={this.state.errors}
          submit={this.submit}
          submitButtonText="Update"
          elements={() => (
            <>
              <h1>Update Detailing Package</h1>
              <label htmlFor="title">Title</label>
              <input 
                id="title"
                name="title"
                type="text"
                value={this.state.title}
                onChange={this.change}
              />
              <br/>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input 
                id="estimatedTime"
                name="estimatedTime"
                type="text"
                value={this.state.estimatedTime}
                onChange={this.change}
              />
              <br/>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                type="text"
                cols="30"
                rows="10"
                value={this.state.description}
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