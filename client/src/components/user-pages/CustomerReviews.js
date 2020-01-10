import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// image imports
import LeftArrow from '../../website-mockups-assets/left-arrow.png';
import RightArrow from '../../website-mockups-assets/right-arrow.png';

export default class CustomerReviews extends Component {

  state = {
    reviews: '',
    leftReview: '',
    rightReview: '',
  }

  /**
   * Takes an array item and generates a random number based on length
   * @param {Array} array - Array Item
   */
  getRandomNumber (array) {
    return Math.floor(Math.floor(array.length) * Math.random()) + 1;
  }

  async componentDidMount() {
    const { context } = this.props;
    // call the review list api for use in random number method
    await context.actions.generateReviewList()
      .then(data => {
        this.setState({
          reviews: data,
        });
      });
    // call the random number method and set them in variables for later use in api calls  
    const randNumLeft = this.getRandomNumber(this.state.reviews);
    const randNumRight = this.getRandomNumber(this.state.reviews);
    // call the api for individual review and set the state for the left review
    await context.actions.generateReviewDetail(randNumLeft)
      .then(data => {
        if (data.id === null) {
          data = "";
        } else {
          this.setState({
            leftReview: data,
          });
        }
      });
    // call the api for individual review and set the state for the right review
    await context.actions.generateReviewDetail(randNumRight)
    .then(data => {
      if (data.id === null) {
        data = "";
      } else {
        this.setState({
          rightReview: data,
        });
      }
    });

  }

  render() {
    return (
      <>
        <div className="slide--4--container bounds">
          <div className="slide--4--subcontainer" >
            <h3>5.0/5.0 ON GOOGLE REVIEWS</h3>
            <h4><Link to="https://www.google.com/search?q=moore+than+detailing+frederick+md&oq=moore+than+detailing+frederick+md&aqs=chrome..69i57j69i65.4318j1j7&sourceid=chrome&ie=UTF-8#lrd=0x89c9d00a52549a6b:0xafd9839f6d81dbf6,1,,,">HEAR FROM OUR LOYAL CUSTOMERS</Link></h4>
            <div id="left--review" className="review--home">
              <p>{
                (this.state.leftReview.customerReview !== undefined) ?
                this.state.leftReview.customerReview
                :
                "We took our car here to get it detailed before selling it. For the money, it was the best detailing job I've ever seen. they went above and beyond, even going as far as to re-apply door panel felt that had peeled away. It looked like new. Ask for Steven - great guy trying hard to get a local business off the ground. I don't think you can go wrong here - I called 5 places and they were the cheapest. But the quality was top shelf."
                }</p>
                <hr className="slide--4--hr" />
                <p className="slide--4--name" >{
                  (this.state.leftReview.customerFirstName !== undefined) ?
                  this.state.leftReview.customerFirstName + " " + this.state.leftReview.customerLastName
                  :
                  "Ally G."
                  }</p>
                <p className="slide--4--rating">{
                  (this.state.leftReview.customerRating !== undefined) ?
                  this.state.leftReview.customerRating + " Stars" 
                  :
                  "5 Stars"
                  }</p>
            </div>
            <div id="right--review" className="review--home">
              <p>{
                (this.state.rightReview.customerReview !== undefined) ?
                this.state.rightReview.customerReview
                :
                "VERY IMPRESSED! Steven was communicative and accommodating with setting up my appointment. His work is METICULOUS, his prices are very reasonable. We had one hiccup and Steven was honest and forthcoming and corrected the issue FAR beyond my expectations. I WILL ALWAYS COME BACK AND HIGHLY RECOMMEND!!!! Thank you Steven."
                }</p>
                <hr className="slide--4--hr" />
                <p className="slide--4--name" >{
                  (this.state.rightReview.customerFirstName !== undefined) ?
                  this.state.rightReview.customerFirstName + " " + this.state.rightReview.customerLastName
                  :
                  "Becca S."
                  }</p>
                <p className="slide--4--rating">{
                  (this.state.rightReview.customerRating !== undefined) ?
                  this.state.rightReview.customerRating + " Stars"
                  :
                  "5 Stars"
                  }</p>
            </div>
            <img id="slide--4--left--arrow" src={LeftArrow} alt="left arrow"/>
            <img id="slide--4--right--arrow" src={RightArrow} alt="right arrow"/>
          </div>
        </div>
      </>
    );
  }
}