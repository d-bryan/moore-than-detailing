import React, { Component } from 'react';

// import components
import BackgroundImageDescription from './BackgroundImageDescription';
import DetailingServicesDescription from './DetailingServicesDescription';

export default class SectionComponent extends Component {

  state = {

  }

  componentDidMount() {

  
  }

  // "full--detail--plus--home" sectionID

  render() {
    return (
      <section className="slide--5--detailing--service desktop--float--services">
              
        <div id={props.sectionID} className="slide--5--image">
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
    );
  }
}

// Source DetailingServices.js