import React, { Component } from 'react';

// component imports
import PriceListTable from './price-list-table/PriceListTable';
import SectionContainer from './package-detailing-services/SectionContainer';

export default class DetailingServices extends Component {

  state = {
    packages: '',
    descriptionList: [],
    estimatedTimeArray: [],
    packageTitleArray: [],
    detailPricing: '',
  }

  async componentDidMount() {
    const { context } = this.props;
    await context.actions.generatePackageList()
    .then(data => {
      this.setState({
        packages: data,
      });
    });
    await context.actions.generatePriceList()
      .then(data => {
        this.setState({
          detailPricing: data,
        })
      });
  
    this.createLists();
  }

  createLists() {
    var pkgArr = [];
    var estTimeArray = [];
    var titleArray = [];
    const packageDetail = this.state.packages;
    
    packageDetail.forEach(item => {
      pkgArr.push(item.description);
      estTimeArray.push(item.estimatedTime);
      titleArray.push(item.title);
    });

    this.setState({
      descriptionList: pkgArr,
      estimatedTimeArray: estTimeArray,
      packageTitleArray: titleArray,
    });
  }

  render() {
    return (
      <>
        <div className="slide--5--container bounds">
          <div id="slide--5--wrap">
            <h2>DETAILING DERVICES</h2>
            <p>(prices vary depending on the size of your vehicle)</p>
            
            <div className="desktop--flex--container">

              <SectionContainer
                packageData={this.state.packages}
                estimatedTime={this.state.estimatedTimeArray}
                description={this.state.descriptionList}
                title={this.state.packageTitleArray}
              />

            </div>
            
            <PriceListTable 
              data={this.state.detailPricing}
              packageData={this.state.packages}
            />

          </div>
        </div>
      </>  
    );
  }
};

// Source HomePages.js