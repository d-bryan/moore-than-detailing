import React from 'react';

const BackgroundImageDescription = (props) => {
  return (
    <p>{props.title}<br/>Starting at<br/>$250<br/>{props.estimatedTime}</p>
  );
};

export default BackgroundImageDescription;

// Source DetailingServices.js