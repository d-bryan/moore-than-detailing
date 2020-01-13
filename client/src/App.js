import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

// import context and private route components
import withContext from './Context';
import PrivateRoute from './PrivateRoute';
// import components
import Footer from './components/footer/Footer';
import HomePage from './components/user-pages/HomePage';
import AboutPage from './components/user-pages/AboutPage';
import Services from './components/user-pages/Services';
import Gallery from './components/user-pages/Gallery';
import GalleryImagesFull from './components/user-pages/gallery-pages/GalleryImagesFull'


// set up context components
const FooterWithContext = withContext(Footer);
const HomePageWithContext = withContext(HomePage);
const AboutPageWithContext = withContext(AboutPage);
const ServicesWithContext = withContext(Services);
const GalleryWithContext = withContext(Gallery);
const GalleryImagesFullWithContext = withContext(GalleryImagesFull);

export default () => (
  <Router>
    <div className="page-wrap bounds">

    <Switch>
      <Route path="/gallery/:type" component={GalleryImagesFullWithContext} />
      <Route path="/gallery" component={GalleryWithContext} />
      <Route path="/services" component={ServicesWithContext} />
      <Route path="/about-us" component={AboutPageWithContext} />
      <Route path="/" component={HomePageWithContext} />
      {/* // dashboard
      <PrivateRoute path="/admin-dashboard" component={} />
      // admin routes
      <PrivateRoute path="/admin/create" component={} />
      <PrivateRoute path="/admin/:id/delete" component={} />
      <PrivateRoute path="/admin-table" component={} />
      // packages routes
      <PrivateRoute path="/admin-packages/create" component={} />
      <PrivateRoute path="/admin-packages/:id/update" component={} />
      <PrivateRoute path="/admin-packages/:id/delete" component={} />
      <PrivateRoute path="/admin-packages" component={} />
      // pricing routes
      <PrivateRoute path="/admin-pricing/create" component={} />
      <PrivateRoute path="/admin-pricing/:id/update" component={} />
      <PrivateRoute path="/admin-pricing/:id/delete" component={} />
      <PrivateRoute path="/admin-pricing" component={} />
      // reviews routes
      <PrivateRoute path="/admin-reviews/create" component={} />
      <PrivateRoute path="/admin-reviews/:id/update" component={} />
      <PrivateRoute path="/admin-reviews/:id/delete" component={} />
      <PrivateRoute path="/admin-reviews" component={} />
      // services routes
      <PrivateRoute path="/admin-services/create" component={} />
      <PrivateRoute path="/admin-services/:id/update" component={} />
      <PrivateRoute path="/admin-services/:id/delete" component={} />
      <PrivateRoute path="/admin-services" component={} />
      // public routes
      <Route path="/admin-login" component={} />
      <Route path="/about-us" component={} />
      <Route path="/services" component={} />
      <Route path="/appointments" component={} />
      <Route path="/gallery" component={} />
      <Route path="/gallery/:id" component={} /> */}
    </Switch>




    </div>
    <FooterWithContext />
    

    {/* <Switch>
      <Route path="/" component={} />
      // dashboard
      <PrivateRoute path="/admin-dashboard" component={} />
      // admin routes
      <PrivateRoute path="/admin/create" component={} />
      <PrivateRoute path="/admin/:id/delete" component={} />
      <PrivateRoute path="/admin-table" component={} />
      // packages routes
      <PrivateRoute path="/admin-packages/create" component={} />
      <PrivateRoute path="/admin-packages/:id/update" component={} />
      <PrivateRoute path="/admin-packages/:id/delete" component={} />
      <PrivateRoute path="/admin-packages" component={} />
      // pricing routes
      <PrivateRoute path="/admin-pricing/create" component={} />
      <PrivateRoute path="/admin-pricing/:id/update" component={} />
      <PrivateRoute path="/admin-pricing/:id/delete" component={} />
      <PrivateRoute path="/admin-pricing" component={} />
      // reviews routes
      <PrivateRoute path="/admin-reviews/create" component={} />
      <PrivateRoute path="/admin-reviews/:id/update" component={} />
      <PrivateRoute path="/admin-reviews/:id/delete" component={} />
      <PrivateRoute path="/admin-reviews" component={} />
      // services routes
      <PrivateRoute path="/admin-services/create" component={} />
      <PrivateRoute path="/admin-services/:id/update" component={} />
      <PrivateRoute path="/admin-services/:id/delete" component={} />
      <PrivateRoute path="/admin-services" component={} />
      // public routes
      <Route path="/admin-login" component={} />
      <Route path="/about-us" component={} />
      <Route path="/services" component={} />
      <Route path="/appointments" component={} />
      <Route path="/gallery" component={} />
      <Route path="/gallery/:id" component={} />
    </Switch> */}

  </Router>
);






















// add context to components
// import logo from './logo.svg';
// import './styles/App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
