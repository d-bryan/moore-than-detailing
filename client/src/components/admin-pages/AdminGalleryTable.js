import React from 'react';
import config from '../../api-config';
import { Link } from 'react-router-dom';

// import components
import NavAdmin from '../navigation/NavAdmin';
import AdminGalleryContainer from './admin-gallery/AdminGalleryContainer';
import AdminGalleryHead from './admin-gallery/AdminGalleryHead';

export default class AdminGalleryTable extends React.PureComponent {

  state = {
    gallery: [],
  };

  async componentDidMount() {
    const { context } = this.props;

    await context.actions.generateImageList()
      .then(gallery => {
        this.setState({ gallery: gallery });
      })
      .catch(err => {
        console.error(`ADMIN IMAGES TABLE: ${err}`);
        this.props.history.push('/error');
      })
  };

  render() {
    const { context } = this.props;
    const authAdmin = context.authenticatedAdmin;
    var mapGalleryData = this.state.gallery.map(d => {
      return (
        <AdminGalleryContainer
          key={d.id}
          currentAdmin={authAdmin}
          id={d.id}
          c_name={"admin--gallery--table--image"}
          vehicleType={d.vehicleType}
          image={config.uploads + d.imageLocation}
        />
      );
    });

    return (
      <>

        <NavAdmin 
          context={context}
        />

        <div id="admin--images--table" className="admin--table--container">
          <h1>Images</h1>
          <table>
            <thead>
              <tr>
                <AdminGalleryHead />
              </tr>
            </thead>
            <tbody>
              { mapGalleryData }
            </tbody>
          </table>
        </div>

        <div className="create--new--container">
          <Link to="/admin-gallery/create"><button>Upload New Image</button></Link>
        </div>


      </>
    );
  }
};

// Source App.js