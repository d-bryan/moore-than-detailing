import React from 'react';

const GalleryImage = (props) => {
  return (
    <>
      <img className={props.name} src={props.src} alt={props.alt} />
    </>
  );
};

export default GalleryImage;

// Source GalleryImageContainer.js, Gallery.js