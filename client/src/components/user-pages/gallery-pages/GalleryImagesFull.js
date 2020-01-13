import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import config from '../../../api-config';

// import components
import NavUser from '../../navigation/NavUser';
import SignUpForm from '../SignUpForm';
import GalleryImagesContainer from './GalleryImagesContainer';

export default class GalleryImagesFull extends Component {

  state = {
    images: [],
    type: '',
    keywords: [],
  }

  componentDidMount() {
    this.checkForType();
  }

  async checkForType() {
    const context = this.props.context;
    const locationState = this.props.location.state.vehicleType;

    if (locationState === 'coupe') {

      await context.actions.generateImageList()
        .then(data => {
          let coupeData = data.filter(d => d.vehicleType === "coupe");
          this.setState({
            images: coupeData
          });
        });

      this.setState({
        type: 'coupe',
        keywords: ['coupe images', 'gallery images', 'moore than detailing gallery'],
      });

    } else if (locationState === 'four-door') {

      await context.actions.generateImageList()
        .then(data => {
          let fourDoorData = data.filter(d => d.vehicleType === "four-door");
          this.setState({
            images: fourDoorData
          });
        });

      this.setState({
        type: 'four-door',
        keywords: ['four door images', 'gallery images', 'moore than detailing gallery'],
      });

    } else if (locationState === 'suv') {

      await context.actions.generateImageList()
        .then(data => {
          let suvData = data.filter(d => d.vehicleType === "suv");
          this.setState({
            images: suvData
          });
        });
      
      this.setState({
        type: 'suv',
        keywords: ['suv images', 'gallery images', 'moore than detailing gallery'],
      });

    } else if (locationState === 'large') {

      await context.actions.generateImageList()
        .then(data => {
          let largeData = data.filter(d => d.vehicleType === "large");
          this.setState({
            images: largeData
          });
        });

      this.setState({
        type: 'large-vehicle',
        keywords: ['large vehicle images', 'gallery images', 'moore than detailing gallery'],
      });

    } else {
      console.error("There was an error when attempting to set the state for the type of gallery image.");
    }
  }

  render() {
    const firstChar = this.state.type.charAt(0).toUpperCase();
    const remaining = this.state.type.slice(1, this.state.type.length);
    const metaTitle = `${firstChar}${remaining} Images`;
    const locationPath = this.props.location.pathname;
    const keywords = this.state.keywords;
    var mapImages = this.state.images.map(d => {
      return(
        <GalleryImagesContainer 
          key={d.id}
          src={config.uploads + d.imageLocation}
          alt={d.vehicleType}
        />
      );
    });

    return(
      <>

        <Helmet>
          <title>{metaTitle} | Moore Than Detailing</title>
          <meta name="description" content={`Gallery images featuring ${metaTitle}, please take a look at our results.`} />
          <meta property="og:title" content={`${metaTitle} | Moore Than Detailing`} />
          <meta property="og:description" content={`Gallery images featuring ${metaTitle}, please take a look at our results.`} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`https://www.moorethandetailing.com${locationPath}`} />
          <meta property="og:image" content="../../website-mockups-assets/logo-grey-text.png" />
          <meta name="keywords" content={keywords} />
        </Helmet>

        <>
        <NavUser />
        </>

        <div className="gallery--image--container--full">
          <h1>{metaTitle}</h1>
          <>        
          { mapImages }
          </>
        </div>

        <>
        <SignUpForm />
        </>
      </>
    );
  }
}

// Source App.js