import React, { Component } from 'react';
import axios from 'axios';
import config from '../../../api-config';

// import images
import leftArrowAlt from '../../../website-mockups-assets/left-arrow-alt.png';
import rightArrowAlt from '../../../website-mockups-assets/right-arrow-alt.png';
import GalleryModalImage from './GalleryModalImage';

export default class GalleryModal extends Component {

  constructor(props){
    super(props);
    this.state = {
      images: [],
      modalArray: [],
      currentImage: '',
      count: 0,
    }
  }

  async componentDidMount() {
    const { context } = this.props;
    // set the image data state
    await context.actions.generateImageList()
      .then(data => {
        this.setState({
          images: data,
        });
      });
    // set the state for the modal array
    this.setModalArray();
    this.getImageUrl(`${this.state.modalArray[0]}`);
  }

  setModalArray() {
    const images = this.state.images;
    var modalArray = [];

    images.forEach((item, index) => {
      if (index < 5) {
        modalArray.push(item.imageLocation)
      }
    });

    this.setState({
      modalArray: modalArray,
    });
    
  }

  async getImageUrl(imageLocation) {
    // uploads URL + Image Location
    const url = config.uploads + imageLocation;

    // get the image location
    await axios.get(url)
      .then(response => {

        // set the current image state to the response url
        this.setState({
          currentImage: response.config.url,
        })

      })
      .catch(err => console.log(`Error fetching the image for modal: ${err}`));

  }

  stepBackwards = async () => {

    // if the count if greater than 0 allow for subtraction
    if (this.state.count >= 1) {
      const newIndex = this.state.count - 1;
      // set the state to the new index count
      this.setState({
        count: newIndex
      });
      // fetch the new url to pass to the modal
      await this.getImageUrl(this.state.modalArray[this.state.count]);

    } else {
      // else set the state to 0 to prevent the app from hitting negative numbers
      this.setState({
        count: 0
      });
    }
  }

  stepForwards = async () => {

    // if the count is less than the modal array length allow addition
    if (this.state.count <= 4) {
      const newIndex = this.state.count + 1;
      // set the state for the new count
      this.setState({
        count: newIndex
      });
      // fetch the new url for the modal
      await this.getImageUrl(this.state.modalArray[this.state.count]);

    } else {
      // else set the state for the modal array length
      this.setState({
        count: 4,
      })
    }
  }

  render() {
    return (
      <>
        <img 
          id="gallery--left--arrow"
          className={"gallery--modal--button"}
          onClick={this.stepBackwards}
          src={leftArrowAlt}
          alt="left arrow"
        />
        <GalleryModalImage 
          src={this.state.currentImage}
        />
        <img 
          id="gallery--right--arrow"
          className={"gallery--modal--button"}
          onClick={this.stepForwards}
          src={rightArrowAlt}
          alt="right arrow"
        />
      </>
    );
  }

}

// Source Gallery.js