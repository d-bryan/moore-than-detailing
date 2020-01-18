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

  async componentDidMount() {
    await this.checkForType();
  }

  async checkForType() {
    const context = this.props.context;
    const locationPath = this.props.location.pathname;

    // if the location state from the link is coupe
    if (locationPath === '/gallery/coupe') {
      // request the list of images from the database
      await context.actions.generateImageList()
        .then(data => {
          // filter out for coupe vehicles and set the image state to this
          let coupeData = data.filter(d => d.vehicleType === "coupe");
          this.setState({
            images: coupeData
          });
        });
      // set state for use in react helmet
      this.setState({
        type: 'coupe',
        keywords: ['coupe images', 'gallery images', 'moore than detailing gallery'],
      });
      // if the location state from the link is four-door
    } else if (locationPath === '/gallery/four-door') {
      // request the list of images from the database
      await context.actions.generateImageList()
        .then(data => {
          // filter out for four-door vehicles and set the image state to this
          let fourDoorData = data.filter(d => d.vehicleType === "four-door");
          this.setState({
            images: fourDoorData
          });
        });
        // set state for use in react helmet
      this.setState({
        type: 'four-door',
        keywords: ['four door images', 'gallery images', 'moore than detailing gallery'],
      });
      // if the location state from the link is suv
    } else if (locationPath === '/gallery/suv') {
      // request the list of images from the database
      await context.actions.generateImageList()
        .then(data => {
          // filter out for suv vehicles and set the image state to this
          let suvData = data.filter(d => d.vehicleType === "suv");
          this.setState({
            images: suvData
          });
        });
      // set state for use in react helmet
      this.setState({
        type: 'suv',
        keywords: ['suv images', 'gallery images', 'moore than detailing gallery'],
      });
      // if the location state from the link is four-door
    } else if (locationPath === '/gallery/large') {
      // request the list of images from the database
      await context.actions.generateImageList()
        .then(data => {
          // filter out for large vehicles and set the image state to this
          let largeData = data.filter(d => d.vehicleType === "large");
          this.setState({
            images: largeData
          });
        });
        // set state for use in react helmet
      this.setState({
        type: 'large-vehicle',
        keywords: ['large vehicle images', 'gallery images', 'moore than detailing gallery'],
      });

    } else {
      console.error("There was an error when attempting to set the state for the type of gallery image.");
      this.props.history.push('/not-found');
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

        <div className="image--container">
          <h2>{metaTitle}</h2>
          <section className="desktop--flex--images">
            <>        
              { mapImages }
            </>
          </section>
        </div>

        <>
        <SignUpForm />
        </>
      </>
    );
  }
}

// Source App.js