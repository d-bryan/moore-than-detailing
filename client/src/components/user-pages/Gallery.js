import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import config from '../../api-config';

// import components
import SignUpForm from './SignUpForm';
import NavUser from '../navigation/NavUser';
import GalleryModal from './gallery-pages/GalleryModal';
import GalleryImage from './gallery-pages/GalleryImage';

export default class Gallery extends React.PureComponent {

  state = {
    coupeImage: '',
    fourDoorImage: '',
    suvImage: '',
    largeImage: '',
  }

  async componentDidMount() {
    const context = this.props.context;
    await context.actions.generateImageList()
      .then(data => {
        var coupeImage;
        var fourDoorImage;
        var suvImage;
        var largeImage;

        /**
         * Filters the object to prevent multiple API calls
         * @param {vehicleType} searchValue - Type of vehicle that images are stored as
         */
        function filterData (searchValue) {
          let image = data.filter(d => d.vehicleType === searchValue);
          image = image[0].imageLocation;

          return image;
        }

        // filter the data for each type of vehicle based on different links
        coupeImage = filterData('coupe');
        fourDoorImage = filterData('four-door');
        suvImage = filterData('suv');
        largeImage = filterData('large');
        
        // set the state for the url to the image links
        this.setState({
          coupeImage: config.uploads + coupeImage,
          fourDoorImage: config.uploads + fourDoorImage,
          suvImage: config.uploads + suvImage,
          largeImage: config.uploads + largeImage,
        });

      })
      .catch(err => {
        console.log(`There was an error fetching the images for the links: ${err}`);
        this.props.history.push('/error-500');
      });
  }


  render() {

    const { context } = this.props;

    return (
      <>

        <Helmet>
          <title>Gallery | View Our Results</title>
          <meta name="description" content="Images of vehicles that we have detailed, browse through to see the results we can deliver to you."/>
          <meta property="og:title" content="Gallery | View Our Results"/>
          <meta property="og:description" content="Images of vehicles that we have detailed, browse through to see the results we can deliver to you."/>
          <meta property="og:type" content="website"/>
          <meta property="og:url" content="https://www.moorethandetailing.com/gallery"/>
          <meta property="og:image" content={this.state.coupeImage}/>
          <meta name="keywords" content="Moore Than Detailing, Gallery, Detailing Images, Before and After"/>
        </Helmet>

        <>
          <NavUser />
        </>


        <div className="gallery--modal">
          <h1>GALLERY</h1>

          <>
            <GalleryModal 
              context={context}
            />
          </>
        </div>

        <div className="gallery--link--container">

          <section id="coupe--gallery--link" className="gallery--flex--container">
            <h3>Coupe</h3>
            <Link 
              to={{
                pathname: "/gallery/coupe",
                state: { vehicleType: "coupe" }
              }}
            ><GalleryImage 
              name={"gallery--link--image"}
              src={this.state.coupeImage}
              alt={"Coupe vehicle"}
            /></Link>
          </section>

          <section id="four-door--gallery--link" className="gallery--flex--container">
            <h3>Four Door</h3>
            <Link 
              to={{
                pathname: "/gallery/four-door",
                state: { vehicleType: "four-door" }
              }}
            ><GalleryImage 
              name={"gallery--link--image"}
              src={this.state.fourDoorImage}
              alt={"Four Door vehicle"}
            /></Link>
          </section>
          
          <section id="suv--gallery--link" className="gallery--flex--container">
            <h3>SUV</h3>
            <Link 
              to={{
                pathname: "/gallery/suv",
                state: { vehicleType: "suv" }
              }}
            ><GalleryImage 
              name={"gallery--link--image"}
              src={this.state.suvImage}
              alt={"SUV vehicle"}
            /></Link>
          </section>
          
          <section id="mini--van--gallery--link" className="gallery--flex--container">
            <h3>Mini Van & Truck</h3>
            <Link 
              to={{
                pathname: "/gallery/large",
                state: { vehicleType: "large" }
              }}
            ><GalleryImage 
              name={"gallery--link--image"}
              src={this.state.largeImage}
              alt={"Large vehicle"}
            /></Link>
          </section>
        </div>

        <>
          <SignUpForm />
        </>

      </>
    );
  }
};