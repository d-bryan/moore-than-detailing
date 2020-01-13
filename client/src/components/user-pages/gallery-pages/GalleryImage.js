import React from 'react';

const GalleryImage = (props) => {
  return (
    <>
      <img className={"gallery--image--full"} src={props.src} alt={props.alt} />
    </>
  );
};

export default GalleryImage;

// Source GalleryImageContainer.js