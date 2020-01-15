import React from 'react';

// component imports
import GalleryImage from './GalleryImage';

const GalleryImagesContainer = (props) => {
  
  return (
    <>
      <GalleryImage
        src={props.src}
        alt={props.alt}
        name={props.name}
      />
    </>
  );
};

export default GalleryImagesContainer;

// Source GalleryImageFull.js