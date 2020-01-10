import React from 'react';

// image imports
import StevenAboutProfile from '../../website-mockups-assets/steven-about-profile.png';
import MeagenAboutProfile from '../../website-mockups-assets/meagen-about-profile.png';

export default class AboutPage extends React.PureComponent {

  render () {
    return (
      <>
        <div className="about--container">
          <section className="steven--profile--container">
            <img id="steven--about--profile" src={StevenAboutProfile} alt="Steven Moore profile picture"/>
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
            <img id="meagen--about--profile" src={MeagenAboutProfile} alt="Meagen Moore profile picture"/>
            <h3>Meagen Moore</h3>
            <p>Where Steven is the go-to car guy, his significant other is the one behind the scenes.
              Whether it's scheduling appointments or communicating with customers, Meagen supports Steven at home and at the office. Between managing the office and being the assistant detailer, Meagen loves being a part of the Moore Than Detailing family.
            </p>
          </section>
        </div>
      </>
    );
  }
}