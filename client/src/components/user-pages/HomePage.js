import React from 'react';
import { 
  Link,
  NavLink
} from 'react-router-dom';
// component imports
import SignUpForm from './SignUpForm';
import DetailingServices from './DetailingServices';
import CustomerReviews from './CustomerReviews';

// image imports
import HeaderLogo from '../../website-mockups-assets/logo-grey-text.png';
import Jumbotron from '../../website-mockups-assets/jumbotron-homepage.png';
import Slide2BG from '../../website-mockups-assets/slide-2-home-bg.png';
import Slide3BG from '../../website-mockups-assets/slide-3-home-bg.png';
import StevenPortrait from '../../website-mockups-assets/steven-portrait.png';
import Slide6BG from '../../website-mockups-assets/cleaning-bg-home-page.png';
import Slide6Image from '../../website-mockups-assets/truck-home-page.png';


export default class HomePage extends React.PureComponent {

  render() {

    const { context } = this.props;


    return (
      <>
        {/* // slide 1 home page */}
        <>
        <div className="jumbotron--container">
          <img id="header--logo" src={HeaderLogo} alt="Moore Than Detailing Logo"/>
          <nav className="jumbotron--nav">
            <ul>
              <li><NavLink to="/">HOME</NavLink></li>
              <li><NavLink to="/about-us">ABOUT US</NavLink></li>
              <li><NavLink to="/services">SERVICES</NavLink></li>
              <li><NavLink to="/appointments">APPOINTMENTS</NavLink></li>
              <li><NavLink to="/gallery">GALLERY</NavLink></li>
            </ul>
          </nav>
          <p className="jumbotron--description">
            <span>Cars, Trucks, SUV's and More...</span>
            <br/>
            <span id="washed-waxed">WASHED <br/>& WAXED</span>
            <br/>
            <span>The leaders in automotive detailing of <br/> Frederick, MD for the past ten years</span>
          </p>
          <button className="jumbotron--button btn"><a href="tel://2406261777">Schedule Now</a></button>
          <img className="jumbotron" src={Jumbotron} alt="jeep parked in the desert"/>
        </div>
        </>

        {/* // slide 2 home page */}
        <>
        <div className="slide--2--container bounds">
          <img id="slide--2--image" src={Slide2BG} alt="car being detailed"/>
          <p className="slide--2--description">COMPLETED BY <br/>HAND WITH CARE</p>
          <p className="slide--2--description">Each vehicle that comes into our shop we wash with our own hands to ensure that you get the longest lifetime value out of your automobile.
          </p>
        </div>
        </>

        {/* // slide 3 home page */}
        <>
        <div className="slide--3--container bounds">
          <img id="slide--3--bg" src={Slide3BG} alt="Porche being detailed"/>
          <img id="steven--portrait--home" src={StevenPortrait} alt="Steven Moore"/>
          <p className="slide--3--description">
            <span>MEET STEVEN</span>
            <br/>
            <br/>
            <span>Steven began working as a mechanic during highschool and into college. Providing exceptional detailing service to customers and their vehicles became passion, and soon to be history.</span>
          </p>
          <button className="slide--3--button btn"><a href="./about.html">Read More</a></button>
        </div>
        </>

        {/* // slide 4 home page */}
        <>
          <CustomerReviews 
            context={context}
          />
        </>

        {/* // slide 5 home page */}
        <>
          <DetailingServices 
            context={context}
          />
        </>

        {/* // slide 6 home page */}
        <>
        <div className="slide--6--container bounds">
        <img id="slide--6--bg--image" src={Slide6BG} alt="car being detailed by hand"/>
        <img id="slide--6--image" src={Slide6Image} alt="Truck that has been detailed"/>
        <p id="slide--6--description--left">CERAMIC PRO<br/> COATING</p >
        <p id="slide--6--description--right">Ceramic coatings provide overall protection and leave a deep, glossy finish for years to come.
          The 9H hardness of the coating is self cleaning and gives your clear coat an extra layer of protection from harmful environments.
        </p>
        <button className="slide--6--btn btn"><a href="./services.html">Read More</a></button>
        </div>
        </>

        {/* //slide 7 home page */}
        <>
          <SignUpForm />
        </>
      </>
    );
  }

};

// Source App.js