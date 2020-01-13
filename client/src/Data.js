import config from './api-config';

export default class Data {

  /**
   * Fetches the requests to the API
   * @param {URL} path - Path to the API
   * @param {Request} method - HTTP Request Method
   * @param {Header} body - Header option values to include
   * @param {Boolean} requiresAuth - True | False value for if the route requires Authorization
   * @param {Object} credentials - Pass credentials through for authorization
   */
  api(path, method = 'GET', body = null, requiresAuth = true, credentials = null) {
    // API URL path + route
    const url = config.apiBaseUrl + path;

    // Request header options
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    // const galleryOptions = {
    //   method,
    //   headers: {
    //     'Content-Type': 'multipart/form-data;',
    //   },
    // };

    // Convert body to JSON string if not null
    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    // If the path required credentials pass them in the header
    if (requiresAuth) {

      let encodedCredentials = null;

      if (credentials.email && credentials.password) {
        encodedCredentials = btoa(`${credentials.email}:${credentials.password}`);
      } else {
        encodedCredentials = credentials;
      }

      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    // fetch the url with the parameters and header options
    return fetch(url, options);

  }

  /*********** ADMIN *************************************** */

  /**
   * Authorize the admin when loggin in
   * @param {Email} email - Admin email address
   * @param {Password} password - Admin password
   */
  async getAdmin (email, password) {
    // route parameters
    const response = await this.api('/admin', 'GET', null, true, { email, password });

    // Authenticate the admin login
    if (response.status === 200) {
      return response.json()
    } else if (response.status === 401) {
      return response.json()
        .then(data => data.errors);
    } else {
      throw new Error("there was an issue when attempting to get this admin.");
    }
  }

  /**
   * Retrieves a list of administrative users in the database
   * @param {Admin} credentials - Admin login credentials
   */
  async getTotalAdmins (credentials) {
    // route parameters
    const response = await this.api('/admins', 'GET', null, true, credentials);

    // validate the response from the API
    if (response.status === 200) {
      return response.json();
    } else if (response.status === 401) {
      return response.json().then(data => data.errors);
    } else {
      throw new Error("There was an issue when attempting to retreive the admin list.");
    }
  }

  /**
   * Creates a new Admin and passes to the API for authentication
   * @param {Object} admin - Input parameters from the user to create admin
   */
  async createAdmin (admin, credentials) {
    // route parameters
    const response = await this.api('/admins', 'POST', admin, true, credentials);

    // validate the response from the API
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => data.errors);
    } else if (response.status === 401) {
      return response.json().then(data => data.errors);
    } else {
      throw new Error("There was an issue when attempting the create the new Admin");
    }
  }

  /**
   * Deletes an administrative user from the database
   * @param {Admin} credentials - Admin login credentials
   */  
  async deleteAdmin (credentials, id) {
    // route parameters
    const response = await this.api(`/admins/${id}`, 'DELETE', null, true, credentials);

    // validate the response from the API
    if (response.status === 204) {
      return [];
    } else if (response.status === 401) {
      return response.json().then(data => data.errors);
    } else if (response.status === 403) {
      return response.json().then(data => data.errors);
    } else if (response.status === 404) {
      return response.json().then(data => data.errors);
    } else {
      throw new Error("There was an error when attempting to delete the administrative user.");
    }

  }

  /*********** PACKAGES *************************************** */

  /**
   * Retrieve the list of detail packages from the API
   */
  async getPackages () {
    // route parameters
    const response = await this.api('/packages', 'GET', null, false, null);

    // validate the response from API
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error("There was an issue when attempting to retrieve the Packages");
    }
  }

  /**
   * Retrieve individual package from the database
   * @param {Package} id - Table ID number for package
   */
  async getPackage (id) {
    // route parameter
    const response = await this.api(`/packages/${id}`, 'GET', null, false, null);

    // validate the response from API
    if (response.status === 200) {
      return response.json();
    } else if (response.status === 404) {
      return response.json().then(data => data.errors);
    } else {
      throw new Error("There was an issue when attempting to retrieve the Package");
    }
  }

  /**
   * Create a new package and add it to the database
   * @param {Package} packageInfo - Newly created package info
   * @param {Admin} credentials - Admin credentials
   */
  async createPackage (packageInfo, credentials) {
    // route parameters
    const response = await this.api('/packages', 'POST', packageInfo, true, credentials);

    // validate the response API
    if (response.status === 201) {
      return response;
    } else if (response.status === 400) {
      return response.json().then(data => data.errors);
    } else if (response.status === 401) {
      return response.json().then(data => data.errors);
    } else {
      throw new Error("There was an issue when attempting to create the Package");
    }
  }

  /**
   * Update package in the database
   * @param {Package} id - ID number for package in database
   * @param {PackageInfo} packageInfo - Updated Package info provided by user
   * @param {Admin} credentials - Admin Login Credentials
   */
  async updatePackage (id, packageInfo, credentials) {
    // route parameters
    const response = await this.api(`/packages/${id}`, 'PUT', packageInfo, true, credentials);

    // validate the response API
    if (response.status === 204) {
      return [];
    } else if (response.status === 404) {
      return response.json().then(data => data.errors);
    } else if (response.status === 400) {
      return response.json().then(data => data.errors);
    } else if (response.status === 403) {
      return response.json().then(data => data.errors);
    } else if (response.status === 401) {
      return response.json().then(data => data.errors);
    } else {
      throw new Error("There was an issue when attempting to update the package");
    }
  }

  /**
   * Delete the Package from the Database
   * @param {PackageID} id - ID number for the package
   * @param {Admin} credentials - Admin Login Credentials
   */
  async deletePackage (id, credentials) {
    // route parameters
    const response = await this.api(`/packages/${id}`, 'DELETE', null, true, credentials);

    // validate the response API
    if (response.status === 204) {
      return [];
    } else if (response.status === 404) {
      return response.json().then(data => data.errors);
    } else if (response.status === 403) {
      return response.json().then(data => data.errors);
    } else if (response.status === 401) {
      return response.json().then(data => data.errors);
    } else {
      throw new Error("There was an issue when attempting to delete the Package");
    }
  }

  /*********** GALLERY *************************************** */

  /**
   * Retrieve the images from the database
   */
  async getImages () {
    // route parameters
    const response = await this.api('/gallery', 'GET', null, false, null);

    // validate the response API
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error("There was an issue when attempting to retrieve the Images");
    }
  }

  /**
   * Retrieve an individual image from the database
   * @param {ImageID} id - image id
   */
  async getImage (id) {
    // route parameters
    const response = await this.api(`/gallery/${id}`, 'GET', null, false, null);

    // validate the response API
    if (response.status === 200) {
      return response.json();
    } else if (response.status === 404) {
      return response.json().then(data => data.errors);
    } else {
      throw new Error("There was an issue when attempting to retreive the Image.");
    }
  }

  // TODO figure out how to fix the header options for posting images
  async createGalleryItem () {}

  /**
   * Delete an image route from the database
   * @param {ImageID} id - Id for image
   * @param {Admin} credentials - Admin credentials
   */
  async deleteGalleryItem (id, credentials) {
    // route parameters
    const response = await this.api(`/gallery/${id}`, 'DELETE', null, true, credentials);

    // validate the response API
    if (response.status === 204) {
      return [];
    } else if (response.status === 404) {
      return response.json().then(data => data.errors);
    } else if (response.status === 403) {
      return response.json().then(data => data.errors);
    } else if (response.status === 401) {
      return response.json().then(data => data.errors);
    } else {
      throw new Error("There was an error while attempting to delete the Image");
    }
  }

  /*********** SERVICES *************************************** */

  /**
   * Retrieve the Services list
   */
  async getServices () {
    // route parameters
    const response = await this.api('/services', 'GET', null, false, null);

    // validate the response
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error("There was an error attempting to get the Service List");
    }
  }

  /**
   * Retrieve a Service Item from Database
   * @param {Service} id - Service item ID
   */
  async getServiceItem (id) {
    // route parameters
    const response = await this.api(`/services/${id}`, 'GET', null, false, null);

    // validate the response
    if (response.status === 200) {
      return response.json();
    } else if (response.status === 404) {
      return response.json().then(data => data.errors);
    } else {
      throw new Error("There was an error attempting to retreive the Service item");
    }
  }


  /**
   * Create a new service and add it to the database
   * @param {Service} serviceInfo - Newly created service info
   * @param {Admin} credentials - Admin credentials
   */
  async createService (serviceInfo, credentials) {
    // route parameters
    const response = await this.api('/services', 'POST', serviceInfo, true, credentials);

    // validate the response API
    if (response.status === 201) {
      return response;
    } else if (response.status === 400) {
      return response.json().then(data => data.errors);
    } else if (response.status === 401) {
      return response.json().then(data => data.errors);
    } else {
      throw new Error("There was an issue when attempting to create the Service");
    }
  }

  /**
   * Update service in the database
   * @param {ServiceID} id - ID number for service in database
   * @param {ServiceInfo} serviceInfo - Updated Service info provided by user
   * @param {Admin} credentials - Admin Login Credentials
   */
  async updateService (id, serviceInfo, credentials) {
    // route parameters
    const response = await this.api(`/services/${id}`, 'PUT', serviceInfo, true, credentials);

    // validate the response API
    if (response.status === 204) {
      return [];
    } else if (response.status === 404) {
      return response.json().then(data => data.errors);
    } else if (response.status === 400) {
      return response.json().then(data => data.errors);
    } else if (response.status === 403) {
      return response.json().then(data => data.errors);
    } else if (response.status === 401) {
      return response.json().then(data => data.errors);
    } else {
      throw new Error("There was an issue when attempting to update the Service");
    }
  }

  /**
   * Delete the Service from the Database
   * @param {ServiceID} id - ID number for the service
   * @param {Admin} credentials - Admin Login Credentials
   */
  async deleteService (id, credentials) {
    // route parameters
    const response = await this.api(`/services/${id}`, 'DELETE', null, true, credentials);

    // validate the response API
    if (response.status === 204) {
      return [];
    } else if (response.status === 404) {
      return response.json().then(data => data.errors);
    } else if (response.status === 403) {
      return response.json().then(data => data.errors);
    } else if (response.status === 401) {
      return response.json().then(data => data.errors);
    } else {
      throw new Error("There was an issue when attempting to delete the Service");
    }
  }

  /*********** REVIEWS *************************************** */

  /**
   * Retrieve the Reviews list
   */
  async getReviews () {
    // route parameters
    const response = await this.api('/reviews', 'GET', null, false, null);

    // validate the response
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error("There was an error attempting to get the Review List");
    }
  }

  /**
   * Retrieve a Review Item from Database
   * @param {Review} id - Review item ID
   */
  async getReviewItem (id) {
    // route parameters
    const response = await this.api(`/reviews/${id}`, 'GET', null, false, null);

    // validate the response
    if (response.status === 200) {
      return response.json();
    } else if (response.status === 404) {
      return response.json().then(data => data.errors);
    } else {
      throw new Error("There was an error attempting to retreive the Review item");
    }
  }


  /**
   * Create a new review and add it to the database
   * @param {Review} reviewInfo - Newly created review info
   * @param {Admin} credentials - Admin credentials
   */
  async createReview (reviewInfo, credentials) {
    // route parameters
    const response = await this.api('/reviews', 'POST', reviewInfo, true, credentials);

    // validate the response API
    if (response.status === 201) {
      return response;
    } else if (response.status === 400) {
      return response.json().then(data => data.errors);
    } else if (response.status === 401) {
      return response.json().then(data => data.errors);
    } else {
      throw new Error("There was an issue when attempting to create the Review");
    }
  }

  /**
   * Update review in the database
   * @param {ReviewID} id - ID number for review in database
   * @param {ReviewInfo} reviewInfo - Updated Review info provided by user
   * @param {Admin} credentials - Admin Login Credentials
   */
  async updateReview (id, reviewInfo, credentials) {
    // route parameters
    const response = await this.api(`/reviews/${id}`, 'PUT', reviewInfo, true, credentials);

    // validate the response API
    if (response.status === 204) {
      return [];
    } else if (response.status === 404) {
      return response.json().then(data => data.errors);
    } else if (response.status === 400) {
      return response.json().then(data => data.errors);
    } else if (response.status === 403) {
      return response.json().then(data => data.errors);
    } else if (response.status === 401) {
      return response.json().then(data => data.errors);
    } else {
      throw new Error("There was an issue when attempting to update the Review");
    }
  }

  /**
   * Delete the Review from the Database
   * @param {ReviewID} id - ID number for the review
   * @param {Admin} credentials - Admin Login Credentials
   */
  async deleteReview (id, credentials) {
    // route parameters
    const response = await this.api(`/reviews/${id}`, 'DELETE', null, false, credentials);

    // validate the response API
    if (response.status === 204) {
      return [];
    } else if (response.status === 404) {
      return response.json().then(data => data.errors);
    } else if (response.status === 403) {
      return response.json().then(data => data.errors);
    } else if (response.status === 401) {
      return response.json().then(data => data.errors);
    } else {
      throw new Error("There was an issue when attempting to delete the Review");
    }
  }

  /*********** PRICING *************************************** */

  /**
   * Retrieve the Pricing list
   */
  async getPricing () {
    // route parameters
    const response = await this.api('/pricing', 'GET', null, false, null);

    // validate the response
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error("There was an error attempting to get the Price List");
    }
  }

  /**
   * Retrieve a Price Item from Database
   * @param {PriceID} id - Pricing item ID
   */
  async getPriceItem (id) {
    // route parameters
    const response = await this.api(`/pricing/${id}`, 'GET', null, false, null);

    // validate the response
    if (response.status === 200) {
      return response.json();
    } else if (response.status === 404) {
      return response.json().then(data => data.errors);
    } else {
      throw new Error("There was an error attempting to retreive the Pricing item");
    }
  }


  /**
   * Create a new pricing and add it to the database
   * @param {PricingItem} pricingInfo - Newly created pricing info
   * @param {Admin} credentials - Admin credentials
   */
  async createPricing (pricingInfo, credentials) {
    // route parameters
    const response = await this.api('/pricing', 'POST', pricingInfo, true, credentials);

    // validate the response API
    if (response.status === 201) {
      return response;
    } else if (response.status === 400) {
      return response.json().then(data => data.errors);
    } else if (response.status === 401) {
      return response.json().then(data => data.errors);
    } else {
      throw new Error("There was an issue when attempting to create the Pricing");
    }
  }

  /**
   * Update pricing in the database
   * @param {PricingID} id - ID number for pricing in database
   * @param {PricingInfo} pricingInfo - Updated Pricing info provided by user
   * @param {Admin} credentials - Admin Login Credentials
   */
  async updatePricing (id, pricingInfo, credentials) {
    // route parameters
    const response = await this.api(`/pricing/${id}`, 'PUT', pricingInfo, true, credentials);

    // validate the response API
    if (response.status === 204) {
      return [];
    } else if (response.status === 404) {
      return response.json().then(data => data.errors);
    } else if (response.status === 400) {
      return response.json().then(data => data.errors);
    } else if (response.status === 403) {
      return response.json().then(data => data.errors);
    } else if (response.status === 401) {
      return response.json().then(data => data.errors);
    } else {
      throw new Error("There was an issue when attempting to update the Pricing");
    }
  }

  /**
   * Delete the Pricing from the Database
   * @param {PricingID} id - ID number for the pricing
   * @param {Admin} credentials - Admin Login Credentials
   */
  async deletePricing (id, credentials) {
    // route parameters
    const response = await this.api(`/pricing/${id}`, 'DELETE', null, true, credentials);

    // validate the response API
    if (response.status === 204) {
      return [];
    } else if (response.status === 404) {
      return response.json().then(data => data.errors);
    } else if (response.status === 403) {
      return response.json().then(data => data.errors);
    } else if (response.status === 401) {
      return response.json().then(data => data.errors);
    } else {
      throw new Error("There was an issue when attempting to delete the Pricing");
    }
  }  

};