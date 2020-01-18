import React, { Component } from 'react';
import Data from './Data';
import Cookies from 'js-cookie';

const Context = React.createContext();

export class Provider extends Component {

  // Set the state to the authenticated admin or null
  state = {
    authenticatedAdmin: Cookies.getJSON('authenticatedAdmin') || null,
    errors: [],
  }

  // create a new instance of the Data class
  constructor() {
    super();
    this.data = new Data();
  }

  // pass the methods through props
  render () {
    const { authenticatedAdmin } = this.state;

    const value = {
      authenticatedAdmin,
      data: this.data,
      actions: { // add the actions property to call for later use
        // authentication
        signIn: this.signIn,
        signOut: this.signOut,
        // administrative
        getAdminList: this.getAdminList,
        createAdmin: this.createAdmin,
        deleteAdmin: this.deleteAdmin,
        // packages
        generatePackageList: this.generatePackageList,
        generatePackageDetail: this.generatePackageDetail,
        createPackage: this.createPackage,
        updatePackage: this.updatePackage,
        deletePackage: this.deletePackage,
        // images
        generateImageList: this.generateImageList,
        generateImageDetail: this.generateImageDetail,
        createGalleryItem: this.createGalleryItem,
        deleteGalleryItem: this.deleteGalleryItem,
        // services
        generateServiceList: this.generateServiceList,
        generateServiceDetail: this.generateServiceDetail,
        createService: this.createService,
        updateService: this.updateService,
        deleteService: this.deleteService,
        // reviews
        generateReviewList: this.generateReviewList,
        generateReviewDetail: this.generateReviewDetail,
        createReview: this.createReview,
        updateReview: this.updateReview,
        deleteReview: this.deleteReview,
        // prices
        generatePriceList: this.generatePriceList,
        generatePriceDetail: this.generatePriceDetail,
        createPriceItem: this.createPriceItem,
        updatePriceItem: this.updatePriceItem,
        deletePriceItem: this.deletePriceItem,

      },
    }

    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    );
  }

  /*********** LOGINS *************************************** */

  /**
   * Signs in the user and sets a cookie for 24 hours
   * @param {Username} username - Users username for login
   * @param {Password} password - Users password for login
   */
  signIn = async (emailAddress, password) => {
    const admin = await this.data.getAdmin(emailAddress, password);

    if (admin !== null) {
      this.setState({
        authenticatedAdmin: admin,
      });
      
      admin.data = btoa(`${emailAddress}:${password}`);
      localStorage.setItem('admin', JSON.stringify(admin));
      Cookies.set('authenticatedAdmin', JSON.stringify(admin), { expires: 30 });
    }

    return admin;
  }

  /**
   * Signs out the user and removes the set cookie
   */  
  signOut = () => {
    this.setState({
      authenticatedAdmin: null,
    });
    Cookies.remove('authenticatedAdmin');
  }

  /*********** ADMINS *************************************** */

  /**
   * Retrieves a list of all the administrative users
   */
  getAdminList = async(credentials) => {
    const admins = await this.data.getTotalAdmins(credentials);
    return admins;
  }

  /**
   * Creates a new administrative User for the database
   */
  createAdmin = async(adminInfo, credentials) => {
    const request = await this.data.createAdmin(adminInfo, credentials);
    return request;
  }

  /**
   * Deletes an individual admin from the database
   */
  deleteAdmin = async(id, credentials) => {
    const admin = await this.data.deleteAdmin(id, credentials);
    return admin;
  }

  /*********** PACKAGES *************************************** */

  /**
   * Retrieves a list of all packages in the database
   */
  generatePackageList = async() => {
    const packages = await this.data.getPackages();
    return packages;
  }

  /**
   * Retrieves an individual package from the database
   */
  generatePackageDetail = async(id) => {
    const pkg = await this.data.getPackage(id);
    return pkg;
  }

  /**
   * Creates a new packages and adds it to the database
   */
  createPackage = async(packageInfo, credentials) => {
    const newPackage = await this.data.createPackage(packageInfo, credentials);
    return newPackage;
  }

  /**
   * Updates a package in the database
   */
  updatePackage = async(id, packageInfo, credentials) => {
    const pkg = await this.data.updatePackage(id, packageInfo, credentials);
    return pkg;
  }

  /**
   * Deletes a package from the database
   */
  deletePackage = async(id, credentials) => {
    const delPkg = await this.data.deletePackage(id, credentials);
    return delPkg;
  }

  /*********** GALLERY *************************************** */

  /**
   * Retreives a list of available images
   */
  generateImageList = async() => {
    const images = await this.data.getImages();
    return images;
  }

  /**
   * Retrieves an individual image
   */
  generateImageDetail = async(id) => {
    const image = await this.data.getImage(id);
    return image;
  }

  /**
   * Uploads a new image to the API
   */
  createGalleryItem = async(imageInfo, credentials) => {
    const image = await this.data.createGalleryItem(imageInfo, credentials);
    return image;
  }

  /**
   * Deletes an individual gallery item
   */
  deleteGalleryItem = async(id, credentials) => {
    const image = await this.data.deleteGalleryItem(id, credentials);
    return image;
  }

  /*********** SERVICES *************************************** */

  /**
   * Retrieves a list of all services in the database
   */
  generateServiceList = async() => {
    const services = await this.data.getServices();
    return services;
  }

  /**
   * Retrieves an individual service from the database
   */
  generateServiceDetail = async(id) => {
    const service = await this.data.getServiceItem(id);
    return service;
  }

  /**
   * Creates a new services and adds it to the database
   */
  createService = async(serviceInfo, credentials) => {
    const newService = await this.data.createService(serviceInfo, credentials);
    return newService;
  }

  /**
   * Updates a service in the database
   */
  updateService = async(id, serviceInfo, credentials) => {
    const service = await this.data.updateService(id, serviceInfo, credentials);
    return service;
  }

  /**
   * Deletes a service from the database
   */
  deleteService = async(id, credentials) => {
    const delService = await this.data.deleteService(id, credentials);
    return delService;
  }

  /*********** REVIEWS *************************************** */

  /**
   * Retrieves a list of all reviews in the database
   */
  generateReviewList = async() => {
    const reviews = await this.data.getReviews();
    return reviews;
  }

  /**
   * Retrieves an individual review from the database
   */
  generateReviewDetail = async(id) => {
    const review = await this.data.getReviewItem(id);
    return review;
  }

  /**
   * Creates a new review and adds it to the database
   */
  createReview = async(reviewInfo, credentials) => {
    const newReview = await this.data.createReview(reviewInfo, credentials);
    return newReview;
  }

  /**
   * Updates a review in the database
   */
  updateReview = async(id, reviewInfo, credentials) => {
    const review = await this.data.updateReview(id, reviewInfo, credentials);
    return review;
  }

  /**
   * Deletes a review from the database
   */
  deleteReview = async(id, credentials) => {
    const delReview = await this.data.deleteReview(id, credentials);
    return delReview;
  }

  /*********** PRICING *************************************** */

  /**
   * Retrieves a list of all pricing in the database
   */
  generatePriceList = async() => {
    const prices = await this.data.getPricing();
    return prices;
  }

  /**
   * Retrieves an individual price from the database
   */
  generatePriceDetail = async(id) => {
    const price = await this.data.getPriceItem(id);
    return price;
  }

  /**
   * Creates a new price item and adds it to the database
   */
  createPriceItem = async(pricingInfo, credentials) => {
    const newPriceItem = await this.data.createPricing(pricingInfo, credentials);
    return newPriceItem;
  }

  /**
   * Updates a price item in the database
   */
  updatePriceItem = async(id, pricingInfo, credentials) => {
    const priceItem = await this.data.updatePricing(id, pricingInfo, credentials);
    return priceItem;
  }

  /**
   * Deletes a price item from the database
   */
  deletePriceItem = async(id, credentials) => {
    const delPriceItem = await this.data.deletePricing(id, credentials);
    return delPriceItem;
  }  

}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}
