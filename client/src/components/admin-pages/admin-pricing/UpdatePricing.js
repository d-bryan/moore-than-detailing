import React from 'react';

// import components
import NavAdmin from '../../navigation/NavAdmin';
import Form from '../../form-component/Form';

export default class UpdatePricing extends React.PureComponent {

  state = {
    id: '',
    adminId: '',
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
  }

  submit = async() => {
    const { context } = this.props;
    const authAdmin = context.authenticatedAdmin.data;
    const {
      id,
      adminId,
      vehicleSize,
      fullDetailPlus,
      fullDetail,
      interiorDetail,
      theBlitz,
      exteriorDetail,
      basicWash,
    } = this.state;

    const updatedPricing = {
      adminId,
      vehicleSize,
      fullDetailPlus,
      fullDetail,
      interiorDetail,
      theBlitz,
      exteriorDetail,
      basicWash,
    };

    await context.actions.updatePriceItem(id, updatedPricing, authAdmin)
      .then(errors => {
        if (errors.length) {
          this.setState({ errors: errors});
        } else {
          this.setState({
            vehicleSize: updatedPricing.vehicleSize,
            fullDetailPlus: updatedPricing.fullDetailPlus,
            fullDetail: updatedPricing.fullDetail,
            interiorDetail: updatedPricing.interiorDetail,
            theBlitz: updatedPricing.theBlitz,
            exteriorDetail: updatedPricing.exteriorDetail,
            basicWash: updatedPricing.basicWash,
          })

          this.props.history.push('/admin-pricing');
        }
      })
      .catch(err => {
        console.error(`UPDATE PRICING TABLE: ${err}`);
        this.props.history.push('/error');
      });

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

  async componentDidMount() {
    const { context } = this.props;

    await context.actions.generatePriceDetail(this.props.match.params.id)
      .then(pricing => {
        this.setState({
          id: pricing.id,
          adminId: pricing.Admin.id,
          vehicleSize: pricing.vehicleSize,
          fullDetailPlus: pricing.fullDetailPlus,
          fullDetail: pricing.fullDetail,
          interiorDetail: pricing.interiorDetail,
          theBlitz: pricing.theBlitz,
          exteriorDetail: pricing.exteriorDetail,
          basicWash: pricing.basicWash,
        })
      })
      .catch(err => {
        console.error(`UPDATE PRICING TABLE: ${err}`);
        this.props.history.push('/error');
      })

      console.log(this.state)
  }

  render() {
    const { context } = this.props;

    return (
      <>

        <NavAdmin 
          context={context}
        />

        <Form 
          id={"update--pricing--form"}
          cancel={this.cancel}
          errors={this.state.errors}
          submit={this.submit}
          submitButtonText="Update"
          elements={() => (
            <>
            <h1>Update Price List Item</h1>
            <p>(Prices must be in number format)</p>
            <label htmlFor="vehicleSize">Vehicle Size</label>
            <input 
              id="vehicleSize"
              name="vehicleSize"
              type="text"
              value={this.state.vehicleSize}
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
              value={this.state.fullDetailPlus}
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
              value={this.state.fullDetail}
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
              value={this.state.interiorDetail}
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
              value={this.state.theBlitz}
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
              value={this.state.exteriorDetail}
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
              value={this.state.basicWash}
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