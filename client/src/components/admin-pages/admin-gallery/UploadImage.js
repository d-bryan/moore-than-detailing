import React from 'react';

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

      await context.actions.createGalleryItem(formData, authAdmin)
      .then(errors => {
        if (errors.length) {
          this.setState({ errors: errors });
        } else {
          this.props.history.push('/admin-gallery');
        }
      })
      .catch(err => {
        console.log(`UPLOAD IMAGE: ${err}`);
      })
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