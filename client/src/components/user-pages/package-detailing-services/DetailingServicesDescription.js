import React from 'react';

import DetailingServicesListItem from './DetailingServicesListItem';

const DetailingServicesDescription = (props) => {

  return (
    <ul>
      <DetailingServicesListItem 
        description={props.description}
      />
    </ul>
  );
};

export default DetailingServicesDescription;

// Source SectionComponent.js