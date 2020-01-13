import React from 'react';

const GalleryModalImage = (props) => {

  return (
    <>
      <img 
        id="gallery--modal--image"
        src={props.src}
        alt="mercedes benz after cleaned"
      />
    </>
  );
};

export default GalleryModalImage;