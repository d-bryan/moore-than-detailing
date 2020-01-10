import React from 'react';

const BackgroundImageDescription = (props) => {
  return (
    <div id={props.id} className="slide--5--image">
      <p>{props.title}<br/>Starting at<br/>${props.startingPrice}<br/>{props.estimatedTime}</p>
    </div>
  );
};

export default BackgroundImageDescription;

// Source SectionComponent.js