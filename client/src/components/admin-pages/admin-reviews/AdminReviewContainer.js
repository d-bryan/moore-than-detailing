import React from 'react';

// import components
import AdminReviewTableItem from './AdminReviewTableItem';

export default (props) => {
  return(
    <tr>
      <AdminReviewTableItem 
          currentAdmin={props.currentAdmin}
          id={props.id}
          adminId={props.adminId}
          customerFirstName={props.customerFirstName}
          customerLastName={props.customerLastName}
          customerReview={props.customerReview}
          customerRating={props.customerRating}        
      />
    </tr>
  );
};

// Source AdminReviewsTable.js
