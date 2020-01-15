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
// user pages
import HomePage from './components/user-pages/HomePage';
import AboutPage from './components/user-pages/AboutPage';
import Services from './components/user-pages/Services';
import Gallery from './components/user-pages/Gallery';
import GalleryImagesFull from './components/user-pages/gallery-pages/GalleryImagesFull';
// authentication components
import SignIn from './components/authentication/SignIn';
import SignOut from './components/authentication/SignOut';
// error components
import Forbidden from './components/error-pages/Forbidden';
import LoginRequired from './components/error-pages/LoginRequired'
import NotFound from './components/error-pages/NotFound';
import ServerError from './components/error-pages/ServerError';
// admin pages
import AdminDashboard from './components/admin-pages/AdminDashboard';
import AdminTable from './components/admin-pages/AdminTable';
import CreateAdmin from './components/admin-pages/admins-table/CreateAdmin';
import DeleteItem from './components/admin-pages/DeleteItem';



// set up context components
const FooterWithContext = withContext(Footer);
const HomePageWithContext = withContext(HomePage);
const AboutPageWithContext = withContext(AboutPage);
const ServicesWithContext = withContext(Services);
const GalleryWithContext = withContext(Gallery);
const GalleryImagesFullWithContext = withContext(GalleryImagesFull);
const SignInWithContext = withContext(SignIn);
const SignOutWithContext = withContext(SignOut);
const AdminDashboardWithContext = withContext(AdminDashboard);
const AdminTableWithContext = withContext(AdminTable);
const DeleteItemWithContext = withContext(DeleteItem);
const CreateAdminWithContext = withContext(CreateAdmin);





export default () => (
  <Router>
    <div className="page-wrap bounds">

    <Switch>
      {/* dashboard */}
      <PrivateRoute exact path="/admin-dashboard" component={AdminDashboardWithContext} />
      
      {/* admin routes */}
      <PrivateRoute exact path="/admin-table" component={AdminTableWithContext} />
      <PrivateRoute exact path="/admin/create" component={CreateAdminWithContext} />
      <PrivateRoute exact path="/admin/:id/delete" component={DeleteItemWithContext} />

      {/* authentication */}
      <Route exact path="/admin-login" component={SignInWithContext} />
      <Route exact path="/admin-logout" component={SignOutWithContext} />
      {/* user pages */}
      <Route exact path="/gallery/:type" component={GalleryImagesFullWithContext} />
      <Route exact path="/gallery" component={GalleryWithContext} />
      <Route exact path="/services" component={ServicesWithContext} />
      <Route exact path="/about-us" component={AboutPageWithContext} />
      {/* error routes */}
      <Route path="/login-required" component={LoginRequired} />
      <Route path="/forbidden" component={Forbidden} />
      <Route path="/error" component={ServerError} />
      <Route path="/not-found" component={NotFound} />
      <Route exact path="/" component={HomePageWithContext} />
      <Route component={NotFound} />
      
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
