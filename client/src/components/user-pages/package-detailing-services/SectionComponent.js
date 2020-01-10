import React from 'react';

// import components
import BackgroundImageDescription from './BackgroundImageDescription';
import DetailingServicesDescription from './DetailingServicesDescription';

const SectionComponent = (props) => {

  return (
    <section className="slide--5--detailing--service desktop--float--services">

      <BackgroundImageDescription 
        id={props.id}
        title={props.title}
        startingPrice={props.startingPrice}
        estimatedTime={props.estimatedTime}
      />
      <div className="detail--services--description">

        <DetailingServicesDescription 
          description={props.description}
        />

        <button className="detail--services--btn btn"><a href="tel://2406261777">Book Now</a></button>
      </div>

    </section>
  );
};

export default SectionComponent;

// Source SectionContainer.js