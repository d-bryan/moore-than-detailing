import React from 'react'

// import components
import TableBody from './TableBody';
import TableHeader from './TableHeader';

const PriceListTable = (props) => {
  var mapPricingContainer;
  var mapPackageData;
  console.log(props.packageData);

  if (props.data) {
   mapPricingContainer = props.data.map(d => {
    return(
      <TableBody
        key={d.id}
        vehicleSize={d.vehicleSize}
        fullDetailPlus={d.fullDetailPlus}
        fullDetail={d.fullDetail}
        interiorDetail={d.interiorDetail}
        theBlitz={d.theBlitz}
        exteriorDetail={d.exteriorDetail}
        basicWash={d.basicWash}
      />
    )
    });
  }

  if (props.packageData) {
    mapPackageData = props.packageData.map(d => {
      return (
        <TableHeader 
          key={d.id}
          title={d.title}
        />
      );
    });
  }

  return (
    <section className="price--list--container">
      <h2>DETAILED PRICING</h2>
      <p>(prices subject to change depending on your vehicle)</p>
      
      <table className="full--price--list">
      <thead>
        <tr>
          <th>Vehicle Size</th>
          <>
            { mapPackageData }
          </>
        </tr>
      </thead>
        <tbody>
          <>
            {mapPricingContainer}
          </>

        </tbody>
      </table>

    </section>      
  );
}

export default PriceListTable;

// Source DetailingServices.js