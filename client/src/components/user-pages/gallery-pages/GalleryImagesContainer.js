import React from 'react';

// component imports
import GalleryImage from './GalleryImage';

const GalleryImagesContainer = (props) => {
  
  return (
    <>
      <GalleryImage
        src={props.src}
        alt={props.alt}
      />
    </>
  );
};

export default GalleryImagesContainer;

// Source GalleryImageFull.js