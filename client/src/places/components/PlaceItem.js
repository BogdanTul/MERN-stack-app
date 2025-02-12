import React, {useState, useContext} from 'react';

import './PlaceItem.css';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import { AuthContext } from '../../shared/context/auth-context';

const PlaceItem = (props) => {
  const auth = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);
  
  const openDeleteModalHandler = () => setShowDeleteModal(true);
  const closeDeleteModalHandler = () => setShowDeleteModal(false);

  const deletePlaceHandler = () => {
    console.log('DELETE');
    setShowDeleteModal(false);
  }

  return (
  <React.Fragment>
    <Modal 
      show={showMap} 
      onCancel={closeMapHandler} 
      header={props.address} 
      contentClass="place-item__modal-content"
      footerClass="place-item__modal-actions"
      footer={<Button onClick={closeMapHandler}>Close</Button>}>
        <div className="map-container">
          <h2>themap</h2>
        </div>
      </Modal>
      <Modal 
        show={showDeleteModal} 
        onCancel={closeDeleteModalHandler} 
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={closeDeleteModalHandler}>Cancel</Button>
            <Button danger onClick={deletePlaceHandler}>Delete</Button>
          </React.Fragment>
        }
      >
        <p>Are you sure you want to delete this place?</p>
      </Modal>
    <li className="place-item">
      <Card className="place-item__content">
        <div className="place-item__image">
          <img src={props.image} alt={props.title} />
        </div>
        <div className="place-item__info">
          <h2>{props.title}</h2>
          <h3>{props.address}</h3>
          <p>{props.description}</p>
        </div>
        <div className="place-item__actions">
          <Button inverse onClick={openMapHandler}>View on Map</Button>
          {auth.isLoggedIn && <Button to={`/places/${props.id}`}>Edit</Button>}
          {auth.isLoggedIn && <Button danger onClick={openDeleteModalHandler}>Delete</Button>}
        </div>
      </Card>
    </li>
  </React.Fragment>);
};

export default PlaceItem;