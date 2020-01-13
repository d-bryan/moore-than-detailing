import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

// import images
// import leftArrowAlt from '../../website-mockups-assets/left-arrow-alt.png';
// import modalImage1 from '../../website-mockups-assets/interior-detail.png';
// import rightArrowAlt from '../../website-mockups-assets/right-arrow-alt.png';
// import elipses from '../../website-mockups-assets/modal-elipses.png';
import coupeLink from '../../website-mockups-assets/full-detail-plus.png';


// import components
import SignUpForm from './SignUpForm';
import NavUser from '../navigation/NavUser';
import GalleryModal from './gallery-pages/GalleryModal';

export default class Gallery extends React.PureComponent {

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
          <meta property="og:image" content="../../website-mockups-assets/steven-about-profile.png"/>
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
          <br/>
          {/* <img className="gallery--modal--elipses" src={elipses} alt="circle"/>
          <img className="gallery--modal--elipses" src={elipses} alt="circle"/>
          <img className="gallery--modal--elipses" src={elipses} alt="circle"/>
          <img className="gallery--modal--elipses" src={elipses} alt="circle"/>
          <img className="gallery--modal--elipses" src={elipses} alt="circle"/>
          <img className="gallery--modal--elipses" src={elipses} alt="circle"/>
          <img className="gallery--modal--elipses" src={elipses} alt="circle"/> */}
        </div>

        <div className="gallery--link--container">

          <section id="coupe--gallery--link" className="gallery--flex--container">
            <h3>Coupe</h3>
            <Link 
              to={{
                pathname: "/gallery/coupe",
                state: { vehicleType: "coupe" }
              }}
            ><img src={coupeLink} alt="coupe after being detailed"/>
            </Link>
          </section>

          <section id="four-door--gallery--link" className="gallery--flex--container">
            <h3>Four Door</h3>
            <Link 
              to={{
                pathname: "/gallery/four-door",
                state: { vehicleType: "four-door" }
              }}
            ><img src={coupeLink} alt="four door car after being detailed"/>
            </Link>
          </section>
          
          <section id="suv--gallery--link" className="gallery--flex--container">
            <h3>SUV</h3>
            <Link 
              to={{
                pathname: "/gallery/suv",
                state: { vehicleType: "suv" }
              }}
            ><img src={coupeLink} alt="suv after being detailed"/>
            </Link>
          </section>
          
          <section id="mini--van--gallery--link" className="gallery--flex--container">
            <h3>Mini Van & Truck</h3>
            <Link 
              to={{
                pathname: "/gallery/large",
                state: { vehicleType: "large" }
              }}
            ><img src={coupeLink} alt="mini van after being detailed"/>
            </Link>
          </section>
        </div>

        <>
          <SignUpForm />
        </>

      </>
    );
  }
};