const HttpError = require('../models/http-error');
const {v4: uuidv4} = require('uuid');
const { validationResult } = require('express-validator');
const getCoordsForAddress = require('../util/location');
const Place = require('../models/place')

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'north pole',
    description: 'one of the best',
    location: {
      lat: 12,
      lng: -12
    },
    address: 'north pole 124',
    creator: 'u1'
  }
];

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find(p => p.id === placeId);

  if(!place){
    throw new HttpError('could not find', 404);
  }

  res.json({place: place});
}

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const places = DUMMY_PLACES.filter(p => p.creator === userId);

  if(!places || places.length === 0){
    next(new HttpError('could not find', 404));
  }

  res.json({places: places});
}

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) return next(new HttpError('invalid inputs', 422));

  const { title, description, address, creator } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch(err) {
    return next(err)
  }

  const createdPlace = new Place({
    title,
    description,
    location: coordinates,
    address,
    creator,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_Cropped.jpg/220px-View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_Cropped.jpg'
  });

  try {
    await createdPlace.save();
  } catch(err) {
    return next(new HttpError('create failed',500))
  }
  

  res.status(201).json({place: createdPlace});
}

const updatePlace = (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) throw new HttpError('invalid inputs', 422);

  const { title, description } = req.body;
  const placeId = req.params.pid;

  const updatedPlace = {...DUMMY_PLACES.find(p => p.id === placeId)};
  const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId);

  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({place: updatedPlace})
}

const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;

  if(!DUMMY_PLACES.find(p => p.id === placeId)){
    throw new HttpError('place does not exist', 404);
  }

  DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);

  res.status(200).json({message: 'deleted'})
}


exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;