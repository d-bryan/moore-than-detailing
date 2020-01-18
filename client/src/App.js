import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
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
// admin packages
import AdminPackagesTable from './components/admin-pages/AdminPackagesTable';
import CreatePackage from './components/admin-pages/admin-packages/CreatePackage';
import UpdatePackage from './components/admin-pages/admin-packages/UpdatePackage';
// admin pricing
import AdminPricingTable from './components/admin-pages/AdminPricingTable';
import CreatePricing from './components/admin-pages/admin-pricing/CreatePricing';
import UpdatePricing from './components/admin-pages/admin-pricing/UpdatePricing';
// admin reviews
import AdminReviewsTable from './components/admin-pages/AdminReviewsTable';
import CreateReview from './components/admin-pages/admin-reviews/CreateReview';
import UpdateReview from './components/admin-pages/admin-reviews/UpdateReview';
// admin services
import AdminServicesTable from './components/admin-pages/AdminServicesTable';
import CreateService from './components/admin-pages/admin-services/CreateService';
import UpdateService from './components/admin-pages/admin-services/UpdateService';
// admin gallery
import AdminGalleryTable from './components/admin-pages/AdminGalleryTable';
import UploadImage from './components/admin-pages/admin-gallery/UploadImage';


// set up context components
const FooterWithContext = withContext(Footer);
// user pages
const HomePageWithContext = withContext(HomePage);
const AboutPageWithContext = withContext(AboutPage);
const ServicesWithContext = withContext(Services);
const GalleryWithContext = withContext(Gallery);
const GalleryImagesFullWithContext = withContext(GalleryImagesFull);
// authorization
const SignInWithContext = withContext(SignIn);
const SignOutWithContext = withContext(SignOut);
// admin pages
const AdminDashboardWithContext = withContext(AdminDashboard);
const AdminTableWithContext = withContext(AdminTable);
const DeleteItemWithContext = withContext(DeleteItem);
const CreateAdminWithContext = withContext(CreateAdmin);
// admin packages
const AdminPackagesTableWithContext = withContext(AdminPackagesTable);
const CreatePackageWithContext = withContext(CreatePackage);
const UpdatePackageWithContext = withContext(UpdatePackage);
// admin pricing
const AdminPricingTableWithContext = withContext(AdminPricingTable);
const CreatePricingWithContext = withContext(CreatePricing);
const UpdatePricingWithContext = withContext(UpdatePricing);
// admin reviews
const AdminReviewsTableWithContext = withContext(AdminReviewsTable);
const CreateReviewWithContext = withContext(CreateReview);
const UpdateReviewWithContext = withContext(UpdateReview);
// admin services
const AdminServicesTableWithContext = withContext(AdminServicesTable);
const CreateServiceWithContext = withContext(CreateService);
const UpdateServiceWithContext = withContext(UpdateService);
// admin gallery
const AdminGalleryTableWithContext = withContext(AdminGalleryTable);
const UploadImageWithContext = withContext(UploadImage);





export default () => (
  <Router>
    <div className="page-wrap bounds">

    <Switch>
      {/* dashboard */}
      <PrivateRoute exact path="/admin-dashboard" component={AdminDashboardWithContext} />
      
      {/* admin routes */}
      <PrivateRoute exact path="/admin/:id/delete" component={DeleteItemWithContext} />
      <PrivateRoute exact path="/admin/create" component={CreateAdminWithContext} />
      <PrivateRoute exact path="/admin-table" component={AdminTableWithContext} />

      {/* admin package routes */}
      {/* <PrivateRoute exact path="/admin-packages/:id/delete" component={DeleteItemWithContext} /> */}
      <PrivateRoute exact path="/admin-packages/:id/update" component={UpdatePackageWithContext} />
      <PrivateRoute exact path="/admin-packages/create" component={CreatePackageWithContext} />
      <PrivateRoute exact path="/admin-packages" component={AdminPackagesTableWithContext} />

      {/* admin pricing routes */}
      <PrivateRoute exact path="/admin-pricing/:id/delete" component={DeleteItemWithContext} />
      <PrivateRoute exact path="/admin-pricing/:id/update" component={UpdatePricingWithContext} />
      <PrivateRoute exact path="/admin-pricing/create" component={CreatePricingWithContext} />
      <PrivateRoute exact path="/admin-pricing" component={AdminPricingTableWithContext} />

      {/* admin reviews routes */}
      <PrivateRoute exact path="/admin-reviews/:id/delete" component={DeleteItemWithContext} />
      <PrivateRoute exact path="/admin-reviews/:id/update" component={UpdateReviewWithContext} />
      <PrivateRoute exact path="/admin-reviews/create" component={CreateReviewWithContext} />
      <PrivateRoute exact path="/admin-reviews" component={AdminReviewsTableWithContext} />

      {/* admin services routes */}
      <PrivateRoute exact path="/admin-services/:id/delete" component={DeleteItemWithContext} />
      <PrivateRoute exact path="/admin-services/:id/update" component={UpdateServiceWithContext} />
      <PrivateRoute exact path="/admin-services/create" component={CreateServiceWithContext} />
      <PrivateRoute exact path="/admin-services" component={AdminServicesTableWithContext} />

      {/* admin gallery routes */}
      <PrivateRoute exact path="/admin-gallery/:id/delete" component={DeleteItemWithContext} />
      <PrivateRoute exact path="/admin-gallery/create" component={UploadImageWithContext} />
      <PrivateRoute exact path="/admin-gallery" component={AdminGalleryTableWithContext} />

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



      {/* end page wrap */}
    </div>
    <FooterWithContext />
    
  </Router>
);
