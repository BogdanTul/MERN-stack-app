const axios = require('axios');

async function getCoordsForAddress(address){
  return {
    lat: 40.78,
    lng: -73.98
  }

  const res = await axios.get('..');
  const data = res.data;

}

module.exports = getCoordsForAddress;