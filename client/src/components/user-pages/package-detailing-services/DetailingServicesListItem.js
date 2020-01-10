import React from 'react';

import ReactMarkdown from 'react-markdown';

// detailing list item
const DetailingServicesListItem = (props) => {
  return (
    <ReactMarkdown
      source={props.description}
      escapeHtml={false}
    />
  );
};

export default DetailingServicesListItem;

// Source DetailingServicesDescription.js