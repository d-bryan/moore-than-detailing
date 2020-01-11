import React from 'react';
import { Helmet } from 'react-helmet';

// image imports
import StevenAboutProfile from '../../website-mockups-assets/steven-about-profile.png';
import MeagenAboutProfile from '../../website-mockups-assets/meagen-about-profile.png';
// component imports
import SignUpForm from './SignUpForm';
import NavUser from '../navigation/NavUser';

export default class AboutPage extends React.PureComponent {

  render () {
    return (
      <>
        <Helmet>
          <title>About Us | Moore Than Detailing</title>
          <meta name="description" content="Steven has been in the automotive industry for over fifteen years, and Meagen helps out behind the scenes with scheduling, speaking to customers and more."/>
          <meta property="og:title" content="About Us | Learn About the Team"/>
          <meta property="og:description" content="Steven has been in the automotive industry for over fifteen years, and Meagen helps out behind the scenes with scheduling, speaking to customers and more."/>
          <meta property="og:type" content="website"/>
          <meta property="og:url" content="https://www.moorethandetailing.com/about-us"/>
          <meta property="og:image" content="../../website-mockups-assets/steven-about-profile.png"/>
          <meta name="keywords" content="Moore Than Detailing, About Us, Steven Moore, Meagen Moore"/>
        </Helmet>

        <>
          <NavUser />
        </>

        <div className="about--container">
          <section className="steven--profile--container">
            <img id="steven--about--profile" src={StevenAboutProfile} alt="Steven Moore profile"/>
            <h3>Steven Moore</h3>
            <p>With over 15 years of automotive detailing experience
              in Frederick Maryland. His interest in cars has always
              been a passion. Beginning at a young age with his
              father's passion for cars, and heavily influenced to
              enter the industry. His love for fast cars, loud exhaust
              and driving in a clean car on a sunny day encouraged
              the dream. Steven began working as a mechanic
              during high school and into college. Providing
              exceptional detailing service to customers and their
              vehicles became passion, and soon to be history.</p>
          </section>
          <section className="meagen--profile--container">
            <img id="meagen--about--profile" src={MeagenAboutProfile} alt="Meagen Moore profile"/>
            <h3>Meagen Moore</h3>
            <p>Where Steven is the go-to car guy, his significant other is the one behind the scenes.
              Whether it's scheduling appointments or communicating with customers, Meagen supports Steven at home and at the office. Between managing the office and being the assistant detailer, Meagen loves being a part of the Moore Than Detailing family.
            </p>
          </section>
        </div>
        <>
          <SignUpForm />
        </>
      </>
    );
  }
}