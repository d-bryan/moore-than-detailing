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
        signIn: this.signIn,
        signOut: this.signOut,
        generatePackageList: this.generatePackageList,
        generatePackageDetail: this.generatePackageDetail,
        createPackage: this.createPackage,
        updatePackage: this.updatePackage,
        deletePackage: this.deletePackage,
        generateImageList: this.generateImageList,
        generateImageDetail: this.generateImageDetail,
        deleteGalleryItem: this.deleteGalleryItem,
        generateServiceList: this.generateServiceList,
        generateServiceDetail: this.generateServiceDetail,
        createService: this.createService,
        updateService: this.updateService,
        deleteService: this.deleteService,
        generateReviewList: this.generateReviewList,
        generateReviewDetail: this.generateReviewDetail,
        createReview: this.createReview,
        updateReview: this.updateReview,
        deleteReview: this.deleteReview,
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
  signIn = async (username, password) => {
    const admin = await this.data.getAdmin(username, password);

    if (admin !== null) {
      this.setState(() => {
        return {
          authenticatedAdmin: admin,
        };
      });
      admin.data = btoa(`${username}:${password}`);
      localStorage.setItem('admin', JSON.stringify(admin));
      Cookies.set('authenticatedUser', JSON.stringify(admin), { expires: 30 });
    }

    return admin;
  }

  /**
   * Signs out the user and removes the set cookie
   */  
  signOut = () => {
    this.setState(() => {
      return {
        authenticatedAdmin: null,
      };
    });
    Cookies.remove('authenticatedAdmin');
  }

  /*********** PACKAGES *************************************** */

  /**
   * Retrieves a list of all packages in the database
   */
  generatePackageList = async(credentials) => {
    const packages = await this.data.getPackages(credentials);
    return packages;
  }

  /**
   * Retrieves an individual package from the database
   */
  generatePackageDetail = async(id, credentials) => {
    const pkg = await this.data.getPackage(id, credentials);
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
  generateImageList = async(credentials) => {
    const images = await this.data.getImages(credentials);
    return images;
  }

  /**
   * Retrieves an individual image
   */
  generateImageDetail = async(id, credentials) => {
    const image = await this.data.getImage(id, credentials);
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
  generateServiceList = async(credentials) => {
    const services = await this.data.getServices(credentials);
    return services;
  }

  /**
   * Retrieves an individual service from the database
   */
  generateServiceDetail = async(id, credentials) => {
    const service = await this.data.getServiceItem(id, credentials);
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
  generateReviewList = async(credentials) => {
    const reviews = await this.data.getReviews(credentials);
    return reviews;
  }

  /**
   * Retrieves an individual review from the database
   */
  generateReviewDetail = async(id, credentials) => {
    const review = await this.data.getReviewItem(id, credentials);
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
  generatePriceList = async(credentials) => {
    const prices = await this.data.getPricing(credentials);
    return prices;
  }

  /**
   * Retrieves an individual price from the database
   */
  generatePriceDetail = async(id, credentials) => {
    const price = await this.data.getPriceItem(id, credentials);
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
