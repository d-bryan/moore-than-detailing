import React from 'react';
import config from '../../../api-config';
import axios from 'axios';

// import components
import NavAdmin from '../../navigation/NavAdmin';
import Form from '../../form-component/Form';

export default class UploadImage extends React.PureComponent {

  state = {
    vehicleType: '',
    imageLocation: null,
    errors: [],
  };

  cancel = () => {
    this.props.history.goBack();
  };

  fileChange = (event) => {
    const files = event.target.files[0];
    const formSubmitBtn = document.getElementById('form--submit--button');
    
    this.setState({
      imageLocation: files
    })
    
    formSubmitBtn.removeAttribute('disabled');
  }

  vehicleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    })
  }

  /**
   * Fetches the requests to the API for Multipart form data
   * @param {URL} path - Path to the API
   * @param {Request} method - HTTP Request Method
   * @param {Header} body - Header option values to include
   * @param {Boolean} requiresAuth - True | False value for if the route requires Authorization
   * @param {Object} credentials - Pass credentials through for authorization
   */
  async multipartAPI(path, method = 'POST', body = null, requiresAuth = true, credentials = null) {
    // API URL path + route
    const url = config.apiBaseUrl + path;

    // Request header options
    const options = {
      method,
      url: url,
      headers: {
        'Content-Type': 'multipart/form-data;',
      },
      data: body,
    };

    // Convert body to JSON string if not null
    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    // If the path required credentials pass them in the header
    if (requiresAuth) {

      let encodedCredentials = null;

      if (credentials.emailAddress && credentials.password) {
        encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
      } else {
        encodedCredentials = credentials;
      }

      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    await axios(options)
    .then(response => {
      
      if (response.status === 201) {
        return response;
      } else if (response.status === 400) {
        return response.data.errors;
      } else if (response.status === 401) {
        return response.data.errors;
      } else {
        throw new Error("There was an issue when attempting to upload the Image.");
      }

    })
    .catch(err =>{
      console.error(`UPLOADING IMAGE REQUEST: ${err}`);
      this.props.history.push('/error');
    });    

  }

  submit = async () => {
    const formSubmitBtn = document.getElementById('form--submit--button');
    const { context } = this.props;
    const authAdmin = context.authenticatedAdmin.data;
    const adminId = context.authenticatedAdmin.id;
    
    const {
      vehicleType,
      imageLocation,
    } = this.state;
    const formData = new FormData();

    formData.append('adminId', adminId);
    formData.append('vehicleType', vehicleType);

    if (imageLocation === null) {
      formSubmitBtn.setAttribute('disabled', true);
    } else {
      formData.append(
        'imageLocation',
        imageLocation,
        imageLocation.name
      );

      await this.multipartAPI('/gallery', 'POST', formData, true, authAdmin)
        .then(errors => {
          if (errors) {
            this.setState({ errors: errors });
          } else {
            this.props.history.push('/admin-gallery');
          }
        })
        .catch(err => {
          console.error(`UPLOAD IMAGE ISSUE: ${err}`);
        });

    }
  }

  render() {
    const { context } = this.props;
    const {
      vehicleType
    } = this.state;

    return (
      <>

        <NavAdmin 
          context={context}
        />

        <Form 
          id={"upload--image--form"}
          c_name={"create--new--form"}
          cancel={this.cancel}
          errors={this.state.errors}
          submit={this.submit}
          submitButtonText="Upload"
          elements={() => (
            <>
              <h1>Upload an Image (Must be less than 5MB)</h1>
              <label htmlFor="vehicleType">Vehicle Type</label>
              <select
                id="vehicleType"
                name="vehicleType"
                value={vehicleType}
                onChange={this.vehicleChange}
              >
                <option defaultValue value="coupe">Coupe</option>
                <option value="four-door">Four Door</option>
                <option value="suv">SUV</option>
                <option value="large">Large Vehicle</option>
              </select>
              <br/>
              <label htmlFor="imageLocation">Choose Image to Upload (Must be JPEG/JPG/PNG Format)</label>
              <input 
                id="imageLocation"
                name="imageLocation"
                onChange={this.fileChange}
                type="file"
                accept=".jpg, .jpeg, .png"
              />
            </>
          )}
        />
      </>
    );
  }
};

// Source App.js