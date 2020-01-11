import React from 'react';

// import components
import SectionComponent from './SectionComponent';

export default class SectionContainer extends React.PureComponent {
  
  render() {
    const descriptionArray = this.props.description;
    const estimatedTimeArray = this.props.estimatedTime;
    const titleArray = this.props.title;
    const priceArray = [250,125,85,75,55,30];
    const idArray = [
      "full--detail--plus--home",
      "full--detail--home",
      "interior--detail--home",
      "the--blitz--home",
      "exterior--detail--home",
      "basic--wash--home"
    ];
    
    var dataObj = {
      id: idArray,
      title: titleArray,
      startingPrice: priceArray,
      estimatedTime: estimatedTimeArray,
      description: descriptionArray,
    };
    
    return (
      <>
        <>
          <SectionComponent 
            id={dataObj.id[0]}
            title={dataObj.title[0]}
            startingPrice={dataObj.startingPrice[0]}
            estimatedTime={dataObj.estimatedTime[0]}
            description={dataObj.description[0]}
          />
        </>
        <>
          <SectionComponent 
            id={dataObj.id[1]}
            title={dataObj.title[1]}
            startingPrice={dataObj.startingPrice[1]}
            estimatedTime={dataObj.estimatedTime[1]}
            description={dataObj.description[1]}
          />
        </>
        <>
          <SectionComponent 
            id={dataObj.id[2]}
            title={dataObj.title[2]}
            startingPrice={dataObj.startingPrice[2]}
            estimatedTime={dataObj.estimatedTime[2]}
            description={dataObj.description[2]}
          />
        </>
        <>
          <SectionComponent 
            id={dataObj.id[3]}
            title={dataObj.title[3]}
            startingPrice={dataObj.startingPrice[3]}
            estimatedTime={dataObj.estimatedTime[3]}
            description={dataObj.description[3]}
          />
        </>
        <>
          <SectionComponent 
            id={dataObj.id[4]}
            title={dataObj.title[4]}
            startingPrice={dataObj.startingPrice[4]}
            estimatedTime={dataObj.estimatedTime[4]}
            description={dataObj.description[4]}
          />
        </>
        <>
          <SectionComponent 
            id={dataObj.id[5]}
            title={dataObj.title[5]}
            startingPrice={dataObj.startingPrice[5]}
            estimatedTime={dataObj.estimatedTime[5]}
            description={dataObj.description[5]}
          />
        </>
      </>
    );
  }

};

// Source DeatilingServices;
