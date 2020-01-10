import React, { Component } from 'react';

// component imports
import BackgroundImageDescription from './package-detailing-services/BackgroundImageDescription';
import PriceListTable from './price-list-table/PriceListTable';

export default class DetailingServices extends Component {

  state = {
    packages: '',
    descriptionList: [],
    detailPricing: '',
    fullDetailPlus: '',
    fullDetail: '',
    interiorDetail: '',
    theBlitz: '',
    exteriorDetail: '',
    basicWash: '',
  }

  async componentDidMount() {
    const { context } = this.props;
    await context.actions.generatePackageList()
    .then(data => {
      // console.log(data);
      
      this.setState({
        packages: data,
      });
    });
    await context.actions.generatePriceList()
      .then(data => {
        // console.log(data);
        this.setState({
          detailPricing: data,
        })
      });
  const packageDetail = this.state.packages;
  // packageDetail.map(pkg => {

  // });
    this.createDescriptionList();
  }

  createDescriptionList() {
    var pkgArr = [];
    const packageDetail = this.state.packages;
    // var title = 'Full Detail Plus';
    // title = title.toLowerCase().replace(' ', '-').replace(' ', '-');
    // console.log(title);
    packageDetail.map(pkg => {

      pkgArr.push(pkg.description);

    });

    this.setState({
      descriptionList: pkgArr
      // descriptionList.push(pkg.description)
    });

    // var test = pkgArr[0].slice(0,(indexOf('\/n')));
    // console.log(test);

    console.log(pkgArr);
    // console.log(this.state.descriptionList);

    // packageDetail.forEach(element => {
    //   this.setState({
    //     descriptionList: [element.description]
    //   })
    // });
    // console.log(this.state);
  }

  render() {
    return (
      <>
        <div className="slide--5--container bounds">
          <div id="slide--5--wrap">
            <h2>DETAILING DERVICES</h2>
            <p>(prices vary depending on the size of your vehicle)</p>
            
            <div className="desktop--flex--container">
              <section className="slide--5--detailing--service desktop--float--services">
              
                <div id="full--detail--plus--home" className="slide--5--image">
                  <p>Full Detail Plus<br/>Starting at<br/>$250<br/>(5-8 hours depending on vehicle size)</p>
                </div>
                <div className="detail--services--description">
                  <ul>
                    <li className="underline">Full Detail+</li>
                    <li>Used to protect your investment</li>
                    <li>Clay bar to remove embedded surface contamination</li>
                    <li>Compound/Polish creme is applied by machine to remove heavy oxidation and scratches</li>
                    <li>Paint sealant is applied for long lasting protection</li>
                  </ul>
                  <button className="detail--services--btn btn"><a href="tel://2406261777">Book Now</a></button>
                </div>
  
              </section>
              <section className="slide--5--detailing--service desktop--float--services">
                
                <div id="full--detail--home" className="slide--5--image">
                  <p>Full Detail<br/>Starting at<br/>$125<br/>(4-6 hours depending on vehicle size)</p>
                </div>
                <div className="detail--services--description">
                  <ul>
                    <li className="underline">Exterior Detail+</li>
                    <li className="underline">Interior Detail+</li>
                    <li>Restore your vehicles appearance inside and out</li>
                    <li>Getting ready to sell your vehicle, this will raise the value</li>
                    <li>Full exhaust polish</li>
                  </ul>
                  <button className="detail--services--btn btn"><a href="tel://2406261777">Book Now</a></button>
                </div>
  
              </section>
              <section className="slide--5--detailing--service desktop--float--services">
                
                <div id="interior--detail--home" className="slide--5--image">
                  <p>Interior Detail<br/>Starting at<br/>$85<br/>(3-4 hours depending on vehicle size)</p>
                </div>
                <div className="detail--services--description">
                  <ul>
                    <li>Remove foods, debris, dirt,<br/> crumbs, stains, etc.</li>
                    <li>Thorough vacuum cleaning</li>
                    <li>Full interior shampoo, steam clean followed by conditioning</li>
                    <li>Headliner cleaned to remove all stains</li>
                    <li>All panels steam cleaned and dressed</li>
                    <li>Interior windows cleaned</li>
                    <li>Light door jamb wipe down</li>
                  </ul>
                  <button className="detail--services--btn btn"><a href="tel://2406261777">Book Now</a></button>
                </div>
  
              </section>
              <section className="slide--5--detailing--service desktop--float--services">
                
                <div id="the--blitz--home" className="slide--5--image">
                  <p>The Blitz<br/>Starting at<br/>$75<br/>(2-3 hours depending on vehicle size)</p>
                </div>
                <div className="detail--services--description">
                  <ul>
                    <li className="underline">Basic Wash+</li>
                    <li>Interior Vacuumed</li>
                    <li>All panels and plastics wiped down</li>
                    <li>Interior and exterior windows cleaned</li>
                  </ul>
                  <button className="detail--services--btn btn"><a href="tel://2406261777">Book Now</a></button>
                </div>
  
              </section>
              <section className="slide--5--detailing--service desktop--float--services">
                
                <div id="exterior--detail--home" className="slide--5--image">
                  <p>Exterior Detail<br/>Starting at<br/>$55<br/>(2-4 hours depending on vehicle size)</p>
                </div>
                <div className="detail--services--description">
                  <ul>
                    <li className="underline">Basic Wash+</li>
                    <li>Fender wells cleaned</li>
                    <li>Door jambs cleaned</li>
                    <li>Thick carnauba wax applied and removed by hand</li>
                  </ul>
                  <button className="detail--services--btn btn"><a href="tel://2406261777">Book Now</a></button>
                </div>
  
              </section>
              <section className="slide--5--detailing--service desktop--float--services">
                
                <div id="basic--wash--home" className="slide--5--image">
                  <p>Basic Wash<br/>Starting at<br/>$30<br/>(1-2 hours depending on vehicle size)</p>
                </div>
                <div className="detail--services--description">
                  <ul>
                    <li>Wheel cleaning, bug and tar removal</li>
                    <li>Hand washed chamois exterior</li>
                    <li>Exterior windows cleaned</li>
                    <li>Tires shined</li>
                  </ul>
                  <button className="detail--services--btn btn"><a href="tel://2406261777">Book Now</a></button>
                </div>
  
              </section>
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