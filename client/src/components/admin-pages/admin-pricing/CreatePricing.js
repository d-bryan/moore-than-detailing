import React from 'react';

// import components
import NavAdmin from '../../navigation/NavAdmin';
import Form from '../../form-component/Form';

export default class CreatePricing extends React.PureComponent {

  state = {
    vehicleSize: '',
    fullDetailPlus: '',
    fullDetail: '',
    interiorDetail: '',
    theBlitz: '',
    exteriorDetail: '',
    basicWash: '',
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

  submit = async() => {
    const { context } = this.props;
    const authAdmin = context.authenticatedAdmin.data;
    const adminId = context.authenticatedAdmin.id;
    const {
      vehicleSize,
      fullDetailPlus,
      fullDetail,
      interiorDetail,
      theBlitz,
      exteriorDetail,
      basicWash,
    } = this.state;

    const newPricingItem = {
      adminId,
      vehicleSize,
      fullDetailPlus,
      fullDetail,
      interiorDetail,
      theBlitz,
      exteriorDetail,
      basicWash,
    };

    await context.actions.createPriceItem(newPricingItem, authAdmin)
      .then(errors => {
        if (errors.length) {
          this.setState({ errors: errors });
        } else {
          this.setState({
            vehicleSize: newPricingItem.vehicleSize,
            fullDetailPlus: newPricingItem.fullDetailPlus,
            fullDetail: newPricingItem.fullDetail,
            interiorDetail: newPricingItem.interiorDetail,
            theBlitz: newPricingItem.theBlitz,
            exteriorDetail: newPricingItem.exteriorDetail,
            basicWash: newPricingItem.basicWash,
          });

          this.props.history.push('/admin-pricing');
        }
      })
      .catch(err => {
        console.error(`CREATE PRICING ITEM: ${err}`);
        this.props.history.push('/error');
      });



  };

  render() {
    const { context } = this.props;
    const {
      vehicleSize,
      fullDetailPlus,
      fullDetail,
      interiorDetail,
      theBlitz,
      exteriorDetail,
      basicWash,
    } = this.state;

    return (
      <>

        <NavAdmin 
          context={context}
        />
        
        <Form 
          id={"create--new--pricing--form"}
          c_name={"create--new--form"}
          cancel={this.cancel}
          errors={this.state.errors}
          submit={this.submit}
          submitButtonText="Create"
          elements={() => (
            <>
            <h1>Create New Price List Item</h1>
            <p>(Prices must be in number format)</p>
            <label htmlFor="vehicleSize">Vehicle Size</label>
            <input 
              id="vehicleSize"
              name="vehicleSize"
              type="text"
              value={vehicleSize}
              onChange={this.change}
            />
            <br/>
            <label htmlFor="fullDetailPlus">Full Detail Plus Price</label>
            <input 
              id="fullDetailPlus"
              name="fullDetailPlus"
              type="number"
              min="0"
              max="999"
              value={fullDetailPlus}
              onChange={this.change}
            />
            <br/>
            <label htmlFor="fullDetail">Full Detail Price</label>
            <input 
              id="fullDetail"
              name="fullDetail"
              type="number"
              min="0"
              max="999"
              value={fullDetail}
              onChange={this.change}
            />
            <br/>
            <label htmlFor="interiorDetail">Interior Detail Price</label>
            <input 
              id="interiorDetail"
              name="interiorDetail"
              type="number"
              min="0"
              max="999"
              value={interiorDetail}
              onChange={this.change}
            />
            <br/>
            <label htmlFor="theBlitz">The Blitz Price</label>
            <input 
              id="theBlitz"
              name="theBlitz"
              type="number"
              min="0"
              max="999"
              value={theBlitz}
              onChange={this.change}
            />
            <br/>
            <label htmlFor="exteriorDetail">Exterior Detail Price</label>
            <input 
              id="exteriorDetail"
              name="exteriorDetail"
              type="number"
              min="0"
              max="999"
              value={exteriorDetail}
              onChange={this.change}
            />
            <br/>
            <label htmlFor="basicWash">Basic Wash Price</label>
            <input 
              id="basicWash"
              name="basicWash"
              type="number"
              min="0"
              max="999"
              value={basicWash}
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