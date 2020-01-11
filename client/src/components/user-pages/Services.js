import React from 'react';
import { Helmet } from 'react-helmet';

// component imports
import NavUser from '../navigation/NavUser';
import DetailingServices from './DetailingServices';
import AdditionalServices from './services-pages/AdditionalServices';
import SignUpForm from './SignUpForm';

export default class Services extends React.PureComponent {

  render() {

      const { context } = this.props;

    return (
      <>
        <Helmet>
          <title>Services | Additional Services</title>
          <meta name="description" content="Automotive detailing dervices offerred at Moore Than Detailing, paintless dent repair, waxing services, shampooing and more."/>
          <meta property="og:title" content="Services | Additional Services"/>
          <meta property="og:description" content="Automotive detailing dervices offerred at Moore Than Detailing, paintless dent repair, waxing services, shampooing and more."/>
          <meta property="og:type" content="website"/>
          <meta property="og:url" content="https://www.moorethandetailing.com/services"/>
          <meta property="og:image" content="../../website-mockups-assets/steven-about-profile.png"/>
          <meta name="keywords" content="Moore Than Detailing, About Us, Steven Moore, Meagen Moore"/>
        </Helmet>

        <>
          <NavUser />
        </>

        <>
          <DetailingServices 
            context={context}
          />
        </>

        <>
          <AdditionalServices 
            context={context}
          />
        </>
        
        <>
          <SignUpForm />
        </>
      </>
    );
  }

}

// Source App.js